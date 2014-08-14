define("Views/NewSkillForm",["Views/Form", "App", "Collections/Skills", "Models/Skill"], function(Form, App, Skills, Skill){
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


        constructor: function(options){
            options.collection = options.collection || new Skills();
            Form.prototype.constructor.apply(this, [options]);
        },

        onSuccessSubmit: function(skill){
            this.reset();
        }


    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "form.newskill.html?v=1"
            },
            prepareCollection: false,
            formTitle :"New Skill",
            formDescription: "Name of the skill"
        })
    });
});