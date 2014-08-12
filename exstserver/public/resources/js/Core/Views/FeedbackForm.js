/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 03.08.14
 * Time: 16:11
 * To change this template use File | Settings | File Templates.
 */
define(["Views/Form", "jquery", "bootstrap"], function(Form, $, booterbrod){
    return Form.extend({
        onSuccessSubmit: function(){
            this.disable();
            Form.prototype.onSuccessSubmit.apply(this, arguments);
        }
    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "feedbacks.html?v=1",
                $: "item"
            },
            cancelLabel: "Cancel",
            saveLabel: "Save",
            editLabel: "Edit",
            disable: true
        })
    })
});