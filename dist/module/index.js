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
        const commandOptions = options.replace(/\n/, '').split('=');
        console.log(eval(options), commandOptions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLDZDQUE2QztBQUM3QyxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUIsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNCLEtBQUssVUFBVSxHQUFHO0lBQ2hCLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV2RCxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQzVGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsTUFBTSxhQUFhLEdBQUcsYUFBYSxTQUFTLE1BQU0sQ0FBQztRQUNuRCxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFekQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixNQUFNLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQztZQUNyQixTQUFTO1lBQ1QsV0FBVztZQUNYLE9BQU87WUFDUCxjQUFjO1lBQ2QsU0FBUztZQUNULE9BQU87WUFDUCxRQUFRLEVBQUU7Z0JBQ1IsZ0JBQWdCO2dCQUNoQixHQUFHLFVBQVUsRUFBRTtnQkFDZixnQkFBZ0IsRUFBRSxHQUFHLFdBQVcsRUFBRTtnQkFDbEMsTUFBTSxFQUFFLEdBQUcsU0FBUyxFQUFFO2dCQUN0QixPQUFPLEVBQUUsR0FBRyxhQUFhLEVBQUU7Z0JBQzNCLFNBQVMsRUFBRSxHQUFHLFdBQVcsRUFBRTtnQkFDM0IsTUFBTSxFQUFFLEdBQUcsT0FBTyxFQUFFO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxLQUFLLEVBQUU7YUFDakI7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLE1BQU0sR0FBNkYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFRLENBQUM7UUFFOUksTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkI7QUFDSCxDQUFDO0FBRUQsR0FBRyxFQUFFLENBQUMifQ==