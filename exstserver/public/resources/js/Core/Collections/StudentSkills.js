/**
 * Created by Administrator on 07.08.2014.
 */
define("Collections/StudentSkills", ["Collections/Base", "Models/StudentSkill"], function(Base, Skill){
    return Base.extend({
        model: Skill,
        fetch: function(){
            return $.Deferred().resolve([]);
        },
        toJSON: function(){
            var json = {};
            for(var i =0 ;i < this.models.length; i++){
                json[i] = this.models[i].toJSON();
            }
            return json;
        }
    });
});