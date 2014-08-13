define("Models/Skill",["Models/Base", "underscore"], function(Model, _){
    return Model.extend({
        defaults:{
            technology_name: "",
            value: ''
        },
        urlRoot: "/technology"
    });
});