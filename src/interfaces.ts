export interface guildSettingsSchema {
    running: boolean, 
    prefix: string, 
    botname: string, 
    maincolor: number[], 
    ownerroles: number[] 
    owners: number[], 
    adminroles: number[], 
    admins: number[], 
    modroles: number[], 
    mods: number[], 
    // pointmodroles: number[], 
    // pointmods: number[],
    
    // doAutoAnnounce: boolean,
    // announceChannels: number[],
    // doChannelLog: boolean,
    // logChannels: number[],
    // doRoleOpt: boolean,
    // optRoles: number[],
    
    // roleAnnounceBlacklist: number[],
    // requestBlacklisted: number[],
    // usersBlacklisted: number[],
    
    // robloxEnabled: boolean,
    // protectees: number[],
    // robloxGroup: number[],
    // opted: number[]
}

export interface mainSettingsSchema {
    running: boolean, 
    prefix: string, 
    owners: string[],
    devs: string[],
    admins: string[],
    mods: string[],
    maincolor: number[],
    botname: string,
    disabledCommands: string[],

    // discordGuilds: number[],
    // robloxGroups: number[],
    // robloxEnabled: boolean,
    // usersblacklisted: number[]
}