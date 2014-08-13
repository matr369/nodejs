define("Views/StudentsFromTable",["Views/Form", "jquery", "Collections/Students"], function (Form, $, Students) {
    return Form.extend({
        constructor: function(options){
            debugger;
            options.collection = new Students();
            Form.prototype.constructor.apply(this,[options]);
        }



    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "studentsfromtable.html?v=1"
            },
            fields: []
        })
    })
});