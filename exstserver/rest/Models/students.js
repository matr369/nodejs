/**
 * Created by Administrator on 11.08.2014.
 */
var base = require("./Base");

module.exports = base.extend({
    collection_db: "students",
    exportAttrs: {
        name: true,
        enable: true
    },
    defaults: function(){
        return {
            name: "",
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
            email:"",
            skype:"",
            vacations: "",
            trainings: "",
            certificates: ""
        };
    }
});