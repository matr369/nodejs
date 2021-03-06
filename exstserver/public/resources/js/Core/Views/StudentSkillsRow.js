/**
 * Created by Administrator on 07.08.2014.
 */
define("Views/StudentSkillsRow",["Views/Form","underscore", "Models/StudentSkill", "Collections/StudentSkills"], function(Form, _, Skill, StudentSkills){
    return Form.extend({
        events: {
            "field:changed": "addValue"
        },
        constructor: function(options){
            options = options || {};
            this.rows = [];
            this.collection = options.collection;
            if(!_.isArray(this.collection)) this.listenTo(this.collection,"add", this.showSkillRow);
            Form.prototype.constructor.apply(this, arguments);
            this.showAllSkillRow();
        },
        addValue: function(e, skill){
            if( !_.isString(skill)) {
                this.options.tempSkills.add(new Skill(skill.attributes));
                this.collection.add(skill.attributes);
            }
        },

        showAllSkillRow: function(){
            this.collection.forEach(this.showSkillRow, this);
        },

        showSkillRow: function(model){
            var self = this;
            var row = new Form({
                tpl: {
                    src: "studentskillrow.html?v=1",
                    $: "studentSkill"
                },
                container: this.$el,
                containerResolveMethod: "append",
                model: model,
                prepareModel: false,
                disabled : true,
                temp: this.options.tempSkills
            });
            this.registerChildView(model, row);
            row.render();
            this.rows.push(row);
        }
    },{
        default: $.extend(true, {}, Form.default, {
            tpl:{
                src: null
            },
            disabled: true,
            tempSkills: null
        })
    })
});