define("Views/Pages/SettingsFields", ["Views/Page", "Views/Form"], function(Page){
    return Page.extend({},{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/settings.fields.html?v=1"
            },

            title: "Settings Field",
            allfields:[
                {
                    name: 'Name',
                    type:'Text',
                    default:'Ivan'
                },

                {
                    name:'Billable',
                    type:'Checkbox',
                    default:'no'
                }


            ]
        })
    });
});