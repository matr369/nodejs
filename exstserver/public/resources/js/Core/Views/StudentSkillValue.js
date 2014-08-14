/**
 * Created by Administrator on 14.08.2014.
 */
define("Views/StudentSkillValue", ["Views/Fields/Dropdown"], function(Base){
     return Base.extend({
         events:$.extend({}, Base.prototype.events, {
             "field:changed": "addValue"
         }),
         addValue: function(e, value){
             this.model.attributes.value = value;
         }
     },{
         defaults: $.extend(true, {}, Base.defaults, {
             tpl: {
                 $: "field-dropdown"
             },
             toggleLabel: ".dropdown-label",
             additionalDisabledElements: ".dropdown-toggle",
             className:"btn-default btn-xs"
         })
     });
});