/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 02.08.14
 * Time: 18:02
 * To change this template use File | Settings | File Templates.
 */
define("Models/StudentInstance",["Models/Student"], function(Student){
    var RuntimeCollection = {
        list: {},
        set: function(student){
            (!this.list[student.id]) && (this.list[student.id] = student);
        },
        get: function(id){
            if (this.list[id] instanceof Student) {
                return this.list[id];
            } else {
                return null
            }
        }
    };


    return Student.extend({
        constructor: function(options){
            var instance = RuntimeCollection.get(options._id || options.id);
            if (instance) {
                return instance;
            } else {
                Student.prototype.constructor.apply(this, arguments);
                RuntimeCollection.set(this);
            }
        }
    });
});