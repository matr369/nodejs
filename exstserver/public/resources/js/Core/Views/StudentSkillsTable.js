/**
 * Created by Administrator on 07.08.2014.
 */
define(["Views/Base","Views/StudentSkillsRow","underscore", "Collections/StudentSkills", "Collections/Skills"], function(Base, Row, _, StudentSkills, Skills){
    return Base.extend({
        events: {
            "view:ready": "initSubViews",
            "field:changed": "addSkillToStudent"
        },
        constructor: function(options){
            options.allSkill = new Skills();
            return Base.prototype.constructor.apply(this, arguments);
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
            this.collection.add(skill);
            this.childrenViews.newSkill.el.value = "";
        }
    },{
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: {
                src: "studentsskilltable.html?v=1",
                $ : "skillTable"
            },
            allSkill:null
        })
    })
});