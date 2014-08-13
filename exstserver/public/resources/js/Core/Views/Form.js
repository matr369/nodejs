/**
 * Created by dmantsevich on 7/25/2014.
 */
define("Views/Form",["Views/Base", "Views/Fields/Base", "jquery", "underscore", "Core/Request"], function(View, Field, $, _, Request){

    return View.extend({
        events: {
            "submit": "__resolveSubmit",
            "{submitEvent} {submitButton}": "submit",
            "{enableEvent} {enableButton}": "enable",
            "{cancelEvent} {cancelButton}": "cancel",
            "{resetEvent} {resetButton}": "reset"
        },

        /**
         * Override from base - View is ready
         * @private
         */
        __ready: function(){
            this.__initFields();
            this.$el.trigger("view:ready");
            (this.options.disable) && (this.disable());
        },

        /**
         * Finding and Preparing fields before using
         * @returns {*}
         * @private
         */
        __initFields: function(){
            this.fields = _.filter(this.childrenViews || [], function(view){
                return !!((view instanceof Field) && view.options.name);
            }) || [];
            return this;
        },

        /**
         * Stop default submit for <form>
         * @param e
         * @private
         */
        __resolveSubmit: function(e){
            e.preventDefault();
            this.submit();
            return false;
        },

        /**
         * Serialize all fields
         * @returns {{}}
         */
        serialize: function(){
            var result = {};
            _.each(this.fields || [], function(field){
                _.extend(result, field.serialize());
            });
            return result;
        },

        /**
         * Verify all fields
         * @returns {*|boolean}
         */
        verify: function(){
            this.dropLastVerificationResult();
            return _.all(this.fields || [], function(field){

                return field.verify();
            });
        },

        /**
         * Helper for sending data
         * @param data
         * @returns {*}
         * @private
         */
        __sendData: function(data){
            var self = this,
                def = $.Deferred();
            if (this.model) {
                var modelSave = this.model.save(data);
                if (modelSave === false) {
                    def.reject(this.model.validationError, data, this.model);
                } else {
                    modelSave.done(def.resolve).fail(function(message){
                        def.reject(message, data, self.model);
                    });
                }
                return def;
            } else if(this.collection){
                this.collection.create(data,{
                    success: def.resolve,
                    error: function(model, message){
                        def.reject(message, data, model);
                    },
                    wait: true
                });
                return def;
            } else {
                return (new Request({
                    url: this.options.url || this.$el.attr("action"),
                    type: this.$el.attr("method") || "POST",
                    dataType: "json"
                })).submit(data);
            }
        },

        onBeforeSubmit: function(){
            this.$el.trigger("loading:stop")
                    .trigger("loading:start");
        },

        /**
         *   Run when __sendData is done
         */
        onSuccessSubmit: function(data){
            this.__updateFieldsDefaultValue();
            this.$el.trigger("form:submit:success", data);
        },

        /**
         * Run when __sendData is fail
         */
        onFailSubmit: function(message, data){
            App.Error(this.options.failSubmitMessage+" : "+message);
            this.$el.trigger("form:submit:fail");
        },

        /**
         * Run after submit
         */
        onCompleteSubmit: function(){
            this.$el.trigger("loading:stop");
        },

        /**
         * Submit data to the server
         */
        submit: function(e){
            if (e && e.preventDefault && e.type.indexOf('key') != 0) {e.preventDefault();}
            if (!this.__disabled) {
                var self = this;
                if (this.verify() === true) {
                    this.onBeforeSubmit();
                    this.__sendData(this.serialize())
                        .always(self.onCompleteSubmit.bind(self))
                        .done(self.onSuccessSubmit.bind(self))
                        .fail(self.onFailSubmit.bind(self));
                } else {
                    this.onVerificationError();
                }
            }
        },

        /**
         * Run when verification is incorrect
         * @param verificationResult
         */
        onVerificationError: function(verificationResult){
            this.$el.trigger("form:error");
        },

        /**
         * Reset form
         */
        reset: function(e){
           // e.preventDefault();
            _.each(this.fields || [], function(field){
                field.reset();
            });
        },

        /**
         * Get field by name
         * @param name
         * @returns {*}
         */
        getFieldByName: function(name){
            if (this.fields){
                return _.find(this.fields, function(field){
                    return !!(field.options.name === name);
                }) || null;
            }
            return null;
        },

        /**
         * Disable form fields
         */
        disable: function(e){
            if (e && e.preventDefault) {e.preventDefault();}
            _.each(this.fields || [], function(field){
                field.disable();
            });
            this.__disabled = true;
            this.$el.addClass(this.options.disabledClass);
        },

        /**
         * Enable form fields
         */
        enable: function(e){
            if (e && e.preventDefault) {e.preventDefault();}
            _.each(this.fields || [], function(field){
                field.enable();
            });
            this.__disabled = false;
            this.$el.removeClass(this.options.disabledClass);
        },

        /**
         * Reset and disable form
         * @param e
         */
        cancel: function(e){
            if (e && e.preventDefault) {e.preventDefault();}
            this.reset();
            this.disable();
        },

        /**
         * Set as default last submit data
         */
        __updateFieldsDefaultValue: function(){
            _.each(this.fields || [], function(field){
                field.options.value = field.getValue();
            });
        },

        dropLastVerificationResult: function(){
            _.each(this.fields || [], function(field){
                field.dropLastVerificationResult();
            });
        }

    }, {
        defaults: $.extend(true, {}, View.defaults, {
            "url": "",
            "failSubmitMessage": "Can not save data",
            "disable": false,
            "disabledClass": "form-disabled",
            "enableEvent": "click",
            "enableButton": ".enable-form",
            "cancelEvent": "click",
            "cancelButton": ".cancel-submit",
            "resetButton": ".reset-button",
            "resetEvent": "click",
            "submitButton": ".submit-button",
            "submitEvent": "click"
        })
    });
});