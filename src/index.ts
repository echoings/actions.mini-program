import path from 'path';
import * as core from '@actions/core';
// import * as github from '@actions/github';
import fs from 'fs-extra';
import ci from './lib/cli';

async function run(): Promise<void> {
  try {
    const projectType = core.getInput('project_type');
    const actionType = core.getInput('action_type');
    const projectPath = core.getInput('project_path');
    const version = core.getInput('version');
    const ignores = core.getInput('ignores');
    const options = core.getInput('command_options') || '';

    const { MINI_APP_ID, MINI_APP_PRIVATE_KEY, GITHUB_WORKSPACE: sourceDir = '' } = process.env;
    const uploadDir = path.join(sourceDir, projectPath);
    
    const timestamp = new Date().getTime();
    const privateKeyDir = `./private.${timestamp}.key`;
    await fs.outputFile(privateKeyDir, MINI_APP_PRIVATE_KEY);
    
    const commandOptions = options.replace(/\n/, '').split('=');
    console.log(eval(options), commandOptions);
    const robot = 3;
    const project = new ci({
      sourceDir,
      projectType,
      version,
      commandOptions,
      uploadDir,
      ignores,
      baseArgs: [
        'miniprogram-ci',
        `${actionType}`,
        '--project-type', `${projectType}`,
        '--pp', `${uploadDir}`,
        '--pkp', `${privateKeyDir}`,
        '--appid', `${MINI_APP_ID}`,
        '--uv', `${version}`,
        '-r', `${robot}`,
      ]
    })

    const handle  = actionType.replace(/\-/, '_') as 'cloud' | 'get_dev_source_map' | 'pack_npm' | 'preview' | 'upload' | 'pack_npm_manually';

    await project[handle]();

    console.log('upload success');
  } catch (error) {
    core.setFailed(error);
  }
}

run();
