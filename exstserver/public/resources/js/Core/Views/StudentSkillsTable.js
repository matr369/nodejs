/**
 * Created by Administrator on 07.08.2014.
 */
define("Views/StudentSkillsTable",["Views/Form","Views/StudentSkillsRow","underscore", "Collections/StudentSkills", "Collections/Skills", "Models/Skill"], function(Form, Row, _, StudentSkills, Skills, Skill){
    return Form.extend({
        events: {
            "view:ready": "initSubViews",
            "field:changed": "addSkillToStudent"
        },
        constructor: function(options){

            options.allSkill = new Skills();
            return Form.prototype.constructor.apply(this, arguments);
        },
        initSubViews: function(){
            if(_.isUndefined(this.collection)){
                this.collection = new StudentSkills();
            }
            this.registerChildView("listSkills", new Row({
                el: this.$(".skillsTable"),
                collection: this.collection
            }));
        },
        addSkillToStudent: function(e, skill){
            if(skill instanceof Skill) {
                this.collection.add(skill);
                this.childrenViews.newSkill.__value = "";
                this.childrenViews.newSkill.$el[0].value = "";
            }
        }
    },{
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "studentsskilltable.html?v=1",
                $ : "skillTable"
            },
            allSkill:null,
            value: ""
       })
    })
});