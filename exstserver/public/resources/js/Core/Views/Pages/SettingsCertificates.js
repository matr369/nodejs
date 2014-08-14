define("Views/Pages/SettingsCertificates", ["Views/Page", "jquery", "Collections/Certificates"], function(Page, $, Collection){
    return Page.extend({
        constructor: function(options){
            options.collection = new Collection();
            Page.prototype.constructor.apply(this,arguments);
        }
    },{
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/settings.certificates.html?v=1"
            },
            title: "Certificates"
        })
    });
});