/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 02.08.14
 * Time: 18:00
 * To change this template use File | Settings | File Templates.
 */
define(["Models/Base", "Collections/Feedbacks", "Collections/Interviews", "jquery", "Collections/StudentSkills", "Models/Interview", "Models/Skill"], function(Base, Feeds, Interviews, $, StudentSkills, Interview, Skill){

    return Base.extend({
        defaults: function(){
            return {
                name: "",
                enable: true,
                status:'work',
                avatar: "resources/images/default_avatar_male.jpg"
            }
        },
        urlRoot: "/students",


        constructor: function(options){
            this.on("change:id", function(){
                this.set("profileLink", "students/" + this.id);
                this.set("feedbacksLink", "students/" + this.id + "/feedbacks");
                this.set("interviewsLink", "students/" + this.id + "/interviews");
            });

            Base.prototype.constructor.apply(this, arguments);
        },

        enable: function(){
            this.set("enable", true);
        },
        disable: function(){
            this.set("enable", false);
        },
        fetchFeedbacks: function(){
            if (!this.__feedbacks) {
                this.__feedbacks = $.Deferred();
                //TODO: Отправляем запрос на сервер за инфой. Сохраняем через this.set. Резолвим this.__feedbacks с коллекцией.
                this.set("feedbacks", new Feeds([{
                    id: 1,
                    curator: "Dmitrii Ivanov",
                    date: "01/01/2014",
                    note: "The is text..."
                },{
                    id: 2,
                    curator: "Mikhail Prusov",
                    date: "01/02/2014"
                }]));
                this.__feedbacks.resolve();
            }
            return this.__feedbacks;
        },
        fetchInterviews: function(){

            if (!this.__interviews) {
                this.__interviews = $.Deferred();
                this.set("interviews", new Interviews([
                    new Interview({
                        id: 1,
                        result: 'Excepted',
                        interviewer: "Pukova Polina",
                        idStudent: 2,
                        date: "01/01/2014",
                        note: "The is text...",
                        studentSkills: new StudentSkills([
                            new Skill({
                                technology_name: "fsdfsdf",
                                value: '1'
                            }),
                            new Skill({
                                technology_name: "fsdfsgndfz",
                                value: '3'
                            })
                        ])
                    })
                ]));
                this.__interviews.resolve();
                //TODO: Отправляем запрос на сервер за инфой. Сохраняем через this.set. Резолвим this.__interviews с коллекцией.
            }
            return this.__interviews;
        },
        fetchInfo: function(){
            if (!this.__info) {
                this.__info = $.Deferred();
                //TODO: Отправляем запрос на сервер за инфой. Сохраняем через this.set. Резолвим this.__info с коллекцией.
                this.__info.resolve();
            }
            return this.__info;
        }
    });
});