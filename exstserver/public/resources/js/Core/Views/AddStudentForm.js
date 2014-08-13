
define("Views/AddStudentForm",["Views/Form", "App", "jquery", "Collections/Students", "Models/Student"], function (Form, App, $, Students, Student) {
   return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "view:parent:hide": "reset"
        }),
        constructor: function (options) {
            options.collection = new Students();
            Form.prototype.constructor.apply(this, [options]);
        }
    }, {


        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.addstudent.html?v=1"
            },
            submitButtonText: "Create",
            nameText: "Student's name",
            emailText: "Student's email",
            emailPlaceholder: "student@exadel.com",
            prepareCollection: false,
            namePlaceholder: "Ivan Ivanov"
        })
    });
});