export default class Cli {
    options: any;
    constructor(options: Object);
    preview(): Promise<void>;
    upload(): Promise<void>;
    cloud(): Promise<void>;
    pack_npm(): Promise<void>;
    get_dev_source_map(): Promise<void>;
    pack_npm_manually(): Promise<void>;
}
