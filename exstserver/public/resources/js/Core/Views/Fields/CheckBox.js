define("Views/Fields/CheckBox", ["Views/Fields/Base", "jquery", "underscore"], function(View, $, _){
    return View.extend({

        getValue: function(){
            return this.$el.is(':checked')? this.options.yes : this.options.no;
        },

        setValue: function(value) {
            if (value === this.options.yes || value === true) {
                this.$el.attr("checked", "checked");
            } else {
                this.$el.removeAttr("checked");
            }
        }

    },{
        defaults: $.extend(true, {}, View.defaults, {
            yes: true,
            no: false,
            name:"",
            tpl: {
                src: "fields.html?v=1",
                $: "field-check"
            }
        })
    });
});