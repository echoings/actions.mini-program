import path from 'path';
import * as exec from '@actions/exec';
import fs from 'fs-extra';
import * as core from '@actions/core';
export default class Cli {
    constructor(options) {
        this.options = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMxQixPQUFPLEtBQUssSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUV0QyxNQUFNLENBQUMsT0FBTyxPQUFPLEdBQUc7SUFFdEIsWUFBWSxPQUFlO1FBRDNCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7SUFDVixLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztRQUV6RSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixHQUFHLFFBQVE7WUFDWCxpQkFBaUI7WUFDakIsT0FBTztZQUNQLHNCQUFzQjtZQUN0QixHQUFHLGVBQWUsRUFBRTtTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxTQUFTO0lBQ1QsS0FBSyxDQUFDLE1BQU07UUFDVixNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLFNBQVMsY0FBYyxDQUFDLENBQUM7UUFFekUsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUixLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7SUFDWCxLQUFLLENBQUMsUUFBUTtRQUNaLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixLQUFLLENBQUMsa0JBQWtCO1FBQ3RCLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLGdCQUFnQixDQUFDLENBQUM7UUFFaEYsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixHQUFHLFFBQVE7WUFDWCx3QkFBd0I7WUFDeEIsR0FBRyxvQkFBb0IsRUFBRTtTQUMxQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELG9CQUFvQjtJQUNwQixLQUFLLENBQUMsaUJBQWlCO1FBQ3JCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIn0=