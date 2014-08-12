/**
 * Created by Administrator on 29.07.2014.
 */
define(["Models/Base", "Collections/Students"],function(Base, Students){
    return Base.extend({
        defaults: function(){
            return {
                name: "",
                email: "",
                students: new Students([])
            };
        },
        urlRoot: "/curators",
        constructor: function(){
            this.on("change:students", function(model, value){
                this.set("students", new Students(value), {silent: true});
            });
            Base.prototype.constructor.apply(this, arguments);
        }
    });
});