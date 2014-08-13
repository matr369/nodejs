define("Views/StudentPanelTable",[ "Views/Form", "App", "jquery", "Views/Base", "underscore", "Core/PropertyList"], function (Form, App, $, Base, _, PropertyList) {


    return Form.extend({

        prepareProperties: function () {
            var self = this,
                defaultPropertyConstructor = this.options.defaultPropertyConstructor;
            this.options.properties = _.map(this.options.properties, function (property) {
                var propConfig = $.extend(true, {}, {
                    construct: defaultPropertyConstructor,
                    id: property,
                    options: {
                        name: property,
                        value: self.model.get(property),
                        userCanChange: true
                    }
                }, PropertyList[property]);
                propConfig.options = JSON.stringify(propConfig.options);
                return propConfig;
            });

        },

        __sendData: function (data) {

            this.model.set(data);
            this.model.save();
            return $.Deferred().resolve(data);
        },


        onSuccessSubmit: function (data) {

            this.disable();
            this.__updateFieldsDefaultValue();
            this.$el.trigger("form:submit:success", data);

        },


        enable: function (e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            _.each(this.fields || [], function (field) {
                field.options.userCanChange && field.enable();
            });
            this.__disabled = false;
            this.$el.removeClass(this.options.disabledClass);
        },


        render: function (options) {
            this.prepareProperties();
            return Base.prototype.render.apply(this, arguments);
        }

    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "paneltable.html?v=1"
            },
            disable: true,
            defaultPropertyConstructor: "Views/Fields/Base",
            formTitle: "panel table",

            properties: []

        })
    });
});