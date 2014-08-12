/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 03.08.14
 * Time: 1:48
 * To change this template use File | Settings | File Templates.
 */
define(["Views/Base", "jquery"], function(Base, $){
    return Base.extend({
        events: {
            "click .disable-student": "disableStudent",
            "click .enable-student": "enableStudent",
            "view:ready": "initSubEvents"
        },

        initSubEvents: function(){
            this.listenTo(this.model, "change", this.rerender);
        },

        disableStudent: function(){
            this.model.disable();
            this.rerender();
        },

        enableStudent: function(){
            this.model.enable();
            this.rerender();
        }
    }, {
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: {
                src: 'student.commoninfo.html?v=1'
            }
        })
    });
});