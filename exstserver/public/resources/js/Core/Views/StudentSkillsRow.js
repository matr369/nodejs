/**
 * Created by Administrator on 07.08.2014.
 */
define(["Views/Base","underscore"], function(Base, _){
    return Base.extend({
        constructor: function(options){
            options = options || {};
            this.rows = [];
            this.collection = options.collection;
            this.listenTo(this.collection,"add", this.showSkillRow);
            Base.prototype.constructor.apply(this, arguments);
            this.showAllSkillRow();
        },

        showAllSkillRow: function(){
            this.collection.forEach(this.showSkillRow, this);
        },

        showSkillRow: function(model){
            var row = new Base({
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
        default: $.extend(true, {}, Base.default, {
            tpl:{
                src: null
            }
        })
    })
});