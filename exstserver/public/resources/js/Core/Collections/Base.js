/**
 * Created by dmantsevich on 7/18/2014.
 */
define(["Backbone", "Models/Base", "jquery"], function(Backbone, Model, $){
    return Backbone.Collection.extend({
        model: Model,
        at: function(position){
            return Backbone.Collection.prototype.at.call(this, position || 0);
        },
        fetch: function(options){
            if(!this.__fetchResult || (options && options.reset === true)){
                this.__fetchResult = Backbone.Collection.prototype.fetch.apply(this, arguments);
            }
            return this.__fetchResult;
        },
        toJSON: function(options){
            var json = this.map(function(model){
                return model.id;
            });
            return json;
        }
    });
});