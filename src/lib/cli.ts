import path from 'path';
import * as exec from '@actions/exec';
import fs from 'fs-extra';
import * as core from '@actions/core';

export default class Cli{
  options: any = {};
  constructor(options: Object) {
    this.options = options;
  }

  // preview
  async preview() {
    const { baseArgs, sourceDir } = this.options;
    const timestamp = new Date().getTime();
    const preview_pic_dir = path.join(sourceDir, `${timestamp}/preview.jpg`);    

    await fs.ensureFile(preview_pic_dir);
    await exec.exec('npx', [
      ...baseArgs,
      '--qrcode-format',
      'image',
      '--qrcode-output-dest',
      `${preview_pic_dir}`,
    ]);

    core.setOutput('preview_pic_dir', preview_pic_dir);
  }

  // upload
  async upload() {
    const { baseArgs, sourceDir } = this.options;
    const timestamp = new Date().getTime();
    const preview_pic_dir = path.join(sourceDir, `${timestamp}/preview.jpg`);    

    await fs.ensureFile(preview_pic_dir);
    await exec.exec('npx', [
      ...baseArgs,
    ]);
  }

  // cloud
  async cloud() {
    const { baseArgs } = this.options;
    
    await exec.exec('npx', [
      ...baseArgs,
    ]);
  }

  // pack-npm
  async pack_npm() {
    const { baseArgs } = this.options;
    
    await exec.exec('npx', [
      ...baseArgs,
    ]);
  }

  // get-dev-source-map
  async get_dev_source_map() {
    const { baseArgs, sourceDir } = this.options;
    const timestamp = new Date().getTime();
    const source_map_save_path = path.join(sourceDir, `${timestamp}/sourcemap.zip`);
    
    await fs.ensureFile(source_map_save_path);
    await exec.exec('npx', [
      ...baseArgs,
      '--source-map-save-path',
      `${source_map_save_path}`,
    ]);

    core.setOutput('source_map_save_path', source_map_save_path);
  }

  // pack-npm-manually
  async pack_npm_manually() {
    const { baseArgs } = this.options;
    
    await exec.exec('npx', [
      ...baseArgs,
    ]);
  }
}