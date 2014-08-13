/**
 * Created by Mantsevich on 17.07.2014.
 */
define("Models/Base",["Backbone", "jquery"], function(Backbone, $){
    return Backbone.Model.extend({
        idAttribute: "_id",
        /**
         * Fetch data from server
         * @returns {*}
         */
        fetch: function(){
            //TODO: Realize
            return $.Deferred().resolve();
        },
        toJSON: function(options){
            var json = {};
           for(var attr in this.attributes){
               if(this.attributes[attr] && this.attributes[attr].toJSON){
                   json[attr] = this.attributes[attr].toJSON();
               } else{
                   json[attr] = this.attributes[attr];
               }
           }
            return json;
        }
    });
});