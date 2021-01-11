import path from 'path';
import * as core from '@actions/core';
// import * as github from '@actions/github';
import * as exec from '@actions/exec';
import fs from 'fs-extra';
async function run() {
    try {
        const projectType = core.getInput('project_type');
        const projectPath = core.getInput('project_path');
        const commandOptions = core.getInput('command_options');
        const { MINI_APP_ID, MINI_APP_PRIVATE_KEY, GITHUB_WORKSPACE: sourceDir = '' } = process.env;
        console.log(commandOptions.split('='));
        const timestamp = new Date().getTime();
        const previewPicDir = path.join(sourceDir, `${timestamp}/preview.jpg`);
        const uploadDir = path.join(sourceDir, projectPath);
        const privateKeyDir = `./private.mini.key`;
        await fs.ensureFile(previewPicDir);
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
    }
    catch (error) {
        core.setFailed(error);
    }
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLDZDQUE2QztBQUM3QyxPQUFPLEtBQUssSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFMUIsS0FBSyxVQUFVLEdBQUc7SUFDaEIsSUFBSTtRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFeEQsTUFBTSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUU1RixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztRQUN2RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwRCxNQUFNLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztRQUUzQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsZ0JBQWdCO1lBQ2hCLFNBQVM7WUFDVCxnQkFBZ0IsRUFBRSxHQUFHLFdBQVcsRUFBRTtZQUNsQyxNQUFNO1lBQ04sR0FBRyxTQUFTLEVBQUU7WUFDZCxPQUFPO1lBQ1AsR0FBRyxhQUFhLEVBQUU7WUFDbEIsU0FBUztZQUNULEdBQUcsV0FBVyxFQUFFO1lBQ2hCLE1BQU07WUFDTixPQUFPO1lBQ1AsSUFBSTtZQUNKLEdBQUc7WUFDSCxjQUFjO1lBQ2QsTUFBTTtZQUNOLGlCQUFpQjtZQUNqQixPQUFPO1lBQ1Asc0JBQXNCO1lBQ3RCLEdBQUcsYUFBYSxFQUFFO1NBQ25CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUMvQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN2QjtBQUNILENBQUM7QUFFRCxHQUFHLEVBQUUsQ0FBQyJ9