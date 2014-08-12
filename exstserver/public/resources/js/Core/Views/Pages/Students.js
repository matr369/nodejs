define(["Views/Page", "Models/StudentInstance", "jquery"], function(Page, Student, $){

    return Page.extend({}, {
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/students.html?v=1"
            },
            student: null,
            title: "Students"
        })
    });
});