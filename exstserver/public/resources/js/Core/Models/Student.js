/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 02.08.14
 * Time: 18:00
 * To change this template use File | Settings | File Templates.
 */
define("Models/Student", ["Models/Base", "Collections/Feedbacks", "Collections/Interviews", "jquery", "Backbone"], function(Base, Feeds, Interviews, $, Backbone){
    return Base.extend({
        defaults: function(){
            return {
                name: "",
                enable: true,
                email:"",
                avatar: "resources/images/default_avatar_male.jpg"
            }
        },
        urlRoot: "/students",


        constructor: function(options){
            this.on("change:_id", function(){
                this.set("profileLink", "students/" + this.id);
                this.set("feedbacksLink", "students/" + this.id + "/feedbacks");
                this.set("interviewsLink", "students/" + this.id + "/interviews");
            });
            Base.prototype.constructor.apply(this, arguments);
            this.set("profileLink", "students/" + this.id);
            this.set("feedbacksLink", "students/" + this.id + "/feedbacks");
            this.set("interviewsLink", "students/" + this.id + "/interviews");
        },

        enable: function(){
            this.set("enable", true).save();
        },
        disable: function(){
            this.set("enable", false).save();
        },
        fetchFeedbacks: function(){
            var self = this;
            if (!this.__feedbacks) {
                this.__feedbacks = $.Deferred();

                Backbone.ajax({
                    url: self.urlRoot + "/" + self.id + "/feedbacks",
                    type: "GET"
                }).done(function(result){
                    self.set("feedbacks", new Feeds(result));
                    self.__feedbacks.resolve();
                });
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
            var self = this;
            if (!this.__info) {

                this.__info = $.Deferred();
                Backbone.ajax({
                    url: "/students/"+this.attributes.id,
                    method: "GET"
                }).done(function(data){
                    self.set(data);
                    self.__info.resolve(data);
                }).fail(this.__info.reject);
                //TODO: Отправляем запрос на сервер за инфой. Сохраняем через this.set. Резолвим this.__info с коллекцией.
              //  this.__info.resolve();
            }
            return this.__info;
        }
    });
});