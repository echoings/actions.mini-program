import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {

    const msg = 'custom logic here';

    core.setOutput('msg', `${new Date() + ': ' + msg}`);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
