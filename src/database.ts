// Last modified: 2021/11/25 02:29:44
import { Guild } from 'discord.js';
import { Schema, Model, model, models, SchemaTypes, modelNames } from 'mongoose';
import { guildSettingsSchema, mainSettingsSchema } from './interfaces';

export {
    db,
    schemas
}

class db {
    model?: Model<any, {}, {}>

    constructor(model?: Model<any, {}, {}>) { 
        if (model) { (this.model as Model<any, {}, {}>) = model; }
    }

    /**
     * Add records to database collection
     * @param records Array of records
     */
    async createRecords(records: any[]) {
        return (this.model as Model<any, {}, {}>).insertMany(records);
    }

    async createCollection() {
        (this.model as Model<any, {}, {}>).createCollection();
    }

    /**
     * Read records from database collection
     * @param querys Record array of JSON search objects
     * @param options Optional properties to return
     * @returns Records, if any
     */
    async readRecords(querys: any[] | undefined, options?: string) {
        var returns: any[] = [];

        if (querys != undefined) {
            for (const query of querys) {
                if (options) {
                    returns.push(await (this.model as Model<any, {}, {}>).findOne(query, options).exec());
                }
        
                returns.push(await (this.model as Model<any, {}, {}>).findOne(query).exec());
            }
        } 
        if (querys == undefined) {
            if (options) {
                returns.push(await (this.model as Model<any, {}, {}>).findOne({ }, options).exec());
            }
        }

        return returns;
    }

    /**
     * Replace entire Records in database collection
     * @param querys Record array of JSON search objects
     * @param newValue New Records to replace found querys, if any
     */
    async replaceRecords(querys: any[], newValue: any) {
        for (const query of querys) {
            await (this.model as Model<any, {}, {}>).findOneAndReplace(query, newValue).exec();
        }
    }

    /**
     * Update fields of Records in database collection
     * @param querys Record array of JSON search objects
     * @param newRecord New values to replace in found queried records, if any
     */
    async updateRecords(querys: any[], newRecord: any) {
        for (const query of querys) {
            await (this.model as Model<any, {}, {}>).findOneAndUpdate(query, newRecord, { useFindAndModify: false }).exec();
        }
    }

    /**
     * Delete records from database collection
     * @param querys Record array of JSON search objects
     */
    async deleteRecords(querys: any[]) {
        for (const query of querys) { 
            await (this.model as Model<any, {}, {}>).findOneAndDelete(query).exec();
        }
    }

}

namespace schemas {
    export namespace template {
        export function templateSchema(_collection: string, _schema?: {}) {
            const _templateSchema = _schema ? new Schema(_schema, { collection: _collection}) : new Schema({ }, { collection: _collection});
            return _templateSchema;
        }
        
        export function templateModel(_collection: string, _clearModels?: boolean, _schema?: {}) {
            const _model = _schema ? model(_collection, templateSchema(_collection, _schema)) : model(_collection, templateSchema(_collection));
            if (_clearModels) for (let model in models) if (models[model] == _model) { delete models[model] };
            return _model;
        }
    }

    export namespace guild {
        export function coreGuildSchema(guild: Guild) {
            const _schema = new Schema<guildSettingsSchema>({
                running: { type: Boolean, required: true },
                prefix: { type: String, required: true },
                botname: { type: String, required: true },
                maincolor: { type: [Number], default: [0, 0, 0] },
                ownerroles: { type: [String], default: [] },
                owners: { type: [String], default: [] },
                adminroles: { type: [String], default: [] },
                admins: { type: [String], default: [] },
    
                modroles: { type: [String], default: [] },
                mods: { type: [String], default: [] },
            }, { collection: guild.id + "_CoreSettings"});
            return _schema;
        }
        
        export function coreGuildModel(_guild: Guild, _clearModels?: boolean) {
            const _model = models[_guild.id] || model<guildSettingsSchema>(_guild.id, coreGuildSchema(_guild));
            if (_clearModels) clearModels(_model);
            return _model;
        }
    }

    export namespace main {
        export function coreMainSchema() {
            const _schema = new Schema<mainSettingsSchema>({
                running: { type: Boolean, required: true },
                prefix: { type: String, required: true },
                botname: { type: String, required: true },
                maincolor: { type: [Number], default: [0, 0, 0] },
                owners: { type: [String], default: [] },
                devs: { type: [String], default: [] },
                admins: { type: [String], default: [] },
                mods: { type: [String], default: [] },
                disabledCommands: { type: [String], default: [] },
            }, { collection: "Main_CoreSettings" });
            
            return _schema;
        }
        
        export function coreMainModel(_clearModels?: boolean) {
            const _model = models.Main || model<mainSettingsSchema>("Main", coreMainSchema());
            if (_clearModels) clearModels(_model);
            return _model;
        }
    }
}

let clearModels = function(_model: Model<any, {}, {}>) {
    for (let model in models) if (models[model] == _model) { delete models[model] };
}