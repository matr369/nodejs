/**
 * Created by Administrator on 07.08.2014.
 */
define("Views/InterviewForm",["Views/Form", "jquery", "bootstrap"], function(Form, $, butblrka){
    return Form.extend({
        onSuccessSubmit: function(){
            this.disable();
            Form.prototype.onSuccessSubmit.apply(this, arguments);
        }
    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "interviews.html?v=1",
                $: "itemInterview"
            },
            cancelLabel: "Cancel",
            saveLabel: "Save",
            editLabel: "Edit",
            disable: true
        })
    })
});