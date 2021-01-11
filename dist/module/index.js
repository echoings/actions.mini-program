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
        const commandOptions = options.replace('\n', '').split(' ').map(v => {
            const map = v.split('=');
            if (map[1]) {
                return `${map[0]}, ${map[1]}`;
            }
            return `${map[0]}, 'true'`;
        });
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
                '--ud', `'${commits[0].message}'`,
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