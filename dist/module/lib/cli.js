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
            '--enable-es6',
            'true',
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
            '--enable-es6',
            'true'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMxQixPQUFPLEtBQUssSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUV0QyxNQUFNLENBQUMsT0FBTyxPQUFPLEdBQUc7SUFFdEIsWUFBWSxPQUFlO1FBRDNCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7SUFDVixLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztRQUV6RSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixHQUFHLFFBQVE7WUFDWCxjQUFjO1lBQ2QsTUFBTTtZQUNOLGlCQUFpQjtZQUNqQixPQUFPO1lBQ1Asc0JBQXNCO1lBQ3RCLEdBQUcsZUFBZSxFQUFFO1NBQ3JCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFNBQVM7SUFDVCxLQUFLLENBQUMsTUFBTTtRQUNWLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztRQUV6RSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixHQUFHLFFBQVE7WUFDWCxjQUFjO1lBQ2QsTUFBTTtTQUNQLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO0lBQ1IsS0FBSyxDQUFDLEtBQUs7UUFDVCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVsQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLEdBQUcsUUFBUTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO0lBQ1gsS0FBSyxDQUFDLFFBQVE7UUFDWixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVsQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLEdBQUcsUUFBUTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUI7SUFDckIsS0FBSyxDQUFDLGtCQUFrQjtRQUN0QixNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWhGLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1lBQ1gsd0JBQXdCO1lBQ3hCLEdBQUcsb0JBQW9CLEVBQUU7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxvQkFBb0I7SUFDcEIsS0FBSyxDQUFDLGlCQUFpQjtRQUNyQixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVsQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLEdBQUcsUUFBUTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiJ9