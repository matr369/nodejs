define("Views/Fields/Radio", ["Views/Fields/Base", "jquery", "underscore"], function(View, $, _){
    return View.extend({
        events:{
            "change {items}":"edited"
        },



        edited:function(){
            this.$el.trigger("field:changed");
        },


        setValue: function(value){
            this.$(".radio-button").removeAttr("checked");

            var i=0;
            if (value!="") {
                _.each(this.options.buttons || [], function (button) {
                    if (value == button.label) {
                       this.$(".radio-button")[i].checked = true;
                    }
                    i++;
                });
            };

        },

        getValue: function(){
            return this.$(":checked").val();
        }



    },{
        defaults: $.extend(true, {}, View.defaults, {
            buttons:[],
            value: "",
            items: ".radio-button",
            name:"",
            tpl: {
                src: "fields.html?v=1",
                $: "field-radio"
            }
        })
    });
});