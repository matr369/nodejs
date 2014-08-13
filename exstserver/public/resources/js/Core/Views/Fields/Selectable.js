/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 03.08.14
 * Time: 23:20
 * To change this template use File | Settings | File Templates.
 */
define("Views/Fields/Selectable", ["Views/Fields/Base", "jquery", "underscore"], function(Field, $, _){
    return Field.extend({

        events: $.extend(true, {}, Field.prototype.events, {
            "{selectEvent} {itemSelector}": "select",
            "view:remove": "__deleteDataFromItems"
        }),

        __ready: function(){
            this.$items = this.$(this.options.itemSelector);
            Field.prototype.__ready.apply(this, arguments);
            this.__storeValueAsData();
            this.setValue(this.options.value);
        },

        __deleteDataFromItems: function(){
            this.$items.each(function(){
                $(this).data("__value", null);
            });
        },

        select: function(e){
            e.preventDefault();
            this.setValue($(e.currentTarget).data("__value"));
        },

        __storeValueAsData: function(){
            var self = this;
            this.$items.each(function(){
                var item = $(this);
                item.data("__value", self.options.items[item.attr("data-index")].value)
                    .removeAttr("data-index");
            });
        },

        __findItemByValue: function(value){
            return _.find(this.options.items, function(item){
                return value == item.value;
            });
        },

        setValue: function(value){
            var self = this;
            if (!this.__disabled && this.getValue() != value) {
                this.$items
                    .removeClass(this.options.selectedClass)
                    .each(function(){
                    var $this = $(this);
                    if ($this.data("__value") == value) {
                        $this.addClass(self.options.selectedClass);
                        self.__value = value;
                        self.$el.trigger("field:changed", value);
                        return false;
                    }
                });
            }
        },

        disable: function(){
            this.__disabled = true;
            this.dropLastVerificationResult();
            this.$el.addClass(this.options.disableClass);
            this.$items.addClass("disabled");
            this.$(this.options.additionalDisabledElements).addClass(this.options.disabledClass);
        },

        enable: function(){
            this.__disabled = false;
            this.dropLastVerificationResult();
            this.$el.removeClass(this.options.disableClass);
            this.$items.removeClass(this.options.disabledClass);
            this.$(this.options.additionalDisabledElements).removeClass(this.options.disabledClass);
        },

        getValue: function(){
            return this.__value;
        }
    },{
        defaults: $.extend(true, {}, Field.defaults, {
            tpl: {
                $: "field-selectable"
            },
            tooltipEvent: "",
            tooltipPlacement: "right",
            additionalDisabledElements: "",
            dropVerificationStatusEvent: "field:changed",
            selectedClass: "btn-primary active",
            disabledClass: "disabled",
            selectEvent: "click",
            itemSelector: ".selectable-item",
            items: []
        })
    })
});