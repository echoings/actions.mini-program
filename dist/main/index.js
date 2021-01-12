"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const cli_1 = __importDefault(require("./lib/cli"));
const config_1 = __importDefault(require("./config"));
async function run() {
    try {
        const projectType = core.getInput('project_type');
        const actionType = core.getInput('action_type');
        const subcommand = core.getInput('subcommand');
        const projectPath = core.getInput('project_path');
        const version = core.getInput('version');
        const remark = core.getInput('remark');
        // const ignores = core.getInput('ignores');
        const options = core.getInput('command_options') || '';
        const { MINI_APP_ID, MINI_APP_PRIVATE_KEY, GITHUB_WORKSPACE: sourceDir = '' } = process.env;
        const uploadDir = path_1.default.join(sourceDir, projectPath);
        const timestamp = new Date().getTime();
        const privateKeyDir = `./private.${timestamp}.key`;
        await fs_extra_1.default.outputFile(privateKeyDir, MINI_APP_PRIVATE_KEY);
        const commandOptions = options.replace('\n', '').split(' ').map(v => {
            const map = v.split('=');
            if (map[1]) {
                return `${map[0]} ${map[1]}`;
            }
            return `${map[0]} 'true'`;
        });
        const existsRobotConfig = await fs_extra_1.default.pathExists(path_1.default.join(sourceDir, 'mini.program.robot.config.js'));
        let robotConfig = {};
        if (existsRobotConfig) {
            robotConfig = require(path_1.default.join(sourceDir, '.mini-program-robot.js'));
        }
        else {
            robotConfig = config_1.default;
        }
        const author = github.context.actor;
        const branch = github.context.ref.replace(/refs\/heads\//, '');
        const robot = robotConfig[branch] || robotConfig[author] || 28;
        const commits = github.context.payload.commits || [{ message: `robot ${robot} trigger this pub` }];
        const project = new cli_1.default({
            sourceDir,
            projectType,
            version,
            uploadDir,
            // ignores,
            baseArgs: [
                'miniprogram-ci',
                ...subcommand.split(' '),
                `${actionType}`,
                '--project-type', `${projectType}`,
                '--pp', `${uploadDir}`,
                '--pkp', `${privateKeyDir}`,
                '--appid', `${MINI_APP_ID}`,
                '--uv', `${version}`,
                '--ud', `'${remark || commits[0].message}'`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLG9EQUFzQztBQUN0Qyx3REFBMEM7QUFDMUMsd0RBQTBCO0FBQzFCLG9EQUEyQjtBQUMzQixzREFBOEI7QUFFOUIsS0FBSyxVQUFVLEdBQUc7SUFDaEIsSUFBSTtRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9DLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZDLDRDQUE0QztRQUM1QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1FBRXZELE1BQU0sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDNUYsTUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGFBQWEsR0FBRyxhQUFhLFNBQVMs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