import path from 'path';
import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs-extra';
import ci from './lib/cli';
import config from './config';

async function run(): Promise<void> {
  try {
    const projectType = core.getInput('project_type');
    const actionType = core.getInput('action_type');
    const subcommand = core.getInput('subcommand');
    const projectPath = core.getInput('project_path');
    const version = core.getInput('version');
    const remark = core.getInput('remark');
    
    // const ignores = core.getInput('ignores');
    const options = core.getInput('command_options') || '';

    const { MINI_APP_ID, MINI_APP_PRIVATE_KEY, GITHUB_WORKSPACE: sourceDir = '' } = process.env;
    const uploadDir = path.join(sourceDir, projectPath);
    
    const timestamp = new Date().getTime();
    const privateKeyDir = `./private.${timestamp}.key`;
    await fs.outputFile(privateKeyDir, MINI_APP_PRIVATE_KEY);

    const commandOptions = options.replace('\n', '').split(' ').map(v => {
      const map = v.split('=');
      if(map[1]) {
        return `${map[0]} ${map[1]}`;
      }

      return `${map[0]} 'true'`;
    });

    const existsRobotConfig = await fs.pathExists(path.join(sourceDir, 'mini.program.robot.config.js'))
    
    let robotConfig: any= {};
    if(existsRobotConfig) {
      robotConfig = require(path.join(sourceDir, '.mini.program.robot.config.js'));
    } else {
      robotConfig = config;
    }

    const author = github.context.actor;
    const branch = github.context.ref.replace(/refs\/heads\//, '');
    const robot = robotConfig[branch] || robotConfig[author] || 28;
    const commits = github.context.payload.commits || [{message: `robot ${robot} trigger this pub`}];

    const project = new ci({
      sourceDir,
      projectType,
      version,
      uploadDir,
      // ignores,
      baseArgs: [
        'miniprogram-ci',
        ...subcommand.split(' '),
        `${actionType}`,
        '--project-type', `${projectType}`,
        '--pp', `${uploadDir}`,
        '--pkp', `${privateKeyDir}`,
        '--appid', `${MINI_APP_ID}`,
        '--uv', `${version}`,
        '--ud', `'${remark || commits[0].message}'`,
        '-r', `${robot}`,
        ...commandOptions,
      ]
    })

    const handle: 'cloud' | 'get_dev_source_map' | 'pack_npm' | 'preview' | 'upload' | 'pack_npm_manually' = actionType.replace(/\-/, '_') as any;

    await project[handle]();

    console.log('upload success');
  } catch (error) {
    core.setFailed(error);
  }
}

run();
