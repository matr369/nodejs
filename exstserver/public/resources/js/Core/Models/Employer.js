/**
 * Created by Administrator on 29.07.2014.
 */
define("Models/Employer",["Models/Base", "Collections/Students", "underscore"],function(Base, Students, _){
    return Base.extend({
        defaults: function(){
            return {
                name: "",
                email: "",
                students: new Base([])
            };
        },
        urlRoot: "/curators",
        constructor: function(){
            this.on("change:students", function(model, value){
                if(_.isArray(value)) {
                    this.set("students", new Students(value), {silent: true});
                }
                this.listenTo(this.get("students"), "add remove", function(){
                    this.save();
                });
            });
            Base.prototype.constructor.apply(this, arguments);
        }
    });
});