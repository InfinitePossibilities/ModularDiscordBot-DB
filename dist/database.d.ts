import { Guild } from 'discord.js';
import { Schema, Model } from 'mongoose';
import { guildSettingsSchema, mainSettingsSchema } from './interfaces';
export { db, schemas };
declare class db {
    model?: Model<any, {}, {}>;
    constructor(model?: Model<any, {}, {}>);
    /**
     * Add records to database collection
     * @param records Array of records
     */
    createRecords(records: any[]): Promise<void>;
    createCollection(): Promise<void>;
    /**
     * Read records from database collection
     * @param querys Record array of JSON search objects
     * @param options Optional properties to return
     * @returns Records, if any
     */
    readRecords(querys: any[] | undefined, options?: string): Promise<any[]>;
    /**
     * Replace entire Records in database collection
     * @param querys Record array of JSON search objects
     * @param newValue New Records to replace found querys, if any
     */
    replaceRecords(querys: any[], newValue: any): Promise<void>;
    /**
     * Update fields of Records in database collection
     * @param querys Record array of JSON search objects
     * @param newRecord New values to replace in found queried records, if any
     */
    updateRecords(querys: any[], newRecord: any): Promise<void>;
    /**
     * Delete records from database collection
     * @param querys Record array of JSON search objects
     */
    deleteRecords(querys: any[]): Promise<void>;
}
declare namespace schemas {
    namespace template {
        function templateSchema(_collection: string, _schema?: {}): Schema<any, Model<any, any, any, any>, {}>;
        function templateModel(_collection: string, _clearModels?: boolean, _schema?: {}): Model<any, {}, {}, {}>;
    }
    namespace guild {
        function coreGuildSchema(guild: Guild): Schema<guildSettingsSchema, Model<guildSettingsSchema, any, any, any>, {}>;
        function coreGuildModel(_guild: Guild, _clearModels?: boolean): Model<any, {}, {}, {}>;
    }
    namespace main {
        function coreMainSchema(): Schema<mainSettingsSchema, Model<mainSettingsSchema, any, any, any>, {}>;
        function coreMainModel(_clearModels?: boolean): Model<any, {}, {}, {}>;
    }
}
