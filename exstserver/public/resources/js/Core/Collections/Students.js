/**
 * Created by Administrator on 04.08.2014.
 */
define(["Collections/Base", "Models/Student"], function(Base, Student){
    return Base.extend({
        model: Student,
        url: "/students",
        constructor: function(){
            if (this.constructor._instance) {
                return this.constructor._instance;
            } else {
                Base.prototype.constructor.apply(this, arguments);
                this.constructor._instance = this;
            }
        }

    });
});