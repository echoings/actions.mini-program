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
const exec = __importStar(require("@actions/exec"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const core = __importStar(require("@actions/core"));
class Cli {
    constructor(options) {
        this.options = {};
        this.options = options;
    }
    // preview
    async preview() {
        const { baseArgs, sourceDir } = this.options;
        const timestamp = new Date().getTime();
        const preview_pic_dir = path_1.default.join(sourceDir, `${timestamp}/preview.jpg`);
        await fs_extra_1.default.ensureFile(preview_pic_dir);
        await exec.exec('npx', [
            ...baseArgs,
            '--enable-es6',
            'true',
            '--qrcode-format',
            'image',
            '--qrcode-output-dest',
            `${preview_pic_dir}`,
        ]);
        core.setOutput('preview_pic_dir', preview_pic_dir);
    }
    // upload
    async upload() {
        const { baseArgs, sourceDir } = this.options;
        const timestamp = new Date().getTime();
        const preview_pic_dir = path_1.default.join(sourceDir, `${timestamp}/preview.jpg`);
        await fs_extra_1.default.ensureFile(preview_pic_dir);
        await exec.exec('npx', [
            ...baseArgs,
            '--enable-es6',
            'true'
        ]);
    }
    // cloud
    async cloud() {
        const { baseArgs } = this.options;
        await exec.exec('npx', [
            ...baseArgs,
        ]);
    }
    // pack-npm
    async pack_npm() {
        const { baseArgs } = this.options;
        await exec.exec('npx', [
            ...baseArgs,
        ]);
    }
    // get-dev-source-map
    async get_dev_source_map() {
        const { baseArgs, sourceDir } = this.options;
        const timestamp = new Date().getTime();
        const source_map_save_path = path_1.default.join(sourceDir, `${timestamp}/sourcemap.zip`);
        await fs_extra_1.default.ensureFile(source_map_save_path);
        await exec.exec('npx', [
            ...baseArgs,
            '--source-map-save-path',
            `${source_map_save_path}`,
        ]);
        core.setOutput('source_map_save_path', source_map_save_path);
    }
    // pack-npm-manually
    async pack_npm_manually() {
        const { baseArgs } = this.options;
        await exec.exec('npx', [
            ...baseArgs,
        ]);
    }
}
exports.default = Cli;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLG9EQUFzQztBQUN0Qyx3REFBMEI7QUFDMUIsb0RBQXNDO0FBRXRDLE1BQXFCLEdBQUc7SUFFdEIsWUFBWSxPQUFlO1FBRDNCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7SUFDVixLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztRQUV6RSxNQUFNLGtCQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1lBQ1gsY0FBYztZQUNkLE1BQU07WUFDTixpQkFBaUI7WUFDakIsT0FBTztZQUNQLHNCQUFzQjtZQUN0QixHQUFHLGVBQWUsRUFBRTtTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxTQUFTO0lBQ1QsS0FBSyxDQUFDLE1BQU07UUFDVixNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGVBQWUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLFNBQVMsY0FBYyxDQUFDLENBQUM7UUFFekUsTUFBTSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLEdBQUcsUUFBUTtZQUNYLGNBQWM7WUFDZCxNQUFNO1NBQ1AsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUixLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7SUFDWCxLQUFLLENBQUMsUUFBUTtRQUNaLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixLQUFLLENBQUMsa0JBQWtCO1FBQ3RCLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sb0JBQW9CLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLGdCQUFnQixDQUFDLENBQUM7UUFFaEYsTUFBTSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1lBQ1gsd0JBQXdCO1lBQ3hCLEdBQUcsb0JBQW9CLEVBQUU7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxvQkFBb0I7SUFDcEIsS0FBSyxDQUFDLGlCQUFpQjtRQUNyQixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVsQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLEdBQUcsUUFBUTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWxGRCxzQkFrRkMifQ==