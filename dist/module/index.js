import path from 'path';
import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs-extra';
import ci from './lib/cli';
import config from './config';
async function run() {
    try {
        const projectType = core.getInput('project_type');
        const actionType = core.getInput('action_type');
        const projectPath = core.getInput('project_path');
        const version = core.getInput('version');
        // const ignores = core.getInput('ignores');
        const options = core.getInput('command_options') || '';
        const { MINI_APP_ID, MINI_APP_PRIVATE_KEY, GITHUB_WORKSPACE: sourceDir = '' } = process.env;
        const uploadDir = path.join(sourceDir, projectPath);
        const timestamp = new Date().getTime();
        const privateKeyDir = `./private.${timestamp}.key`;
        await fs.outputFile(privateKeyDir, MINI_APP_PRIVATE_KEY);
        const commandOptions = options.split('\n').map(v => {
            const map = v.split('=');
            if (map[1]) {
                return `${map[0]}, ${map[1]}`;
            }
            return `${map[0]}, 'true'`;
        });
        console.log(commandOptions);
        const existsRobotConfig = await fs.pathExists(path.join(sourceDir, 'mini.program.robot.config.js'));
        let robotConfig = {};
        if (existsRobotConfig) {
            robotConfig = require(path.join(sourceDir, 'mini-program-robot.js'));
        }
        else {
            robotConfig = config;
        }
        const author = github.context.actor;
        const branch = github.context.ref.replace(/refs\/heads\//, '');
        const robot = robotConfig[branch] || robotConfig[author] || 28;
        const commits = github.context.payload.commits || [{ message: `robot ${robot} trigger this pub` }];
        console.log('rrrrr ', author, branch, robot);
        const project = new ci({
            sourceDir,
            projectType,
            version,
            uploadDir,
            // ignores,
            baseArgs: [
                'miniprogram-ci',
                `${actionType}`,
                '--project-type', `${projectType}`,
                '--pp', `${uploadDir}`,
                '--pkp', `${privateKeyDir}`,
                '--appid', `${MINI_APP_ID}`,
                '--uv', `${version}`,
                '--ud', `${commits[0].message}`,
                '-r', `${robot}`,
                ...commandOptions,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sS0FBSyxJQUFJLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sS0FBSyxNQUFNLE1BQU0saUJBQWlCLENBQUM7QUFDMUMsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMzQixPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFFOUIsS0FBSyxVQUFVLEdBQUc7SUFDaEIsSUFBSTtRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsNENBQTRDO1FBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkQsTUFBTSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUM1RixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwRCxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLGFBQWEsU0FBUyxNQUFNLENBQUM7UUFDbkQs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