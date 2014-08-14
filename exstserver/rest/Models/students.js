/**
 * Created by Administrator on 11.08.2014.
 */
var base = require("./Base");
var Feedbacks = require("./../Collections/feedbacks");
var $ = require("Deferred");

module.exports = base.extend({
    collection_db: "students",
    exportAttrs: {
        name: true,
        enable: true
    },
    defaults: function(){
        return {
            name: "",
            email:"",
            skype:"",
            enable: true,
            startWorkDate: new Date(),
            hadInternship: false,
            startCourse: "",
            university: "",
            faculty: "",
            speciality: "",
            course: "",
            group: "",
            graduate: "",
            grade1: "",
            grade2: "",
            grade3: "",
            grade4: "",
            currentWorkHours: 0,
            futureWorkHours: "",
            previousProjects: "",
            currentProject:"",
            billable: false,
            currentProjectRole:"",
            currentProjectTeamLead:"",
            currentProjectPM:"",
            curator: [],
            currentProjectTechnologies:"",
            wantedTechnologies:"",
            wantChangeProject: false,
            englishLevel:"basic",
            englishCourse:"",
            phone:"",
            vacations: "",
            trainings: "",
            certificates: ""
        };
    },
    feedbacks: function(){
        var xhr = $(),
            feeds = new Feedbacks();
        feeds.where({
            student: this.id
        }).done(function(){
            xhr.resolve(feeds.exportToJSON());
        }).fail(xhr.fail);
        return xhr;
    },
    info: function(){
        return this.fetch({
            exports: {}
        });
    }
});