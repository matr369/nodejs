/**
 * Created by Administrator on 14.08.2014.
 */
define("Views/StudentSkillValue", ["Views/Fields/Dropdown"], function(Base){
     return Base.extend({
         events:$.extend({}, Base.prototype.events, {
             "field:changed": "addValue",
             "field:changed": "changeLabel",
             "click {additionalDisabledElements}": "stopShowItems"
         }),
         addValue: function(e, value){
             this.model.attributes.value = value;
         },

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
         defaults: $.extend(true, {}, Base.defaults, {
             tpl: {
                 $: "field-dropdown"
             },
             toggleLabel: ".dropdown-label",
             additionalDisabledElements: ".dropdown-toggle",
             className:"btn-default btn-xs",
             temp: null
         })
     });
});