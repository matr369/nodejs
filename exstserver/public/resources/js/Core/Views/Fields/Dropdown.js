/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 04.08.14
 * Time: 0:44
 * To change this template use File | Settings | File Templates.
 */
define(["Views/Fields/Selectable", "jquery"], function(Field, $){
    return Field.extend({
        events: $.extend({}, Field.prototype.events, {
            "field:changed": "changeLabel",
            "click {additionalDisabledElements}": "stopShowItems"
        }),

        stopShowItems: function(e){
            if (this.__disabled){
                e.preventDefault();
                e.stopPropagation();
                return false
            }
        },
        changeLabel: function(event){
            var item = this.__findItemByValue(this.getValue());
            this.$(this.options.toggleLabel).text(item.label);
            if (this.options.dropVerificationStatusEvent == event.type) {
                this.dropLastVerificationResult();
            }
        }
    },{
        defaults: $.extend(true, {}, Field.defaults, {
            tpl: {
                $: "field-dropdown"
            },
            toggleLabel: ".dropdown-label",
            additionalDisabledElements: ".dropdown-toggle",
            className:"btn-default btn-xs"

        })
    });
});