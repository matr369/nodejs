define("Models/Field",["Models/Base", "underscore"], function(Model, _){

    return Model.extend({
        defaults:{
            name:"",
            id:1,
            fieldType:"",
            defaultValue:""
        }






    });
});