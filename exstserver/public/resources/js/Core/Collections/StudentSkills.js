/**
 * Created by Administrator on 07.08.2014.
 */
define("Collections/StudentSkills", ["Collections/Base", "Models/StudentSkill"], function(Base, Skill){
    return Base.extend({
        model: Skill,
        fetch: function(){
            return $.Deferred().resolve([]);
        }
    });
});