/**
 * Created by Administrator on 07.08.2014.
 */
define(["Models/Base","Collections/StudentSkills","Models/Employer", "Models/Student"], function(Base, StudentSkills, Employer){
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