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
    }
    catch (error) {
        core.setFailed(error);
    }
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLDZDQUE2QztBQUM3QyxPQUFPLEtBQUssSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFMUIsS0FBSyxVQUFVLEdBQUc7SUFDaEIsSUFBSTtRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFeEQsTUFBTSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUU1RixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBELE1BQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDO1FBRTNDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLGdCQUFnQjtZQUNoQixTQUFTO1lBQ1QsZ0JBQWdCLEVBQUUsR0FBRyxXQUFXLEVBQUU7WUFDbEMsTUFBTTtZQUNOLEdBQUcsU0FBUyxFQUFFO1lBQ2QsT0FBTztZQUNQLEdBQUcsYUFBYSxFQUFFO1lBQ2xCLFNBQVM7WUFDVCxHQUFHLFdBQVcsRUFBRTtZQUNoQixNQUFNO1lBQ04sT0FBTztZQUNQLElBQUk7WUFDSixHQUFHO1lBQ0gsY0FBYztZQUNkLE1BQU07WUFDTixpQkFBaUI7WUFDakIsT0FBTztZQUNQLHNCQUFzQjtZQUN0QixHQUFHLGFBQWEsRUFBRTtTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkI7QUFDSCxDQUFDO0FBRUQsR0FBRyxFQUFFLENBQUMifQ==