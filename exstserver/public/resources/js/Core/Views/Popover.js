/**
 * Created by Administrator on 31.07.2014.
 */
define(["Views/Base", "jquery", "bootstrap"], function(View, $, bootstrap){
    return View.extend({
        events: {
            "view:ready": "__initPopover",
            "shown.bs.popover": "showPopover"
        },

        __initPopover: function(){
            this.$(".popover-btn").popover({
                content: this.$(".popover-content"),
                html: true
            });
        },
        /*
        show popover with content where was sent in option contentPopover
         */
        showPopover: function(){
            var self = this,
                content;
            require([self.options.contentPopover], function(contentPopover){
                content = new contentPopover(self.options.optionsPopover);
                content.options.container = self.$(".popover-content");
                content.options.containerResolveMethod = "html";
                self.registerChildView("content", content);
                content.show();
            });
        }

    }, {
        defaults: $.extend(true, {}, View.defaults, {
            tpl: {
                src: "popover.html?v=1"
            },
            title: "Enter name student",
            buttonIcon: "fa fa-plus-square fa-2x",
            buttonSize: "btn btn-sm",
            buttonStile: "btn-primary",
            buttonClass: "popover-btn",
            buttonPlusIcon: "fa fa-plus fa-1",
            buttonText: "+",
            pullRight:"pull-right",
            contentPopover: "Views/Base",
            optionsPopover: {}
        })
    });
});