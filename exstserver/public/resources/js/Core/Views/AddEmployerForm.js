/**
 * Created by Administrator on 28.07.2014.
 */
define("Views/AddEmployerForm",["Views/Form", "App", "jquery", "Collections/Employers", "Models/Employer"], function(Form, App, $, Employers, Employer){
    return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "view:parent:hide": "reset"
        }),
        
        constructor: function(options){
            options.collection = new Employers();
            Form.prototype.constructor.apply(this,[options]);
        }

    }, {


        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.addemployer.html?v=2"
            },
            submitButton: ".button-create",
            submitButtonText: "Create",
            nameText: "Employer's name",
            emailText: "Employer's email",
            emailPlaceholder: "Example: ivanov@exadel.con",
            namePlaceholder: "Example: Ivan Ivanov"
        })
    });
});