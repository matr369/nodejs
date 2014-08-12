/**
 * Created by Administrator on 07.08.2014.
 */
define(["Collections/Base", "Models/Skill"], function(Base, Skill){
    return Base.extend({
        model: Skill,
        fetch: function(){
            return $.Deferred().resolve([]);
        }
    });
});