define("Models/Skill",["Models/Base", "underscore"], function(Model, _){
    return Model.extend({
        defaults:{
            technology_name: ""
        },
        urlRoot: "/technology",
        toJSON: function(){
                return _.clone(this.attributes);
        }
    });
});