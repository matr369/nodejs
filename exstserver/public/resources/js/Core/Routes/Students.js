/**
 * Created by dmantsevich on 7/21/2014.
 */
define(["Routes/Base", "App"], function(Router){
    return  Router.extend({
        routes: {
            "students": "showList",
            "students/:id": "showInfo",
            "students/:id/feedbacks": "showFeedbacks",
            "students/:id/interviews": "showInterviews"
        },

        showList: function(){
            require(["Views/Pages/Students"], function(Page){
                (new Page()).show();
            });


        },

        showInfo: function(id){
            require(["Views/Pages/StudentInfo"], function(Page){
                (new Page({
                    student: id
                })).show();
            });
        },

        showFeedbacks: function(id){
            require(["Views/Pages/StudentFeedbacks"], function(Page){
                (new Page({
                    student: id
                })).show();
            });
        },

        showInterviews: function(id){
            require(["Views/Pages/StudentInterviews"], function(Page){
                (new Page({
                    student: id
                })).show();
            });
        }
    });
});