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
            this.on("change", function(){
                this.set("profileLink", "students/" + this.id, {silent:true});
                this.set("feedbacksLink", "students/" + this.id + "/feedbacks", {silent:true});
                this.set("interviewsLink", "students/" + this.id + "/interviews", {silent:true});
            });

            Base.prototype.constructor.apply(this, arguments);
            this.set("profileLink", "students/" + this.id, {silent:true});
            this.set("feedbacksLink", "students/" + this.id + "/feedbacks",{silent:true});
            this.set("interviewsLink", "students/" + this.id + "/interviews",{silent:true});
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
            var self = this;
            if (!this.__interviews) {
                this.__interviews = $.Deferred();
                Backbone.ajax({
                    url: self.urlRoot + "/" + self.id + "/interviews",
                    method: "GET"
                }).done(function(result){
                    self.set("interviews", new Interviews(result));
                    self.__interviews.resolve();
                }).fail(self.reject);

                //TODO: Отправляем запрос на сервер за инфой. Сохраняем через this.set. Резолвим this.__interviews с коллекцией.
            }
            return this.__interviews;
        },
        fetchInfo: function(){
            var self = this;
            if (!this.__info) {

                this.__info = $.Deferred();
                Backbone.ajax({
                    url: self.urlRoot + "/" + self.id + "/info",
                    type: "GET"
                }).done(function(result){
                    self.set(result);
                    self.__info.resolve();
                }).fail(self.__info.reject);
            }
            return this.__info;
        }
    });
});