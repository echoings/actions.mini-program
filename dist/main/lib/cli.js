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
            '--qrcode-format',
            'image',
            '--qrcode-output-dest',
            `${preview_pic_dir}`,
        ]);
        core.setOutput('preview_pic_dir', preview_pic_dir);
    }
    // upload
    async upload() {
        const { baseArgs } = this.options;
        await exec.exec('npx', [
            ...baseArgs,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLG9EQUFzQztBQUN0Qyx3REFBMEI7QUFDMUIsb0RBQXNDO0FBRXRDLE1BQXFCLEdBQUc7SUFFdEIsWUFBWSxPQUFlO1FBRDNCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7SUFDVixLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQztRQUV6RSxNQUFNLGtCQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1lBQ1gsaUJBQWlCO1lBQ2pCLE9BQU87WUFDUCxzQkFBc0I7WUFDdEIsR0FBRyxlQUFlLEVBQUU7U0FDckIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsU0FBUztJQUNULEtBQUssQ0FBQyxNQUFNO1FBQ1YsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFbEMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixHQUFHLFFBQVE7U0FDWixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNSLEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFbEMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixHQUFHLFFBQVE7U0FDWixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztJQUNYLEtBQUssQ0FBQyxRQUFRO1FBQ1osTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFbEMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixHQUFHLFFBQVE7U0FDWixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUJBQXFCO0lBQ3JCLEtBQUssQ0FBQyxrQkFBa0I7UUFDdEIsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdDLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsTUFBTSxvQkFBb0IsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQztRQUVoRixNQUFNLGtCQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixHQUFHLFFBQVE7WUFDWCx3QkFBd0I7WUFDeEIsR0FBRyxvQkFBb0IsRUFBRTtTQUMxQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELG9CQUFvQjtJQUNwQixLQUFLLENBQUMsaUJBQWlCO1FBQ3JCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsR0FBRyxRQUFRO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBM0VELHNCQTJFQyJ9