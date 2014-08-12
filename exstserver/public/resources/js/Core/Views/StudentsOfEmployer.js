/**
 * Created by Administrator on 31.07.2014.
 */
define(["Views/Base","jquery", "Views/Popover",  "bootstrap", "Models/Student", "App", "Collections/Students"], function(View, $, Popover, bootstrap, Student, App, Students){
    return View.extend({
        events:{
            "field:changed": "addStudent",
            "click .del-stud" : "detachStudent"
        },
        constructor: function(options){
            options.allStudents = new Students();
            View.prototype.constructor.apply(this,[options]);
            this.listenTo(this.collection, "add", this.rerender);
            this.listenTo(this.collection, "remove", this.rerender);
        },
        /*
        add student to employer
         */
        addStudent: function(event, student){
            this.$(".popover-btn").popover("hide");
            this.options.collection.add(student);
        },
        /*
            detach student to employer
         */
        detachStudent: function(event){
            var index = $(event.target).data("index");
            this.collection.remove(this.collection.at(index));
        }
    }, {
        defaults: $.extend(true, {}, View.defaults, {
            tpl: {
                src: "employerstable.html?v=1",
                $: "students"
            },
            prepareCollection: false,
            allStudents: null
        })
    });
});