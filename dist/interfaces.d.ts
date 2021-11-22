export interface guildSettingsSchema {
    running: boolean;
    prefix: string;
    botname: string;
    maincolor: number[];
    ownerroles: number[];
    owners: number[];
    adminroles: number[];
    admins: number[];
    modroles: number[];
    mods: number[];
}
export interface mainSettingsSchema {
    running: boolean;
    prefix: string;
    owners: string[];
    devs: string[];
    admins: string[];
    mods: string[];
    maincolor: number[];
    botname: string;
    disabledCommands: string[];
}
