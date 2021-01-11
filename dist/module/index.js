import path from 'path';
import * as core from '@actions/core';
// import * as github from '@actions/github';
import exec from '@actions/exec';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLDZDQUE2QztBQUM3QyxPQUFPLElBQUksTUFBTSxlQUFlLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTFCLEtBQUssVUFBVSxHQUFHO0lBQ2hCLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXhELE1BQU0sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFFNUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1QixNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztRQUN2RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwRCxNQUFNLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztRQUUzQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDekQsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixnQkFBZ0I7WUFDaEIsU0FBUztZQUNULGdCQUFnQixFQUFFLEdBQUcsV0FBVyxFQUFFO1lBQ2xDLE1BQU07WUFDTixHQUFHLFNBQVMsRUFBRTtZQUNkLE9BQU87WUFDUCxHQUFHLGFBQWEsRUFBRTtZQUNsQixTQUFTO1lBQ1QsR0FBRyxXQUFXLEVBQUU7WUFDaEIsTUFBTTtZQUNOLE9BQU87WUFDUCxJQUFJO1lBQ0osR0FBRztZQUNILGNBQWM7WUFDZCxNQUFNO1lBQ04saUJBQWlCO1lBQ2pCLE9BQU87WUFDUCxzQkFBc0I7WUFDdEIsR0FBRyxhQUFhLEVBQUU7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQy9CO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZCO0FBQ0gsQ0FBQztBQUVELEdBQUcsRUFBRSxDQUFDIn0=