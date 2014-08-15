/**
 * Created by Administrator on 07.08.2014.
 */
define("Views/InterviewForm",["Views/Form", "jquery", "bootstrap","Collections/StudentSkills", "Models/StudentSkill", "underscore"], function(Form, $, butblrka,StudentSkills, Skill, _){
    return Form.extend({
        onSuccessSubmit: function(){
            this.disable();
            Form.prototype.onSuccessSubmit.apply(this, arguments);
        },
        serialize: function(){
            var result,
                data,
                studSkills = new StudentSkills();
            result = Form.prototype.serialize.apply(this, arguments);
            data = this.model.attributes.studentSkills.models;
            for(var i = 0; i< this.model.attributes.studentSkills.models.length; i++){
                var j = data[i].attributes;
                var x = new Skill(j);
                studSkills.push(x);
            }
            result.studentSkills = studSkills;
            return result;
        }

    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "interviews.html?v=1",
                $: "itemInterview"
            },
            cancelLabel: "Cancel",
            saveLabel: "Save",
            editLabel: "Edit",
            disable: true
        })
    })
});