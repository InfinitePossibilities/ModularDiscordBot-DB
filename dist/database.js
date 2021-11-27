"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.db = void 0;
const mongoose_1 = require("mongoose");
class db {
    constructor(model) {
        if (model) {
            this.model = model;
        }
    }
    /**
     * Add records to database collection
     * @param records Array of records
     */
    async createRecords(records) {
        return this.model.insertMany(records);
    }
    async createCollection() {
        this.model.createCollection();
    }
    /**
     * Read records from database collection
     * @param querys Record array of JSON search objects
     * @param options Optional properties to return
     * @returns Records, if any
     */
    async readRecords(querys, options) {
        var returns = [];
        if (querys != undefined) {
            for (const query of querys) {
                if (options) {
                    returns.push(await this.model.findOne(query, options).exec());
                }
                returns.push(await this.model.findOne(query).exec());
            }
        }
        if (querys == undefined) {
            if (options) {
                returns.push(await this.model.findOne({}, options).exec());
            }
        }
        return returns;
    }
    /**
     * Read all records from database collection
     * @param querys Record array of JSON search objects
     * @param options Optional properties to return
     * @returns Records, if any
     */
    async readAllRecords() {
        return await this.model.find();
    }
    /**
     * Replace entire Records in database collection
     * @param querys Record array of JSON search objects
     * @param newValue New Records to replace found querys, if any
     */
    async replaceRecords(querys, newValue) {
        for (const query of querys) {
            await this.model.findOneAndReplace(query, newValue).exec();
        }
    }
    /**
     * Update fields of Records in database collection
     * @param querys Record array of JSON search objects
     * @param newRecord New values to replace in found queried records, if any
     */
    async updateRecords(querys, newRecord) {
        for (const query of querys) {
            await this.model.findOneAndUpdate(query, newRecord, { useFindAndModify: false }).exec();
        }
    }
    /**
     * Delete records from database collection
     * @param querys Record array of JSON search objects
     */
    async deleteRecords(querys) {
        for (const query of querys) {
            await this.model.findOneAndDelete(query).exec();
        }
    }
}
exports.db = db;
var schemas;
(function (schemas) {
    let template;
    (function (template) {
        function templateSchema(_collection, _schema) {
            const _templateSchema = _schema ? new mongoose_1.Schema(_schema, { collection: _collection }) : new mongoose_1.Schema({}, { collection: _collection });
            return _templateSchema;
        }
        template.templateSchema = templateSchema;
        function templateModel(_collection, _clearModels, _schema) {
            const _model = _schema ? (0, mongoose_1.model)(_collection, templateSchema(_collection, _schema)) : (0, mongoose_1.model)(_collection, templateSchema(_collection));
            if (_clearModels)
                for (let model in mongoose_1.models)
                    if (mongoose_1.models[model] == _model) {
                        delete mongoose_1.models[model];
                    }
            ;
            return _model;
        }
        template.templateModel = templateModel;
    })(template = schemas.template || (schemas.template = {}));
    let guild;
    (function (guild_1) {
        function coreGuildSchema(guild) {
            const _schema = new mongoose_1.Schema({
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
            }, { collection: guild.id + "_CoreSettings" });
            return _schema;
        }
        guild_1.coreGuildSchema = coreGuildSchema;
        function coreGuildModel(_guild, _clearModels) {
            const _model = mongoose_1.models[_guild.id] || (0, mongoose_1.model)(_guild.id, coreGuildSchema(_guild));
            if (_clearModels)
                clearModels(_model);
            return _model;
        }
        guild_1.coreGuildModel = coreGuildModel;
    })(guild = schemas.guild || (schemas.guild = {}));
    let main;
    (function (main) {
        function coreMainSchema() {
            const _schema = new mongoose_1.Schema({
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
        main.coreMainSchema = coreMainSchema;
        function coreMainModel(_clearModels) {
            const _model = mongoose_1.models.Main || (0, mongoose_1.model)("Main", coreMainSchema());
            if (_clearModels)
                clearModels(_model);
            return _model;
        }
        main.coreMainModel = coreMainModel;
    })(main = schemas.main || (schemas.main = {}));
})(schemas || (schemas = {}));
exports.schemas = schemas;
let clearModels = function (_model) {
    for (let model in mongoose_1.models)
        if (mongoose_1.models[model] == _model) {
            delete mongoose_1.models[model];
        }
    ;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUNBQWlGO0FBUWpGLE1BQU0sRUFBRTtJQUdKLFlBQVksS0FBMEI7UUFDbEMsSUFBSSxLQUFLLEVBQUU7WUFBRyxJQUFJLENBQUMsS0FBNEIsR0FBRyxLQUFLLENBQUM7U0FBRTtJQUM5RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFjO1FBQzlCLE9BQVEsSUFBSSxDQUFDLEtBQTRCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCO1FBQ2pCLElBQUksQ0FBQyxLQUE0QixDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUF5QixFQUFFLE9BQWdCO1FBQ3pELElBQUksT0FBTyxHQUFVLEVBQUUsQ0FBQztRQUV4QixJQUFJLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDckIsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7Z0JBQ3hCLElBQUksT0FBTyxFQUFFO29CQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTyxJQUFJLENBQUMsS0FBNEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3pGO2dCQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTyxJQUFJLENBQUMsS0FBNEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNoRjtTQUNKO1FBQ0QsSUFBSSxNQUFNLElBQUksU0FBUyxFQUFFO1lBQ3JCLElBQUksT0FBTyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTyxJQUFJLENB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