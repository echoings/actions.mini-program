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
// import * as github from '@actions/github';
const exec = __importStar(require("@actions/exec"));
const fs_extra_1 = __importDefault(require("fs-extra"));
async function run() {
    try {
        const projectType = core.getInput('project_type');
        const projectPath = core.getInput('project_path');
        const commandOptions = core.getInput('command_options');
        const { MINI_APP_ID, MINI_APP_PRIVATE_KEY, GITHUB_WORKSPACE: sourceDir = '' } = process.env;
        console.log(commandOptions.split('='));
        const timestamp = new Date().getTime();
        const previewPicDir = path_1.default.join(sourceDir, `${timestamp}/preview.jpg`);
        const uploadDir = path_1.default.join(sourceDir, projectPath);
        const privateKeyDir = `./private.mini.key`;
        await fs_extra_1.default.ensureFile(previewPicDir);
        await fs_extra_1.default.outputFile(privateKeyDir, MINI_APP_PRIVATE_KEY);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLG9EQUFzQztBQUN0Qyw2Q0FBNkM7QUFDN0Msb0RBQXNDO0FBQ3RDLHdEQUEwQjtBQUUxQixLQUFLLFVBQVUsR0FBRztJQUNoQixJQUFJO1FBQ0YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV4RCxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBRTVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsTUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sU0FBUyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBELE1BQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDO1FBRTNDLE1BQU0sa0JBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkMsTUFBTSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLGdCQUFnQjtZQUNoQixTQUFTO1lBQ1QsZ0JBQWdCLEVBQUUsR0FBRyxXQUFXLEVBQUU7WUFDbEMsTUFBTTtZQUNOLEdBQUcsU0FBUyxFQUFFO1lBQ2QsT0FBTztZQUNQLEdBQUcsYUFBYSxFQUFFO1lBQ2xCLFNBQVM7WUFDVCxHQUFHLFdBQVcsRUFBRTtZQUNoQixNQUFNO1lBQ04sT0FBTztZQUNQLElBQUk7WUFDSixHQUFHO1lBQ0gsY0FBYztZQUNkLE1BQU07WUFDTixpQkFBaUI7WUFDakIsT0FBTztZQUNQLHNCQUFzQjtZQUN0QixHQUFHLGFBQWEsRUFBRTtTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkI7QUFDSCxDQUFDO0FBRUQsR0FBRyxFQUFFLENBQUMifQ==