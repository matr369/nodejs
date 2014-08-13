/**
 * Created by Administrator on 06.08.2014.
 */
define("Views/AddManagerForm",["Views/Form", "App", "jquery", "Collections/Managers", "Models/Manager"], function(Form, App, $, Managers, Manager){
    return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "view:parent:hide": "reset"
        }),

        constructor: function(options){
            options.collection = new Managers();
            Form.prototype.constructor.apply(this,[options]);
        }

    }, {


        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.addmanager.html?v=2"
            },
            submitButton: ".button-create",
            submitButtonText: "Create",
            nameText: "Manager's name",
            emailText: "Manager's email",
            emailPlaceholder: "matr369@exadel.com",
            namePlaceholder: "Evgene Ivashkevich"
        })
    });
});