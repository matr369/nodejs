var Collection = require("backbone").Collection,
    Model = require("../Models/Base"),
    $ = require("Deferred"),
    ObjectID = require("mongodb").ObjectID,
    Connector = require("../Connector"),
    Base = Collection.extend({
        constructor: function(models, options){
            if (models) {
                models = models.map(function(model){
                    if (typeof model === 'string') {
                        return {"_id": model};
                    } else {
                        return model;
                    }
                });
            }
            Collection.prototype.constructor.call(this, models, options);
        },
        isCollection: true,
        model: Model,
        find: function(filter){
            var xhr = $(),
                self = this;
            filter = filter || {};
            var exports = {};
            for (var key in filter){
                exports[key] = true;
                if (typeof filter[key] === "string") {
                    filter[key] = new RegExp(filter[key], 'i');
                }
            }
            this.where(filter, {
                exports: exports
            }).done(function(result){
                var modelFetching = [];
                self.set(result || [], {reset: true});
                self.forEach(function(model){
                    modelFetching.push(model.afterFetch());
                });
                try {
                    $.when.apply($, modelFetching).done(function(){
                        self.afterFetch().done(function(){
                            xhr.resolve(self.exportToJSON());
                        }).fail(xhr.reject);
                    }).fail(xhr.reject);
                } catch (e) {
                    xhr.reject(e);
                }
            }).fail(xhr.reject);
            return xhr;
        },
        where: function (filter, options) {
            options = options || {};
            options.filter = filter;
            return this.sync("find", this, options);
        },
        beforeFetch: function () {
        },
        afterFetch: function (data) {
            return $().resolve(data);
        },
        fetch: function(){
            var self = this,
                xhr = $(),
                result;
            this.beforeFetch();
            if (this.length) {
                result = this.where({
                    _id: { $in: self.getModelsId() }
                });
            } else {
                result = Collection.prototype.fetch.apply(this, arguments);
            }
            result.done(function(result){
                var modelFetching = [];
                self.set(result || [], {reset: true});
                self.forEach(function(model){
                    modelFetching.push(model.afterFetch());
                });
                try {
                    $.when.apply($, modelFetching).done(function(){
                        self.afterFetch().done(function(){
                            xhr.resolve(self.exportToJSON());
                        }).fail(xhr.reject);
                    }).fail(xhr.reject);
                } catch (e) {
                    xhr.reject(e);
                }

            }).fail(xhr.reject);
            return xhr;
        },
        getModelsId: function(){
            return this.map(function(model){
                return ObjectID(model.id);
            }) || [];
        },
        exportToJSON: function(){
            return this.map(function(model){
                return model.exportToJSON();
            }) || [];
        }
    }, {});
module.exports = Base;


