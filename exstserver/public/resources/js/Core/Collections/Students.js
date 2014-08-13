/**
 * Created by Administrator on 04.08.2014.
 */
define("Collections/Students",["Collections/Base", "Models/Student"], function(Base, Student){
    return Base.extend({
        model: Student,
        url: "/students"


    });
});