var Model = require("backbone").Model,
    Connector = require("../Connector"),
    $ = require("Deferred"),
    Base = Model.extend({
        exportAttrs: null,
        isModel: true,
        idAttribute: "_id",
        beforeSave: function(){

        },
        afterSave: function(){

        },
        save: function(data){
            var xhr = $(),
                self = this;
            this.beforeSave(data);
            var saveResult = Model.prototype.save.apply(this, arguments);
            if (saveResult) {
                saveResult.done(function(data){
                        this.afterSave(data);
                        this.afterFetch().done(function(){
                            xhr.resolve(self.exportToJSON());
                        }).fail(xhr.reject);
                    }.bind(this))
                    .fail(xhr.reject);
            } else {
                xhr.reject(this.validationError);
            }
            return xhr;
        },
        exportToJSON: function(){
            var json = {};
            for(var attr in this.attributes) {
                if (this.attributes[attr] && this.attributes[attr].exportToJSON) {
                    json[attr] = this.attributes[attr].exportToJSON();
                } else {
                    json[attr] = this.attributes[attr];
                }
            }
            return json;
        },
        afterFetch: function(){
            return $().resolve();
        },
        fetch: function(){
            var self = this,
                xhr = $();
            this.beforeFetch();
            Model.prototype.fetch.apply(this, arguments).done(function(attrs){
                this.set(attrs);
                self.afterFetch().done(function(){
                    xhr.resolve(self.exportToJSON());
                }).fail(xhr.reject);
            }).fail(xhr.reject);
            return xhr;
        }
    },{});

module.exports = Base;