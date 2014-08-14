/**
 * Created by Administrator on 29.07.2014.
 */
define("Models/Feedback",["Models/Base", "Models/Employer"],function(Base, Employer){
    return Base.extend({
        defaults: function(){
            return {
                student: "",
                curator: new Employer({
                    name: "Peter Gordon"
                })
            };
        },
        constructor: function(){
            this.on("change:curator", function(val){
                if (val instanceof Employer) {} else {
                    this.set("curator", new Employer(val), {silent:true});
                }
            });
            Base.prototype.constructor.apply(this,arguments);
        },
        urlRoot: "/feedbacks"
    });
});