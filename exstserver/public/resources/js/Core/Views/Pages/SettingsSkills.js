define(["Views/Page"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/settings.skills.html?v=1"
            },

            title: "Settings Skill"
        })
    });
});