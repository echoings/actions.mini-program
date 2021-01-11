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
        const projectPath = core.getInput('project_path');
        const version = core.getInput('version');
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
                return `${map[0]}, ${map[1]}`;
            }
            return `${map[0]}, 'true'`;
        });
        const existsRobotConfig = await fs_extra_1.default.pathExists(path_1.default.join(sourceDir, 'mini.program.robot.config.js'));
        let robotConfig = {};
        if (existsRobotConfig) {
            robotConfig = require(path_1.default.join(sourceDir, 'mini-program-robot.js'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLG9EQUFzQztBQUN0Qyx3REFBMEM7QUFDMUMsd0RBQTBCO0FBQzFCLG9EQUEyQjtBQUMzQixzREFBOEI7QUFFOUIsS0FBSyxVQUFVLEdBQUc7SUFDaEIsSUFBSTtRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsNENBQTRDO1FBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkQsTUFBTSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUM1RixNQUFNLFNBQVMsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwRCxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLGFBQWEsU0FBUyxNQUFNLENBQUM7UUFDbkQsTUFBTSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUV6RCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElB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