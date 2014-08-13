/**
 * Created by Administrator on 07.08.2014.
 */
define(["Views/Form","underscore"], function(Form, _){
    return Form.extend({
        constructor: function(options){
            options = options || {};
            this.rows = [];
            this.collection = options.collection;
            this.listenTo(this.collection,"add", this.showSkillRow);
            Form.prototype.constructor.apply(this, arguments);
            this.showAllSkillRow();
        },

        showAllSkillRow: function(){
            this.collection.forEach(this.showSkillRow, this);
        },

        showSkillRow: function(model){
            var row = new Form({
                tpl: {
                    src: "studentskillrow.html?v=1",
                    $: "studentSkill"
                },
                container: this.$el,
                containerResolveMethod: "append",
                model: model
            });
            row.show();
            this.rows.push(row);
        }
    },{
        default: $.extend(true, {}, Form.default, {
            tpl:{
                src: null
            }
        })
    })
});