/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 03.08.14
 * Time: 0:41
 * To change this template use File | Settings | File Templates.
 */
define("Views/Pages/StudentFeedbacks", ["Views/Page", "Views/Base", "Models/StudentInstance", "jquery"], function(Page, Base, Student, $){

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
                model.fetchFeedbacks().done(modelStatus.resolve);
            });
            return modelStatus;
        }

    }, {
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/student.feedbacks.html?v=1"
            },
            student: null,
            title: "Students"
        })
    });
});