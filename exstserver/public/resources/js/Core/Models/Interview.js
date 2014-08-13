/**
 * Created by Administrator on 07.08.2014.
 */
define("Models/Interview",["Models/Base","Collections/StudentSkills"], function(Base, StudentSkills){
    return Base.extend({
        defaults: {
            result: "",
            studentSkills: new StudentSkills(),
            idStudent: "",
            interviewer: "",
            date: ""
        }
    });
});