/**
 * Created by Administrator on 31.07.2014.
 */
define("Views/StudentsOfEmployer", ["Views/Base","jquery", "Views/Popover",  "bootstrap", "Collections/Students"], function(View, $, Popover, bootstrap, Students){
    return View.extend({
        events:{
            "mouseenter .del-stud": 'addDangerClass',
            "mouseout .del-stud": 'removeDangerClass',
            "field:changed": "addStudent",
            "click .del-stud" : "detachStudent"
        },

        addDangerClass: function(e){
            $(e.currentTarget).parents(".detach-student").addClass("low");
        },

        removeDangerClass: function(e){
            $(e.currentTarget).parents(".detach-student").removeClass("low");
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
            this.collection.add(student);
        },
        /*
            detach student to employer
         */
        detachStudent: function(event){
            var index = $(event.target).data("index");
            var delModel = this.collection.get(index);
            this.collection.remove(delModel);
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