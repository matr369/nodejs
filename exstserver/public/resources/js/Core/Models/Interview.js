/**
 * Created by Administrator on 07.08.2014.
 */
define("Models/Interview",["Models/Base","Collections/StudentSkills"], function(Base, StudentSkills){
    return Base.extend({
        defaults: function() {
            return {
                student: "",
                result: "",
                studentSkills: new StudentSkills([]),
                interviewer: {
                    name: "Zhanna Vasilenko"
                }
            }
        },
        urlRoot: "/interviews",
        toJSON: function(options){
            debugger;
            var json = {};
            for(var attr in this.attributes){
                if(this.attributes[attr] && this.attributes[attr].toJSON){
                    if (this.attributes[attr] instanceof Backbone.Model) {
                        json[attr] = this.attributes[attr].attributes.toJSON();
                    } else {
                        json[attr] = this.attributes[attr].toJSON();
                    }
                } else{
                    json[attr] = this.attributes[attr];
                }
            }
            return json;
        }
    });
});