import path from 'path';
import * as core from '@actions/core';
// import * as github from '@actions/github';
import fs from 'fs-extra';
import ci from './lib/cli';
async function run() {
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
        let commandOptions = options.split('\n');
        commandOptions.map(v => {
            const map = v.split('=');
            if (map[1]) {
                return `${map[0]}, ${map[1]}`;
            }
            return `${map[0]}, 'true'`;
        });
        console.log(commandOptions);
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
        });
        const handle = actionType.replace(/\-/, '_');
        await project[handle]();
        console.log('upload success');
    }
    catch (error) {
        core.setFailed(error);
    }
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLDZDQUE2QztBQUM3QyxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUIsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNCLEtBQUssVUFBVSxHQUFHO0lBQ2hCLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV2RCxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQzVGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsTUFBTSxhQUFhLEdBQUcsYUFBYSxTQUFTLE1BQU0sQ0FBQztRQUNuRCxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFHekQsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1QsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUMvQjtZQUVELE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ3JCLFNBQVM7WUFDVCxXQUFXO1lBQ1gsT0FBTztZQUNQLGNBQWM7WUFDZCxTQUFTO1lBQ1QsT0FBTztZQUNQLFFBQVEsRUFBRTtnQkFDUixnQkFBZ0I7Z0JBQ2hCLEdBQUcsVUFBVSxFQUFFO2dCQUNmLGdCQUFnQixFQUFFLEdBQUcsV0FBVyxFQUFFO2dCQUNsQyxNQUFNLEVBQUUsR0FBRyxTQUFTLEVBQUU7Z0JBQ3RCLE9BQU8sRUFBRSxHQUFHLGFBQWEsRUFBRTtnQkFDM0IsU0FBUyxFQUFFLEdBQUcsV0FBVyxFQUFFO2dCQUMzQixNQUFNLEVBQUUsR0FBRyxPQUFPLEVBQUU7Z0JBQ3BCLElBQUksRUFBRSxHQUFHLEtBQUssRUFBRTthQUNqQjtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sTUFBTSxHQUE2RixVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQVEsQ0FBQztRQUU5SSxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUMvQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN2QjtBQUNILENBQUM7QUFFRCxHQUFHLEVBQUUsQ0FBQyJ9