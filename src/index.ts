import path from 'path';
import * as core from '@actions/core';
// import * as github from '@actions/github';
import * as exec from '@actions/exec';
import fs from 'fs-extra';

async function run(): Promise<void> {
  try {
    const projectType = core.getInput('project_type');
    const projectPath = core.getInput('project_path');
    const commandOptions = core.getInput('command_options');

    const { MINI_APP_ID, MINI_APP_PRIVATE_KEY, GITHUB_WORKSPACE: sourceDir = '' } = process.env;

    console.log(commandOptions);

    const timestamp = new Date().getTime();
    const previewPicDir = path.join(sourceDir, `${timestamp}/preview.jpg`);
    const uploadDir = path.join(sourceDir, projectPath);

    const privateKeyDir = `./private.mini.key`;

    await fs.outputFile(privateKeyDir, MINI_APP_PRIVATE_KEY);
    await exec.exec('npx', [
      'miniprogram-ci',
      'preview',
      '--project-type', `${projectType}`,
      '--pp',
      `${uploadDir}`,
      '--pkp',
      `${privateKeyDir}`,
      `--appid`,
      `${MINI_APP_ID}`,
      '--uv',
      '0.0.2',
      '-r',
      '3',
      '--enable-es6',
      'true',
      '--qrcode-format',
      'image',
      '--qrcode-output-dest',
      `${previewPicDir}`,
    ]);

    core.setOutput('previewPicDir', previewPicDir);
    console.log('upload success');
  } catch (error) {
    core.setFailed(error);
  }
}

run();
