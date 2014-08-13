/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 03.08.14
 * Time: 0:41
 * To change this template use File | Settings | File Templates.
 */
define("Views/Pages/StudentInfo", ["Views/Page", "Models/StudentInstance", "jquery"], function(Page, Student, $){

    return Page.extend({

        constructor: function(options){
            options.model = new Student({
                id: options.student
            });
            Page.prototype.constructor.apply(this, arguments);
        },
        __ready: function(){
            debugger;
            this.listenTo(this.model, "change:name", function(){
                this.childrenViews.pageDescription.options.pageTitle = this.model.get('name');
                debugger;
                this.childrenViews.breadcrumbs.options.path[1].title = this.model.get('name');
                debugger;
                this.childrenViews.pageDescription.rerender();
                this.childrenViews.breadcrumbs.rerender();
            });
        },
        __prepareModel: function(){
            var modelStatus = $.Deferred(),
                model = this.model,
                xhr = Page.prototype.__prepareModel.apply(this, arguments);
            xhr.done(function(){
                model.fetchInfo().done(modelStatus.resolve);
            });
            return modelStatus;
        }



    }, {
        defaults: $.extend(true, {}, Page.defaults, {
            tpl: {
                src: "pages/student.info.html?v=1"
            },
            student: null,
            title: "Students"
        })
    });
});