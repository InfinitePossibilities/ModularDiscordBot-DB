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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUNBQWlGO0FBUWpGLE1BQU0sRUFBRTtJQUdKLFlBQVksS0FBMEI7UUFDbEMsSUFBSSxLQUFLLEVBQUU7WUFBRyxJQUFJLENBQUMsS0FBNEIsR0FBRyxLQUFLLENBQUM7U0FBRTtJQUM5RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFjO1FBQzlCLE9BQVEsSUFBSSxDQUFDLEtBQTRCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCO1FBQ2pCLElBQUksQ0FBQyxLQUE0QixDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUF5QixFQUFFLE9BQWdCO1FBQ3pELElBQUksT0FBTyxHQUFVLEVBQUUsQ0FBQztRQUV4QixJQUFJLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDckIsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7Z0JBQ3hCLElBQUksT0FBTyxFQUFFO29CQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTyxJQUFJLENBQUMsS0FBNEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3pGO2dCQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTyxJQUFJLENBQUMsS0FBNEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNoRjtTQUNKO1FBQ0QsSUFBSSxNQUFNLElBQUksU0FBUyxFQUFFO1lBQ3JCLElBQUksT0FBTyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTyxJQUFJLENBQUMsS0FBNEIsQ0FBQyxPQUFPLENBQUMsRUFBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdkY7U0FDSjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFhLEVBQUUsUUFBYTtRQUM3QyxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUN4QixNQUFPLElBQUksQ0FBQyxLQUE0QixDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0RjtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFhLEVBQUUsU0FBYztRQUM3QyxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUN4QixNQUFPLElBQUksQ0FBQyxLQUE0QixDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25IO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBYTtRQUM3QixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUN4QixNQUFPLElBQUksQ0FBQyxLQUE0QixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzNFO0lBQ0wsQ0FBQztDQUVKO0FBbEZHLGdCQUFFO0FBb0ZOLElBQVUsT0FBTyxDQThEaEI7QUE5REQsV0FBVSxPQUFPO0lBQ2IsSUFBaUIsUUFBUSxDQVd4QjtJQVhELFdBQWlCLFFBQVE7UUFDckIsU0FBZ0IsY0FBYyxDQUFDLFdBQW1CLEVBQUUsT0FBWTtZQUM1RCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksaUJBQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxpQkFBTSxDQUFDLEVBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO1lBQ2hJLE9BQU8sZUFBZSxDQUFDO1FBQzNCLENBQUM7UUFIZSx1QkFBYyxpQkFHN0IsQ0FBQTtRQUVELFNBQWdCLGFBQWEsQ0FBQyxXQUFtQixFQUFFLFlBQXNCLEVBQUUsT0FBWTtZQUNuRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUEsZ0JBQUssRUFBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFBLGdCQUFLLEVBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BJLElBQUksWUFBWTtnQkFBRSxLQUFLLElBQUksS0FBSyxJQUFJLGlCQUFNO29CQUFFLElBQUksaUJBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLEVBQUU7d0JBQUUsT0FBTyxpQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO3FCQUFFO1lBQUEsQ0FBQztZQUNsRyxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBSmUsc0JBQWEsZ0JBSTVCLENBQUE7SUFDTCxDQUFDLEVBWGdCLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBV3hCO0lBRUQsSUFBaUIsS0FBSyxDQXVCckI7SUF2QkQsV0FBaUIsT0FBSztRQUNsQixTQUFnQixlQUFlLENBQUMsS0FBWTtZQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFNLENBQXNCO2dCQUM1QyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBQzFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFDeEMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2dCQUN6QyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNqRCxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUMzQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUN2QyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUMzQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUV2QyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2FBQ3hDLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxlQUFlLEVBQUMsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFmZSx1QkFBZSxrQkFlOUIsQ0FBQTtRQUVELFNBQWdCLGNBQWMsQ0FBQyxNQUFhLEVBQUUsWUFBc0I7WUFDaEUsTUFBTSxNQUFNLEdBQUcsaUJBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksSUFBQSxnQkFBSyxFQUFzQixNQUFNLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25HLElBQUksWUFBWTtnQkFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUplLHNCQUFjLGlCQUk3QixDQUFBO0lBQ0wsQ0FBQyxFQXZCZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBdUJyQjtJQUVELElBQWlCLElBQUksQ0FzQnBCO0lBdEJELFdBQWlCLElBQUk7UUFDakIsU0FBZ0IsY0FBYztZQUMxQixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFNLENBQXFCO2dCQUMzQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBQzFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFDeEMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2dCQUN6QyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNqRCxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO2dCQUNyQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7YUFDcEQsRUFBRSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFFeEMsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQWRlLG1CQUFjLGlCQWM3QixDQUFBO1FBRUQsU0FBZ0IsYUFBYSxDQUFDLFlBQXNCO1lBQ2hELE1BQU0sTUFBTSxHQUFHLGlCQUFNLENBQUMsSUFBSSxJQUFJLElBQUEsZ0JBQUssRUFBcUIsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDbEYsSUFBSSxZQUFZO2dCQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBSmUsa0JBQWEsZ0JBSTVCLENBQUE7SUFDTCxDQUFDLEVBdEJnQixJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFzQnBCO0FBQ0wsQ0FBQyxFQTlEUyxPQUFPLEtBQVAsT0FBTyxRQThEaEI7QUFqSkcsMEJBQU87QUFtSlgsSUFBSSxXQUFXLEdBQUcsVUFBUyxNQUEwQjtJQUNqRCxLQUFLLElBQUksS0FBSyxJQUFJLGlCQUFNO1FBQUUsSUFBSSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sRUFBRTtZQUFFLE9BQU8saUJBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUFFO0lBQUEsQ0FBQztBQUNwRixDQUFDLENBQUEifQ==