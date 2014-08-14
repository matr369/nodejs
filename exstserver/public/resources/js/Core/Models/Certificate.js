define("Models/Certificate",["Models/Base"], function(Model){
    return Model.extend({
        defaults:{
            name: ""
        },
        urlRoot: "/certificates"
    });
});