define(["Views/Form", "jquery", "Collections/Students"], function (Form, $, Students) {
    return Form.extend({



    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "studentsfromtable.html?v=1"
            },
            students: new Students(),
            fields: []
        })
    })
});