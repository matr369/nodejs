/**
 * Created by Administrator on 07.08.2014.
 */
define(["Views/Page", "Views/Base", "Models/StudentInstance", "jquery"], function(Page, Base, Student, $){

    return Page.extend({

        constructor: function(options){
            options.model = new Student({
                id: options.student
            });
            Base.prototype.constructor.apply(this, arguments);
        },

        __prepareModel: function(){
            var modelStatus = $.Deferred(),
                model = this.model,
                xhr = Page.prototype.__prepareModel.apply(this, arguments);
            xhr.done(function(){
                model.fetchInterviews().done(modelStatus.resolve);
            });
            return modelStatus;
        }
    }, {
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/student.interviews.html?v=1"
            },
            student: null,
            title: "Students"
        })
    });
});