define("Views/Pages/Managers", ["Views/Page", "jquery"], function(Page, $){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/managers.html?v=1"
            },

            title: "Managers",
            textAddManager: "Add Manager"
        })
    });
});