define("Views/Pages/Students", ["Views/Page", "jquery"], function(Page, $){

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