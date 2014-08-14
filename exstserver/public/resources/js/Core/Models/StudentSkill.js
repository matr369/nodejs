/**
 * Created by Administrator on 14.08.2014.
 */
define("Models/StudentSkill",["Models/Base", "underscore"], function(Model, _){
    return Model.extend({
        defaults:{
            technology_name: "",
            value: ""
        },
        fetch: function(){
            return $.Deferred().resolve([]);
        }
    });
});