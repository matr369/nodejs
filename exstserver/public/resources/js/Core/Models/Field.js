define("Models/Field",["Models/Base", "underscore"], function(Model, _){

    return Model.extend({
        defaults:{
            name:"",
            fieldType:"",
            change: false
        },
        urlRoot: "/custom-fields"
    });
});