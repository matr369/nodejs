/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 03.08.14
 * Time: 17:03
 * To change this template use File | Settings | File Templates.
 */
define("Views/Fields/Textarea", ["Views/Fields/Base", "jquery"], function(Field, $){
    return Field.extend({
    }, {
        defaults: $.extend(true, {}, Field.defaults, {
            tpl: {
                $: "field-textarea"
            },
            dropVerificationStatusEvent: "change",
            rows: 5
        })
    })
});