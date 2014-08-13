define("Views/NewFieldForm",["Views/Form", "App", "jquery", "Collections/Fields", "Models/Field"], function (Form, App, $, Fields, Field) {
    return Form.extend({
        events:{
            "keyup": "submitWithKey",
            "click .submit-button": "submit"
        },

        submitWithKey: function(e){
            if (e && e.keyCode==13) {
                this.submit();
            }
        },

        constructor: function (options) {
            options.collection = new Fields();
            Form.prototype.constructor.apply(this, [options]);
        },


        verify: function(){
            this.dropLastVerificationResult();
            return _.all(this.fields || [], function(field){
                if (field.$el.is(':visible'))
                {
                    return field.verify();
                }
                else {
                    return true;
                }
            });
        },



        serialize: function () {
            var result = {};
            result.options = {};
            _.each(this.fields || [], function (field) {
                if (field.$el.is(':visible')) {
                    var serializeResult = field.serialize();
                    if (field.options.isOption ) {
                        if (field.options.name == "items") {
                            serializeResult = {
                                items: (function(val){
                                    var result = [];
                                    val.split(";").forEach(function(item){
                                        if (item) {
                                            var i = item.split("=");
                                            result.push({
                                                value: i[0].trim(),
                                                label: i[1].trim()
                                            });
                                        }
                                    });
                                    return result;
                                })(field.getValue())
                            };
                        }
                        _.extend(result.options, serializeResult);
                    } else {
                        _.extend(result, serializeResult);
                    }
                }
            });
            return result;
        },

        __ready: function () {
            Form.prototype.__ready.apply(this, arguments);
            this.hideAllTypesForm();
            this.getFieldByName("fieldType").$el.on("field:changed", this.showTypeForm.bind(this));
        },

        showTypeForm: function () {
            var value = this.getFieldByName("fieldType").getValue();
            this.hideAllTypesForm();
            this.$("." + value + "-form").show();

        },

        hideAllTypesForm: function () {
            this.$(".type-form").hide();
        },


        onSuccessSubmit: function (field) {
            App.notify("Field was created", "success");
            this.hideAllTypesForm();
            if (this.collection.where({name: field.name}).length == 0)
                this.collection.add(field);
            this.reset();
        }



    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.newfield.html?v=1"
            },
            formTitle: "new field"


        })
    });
});