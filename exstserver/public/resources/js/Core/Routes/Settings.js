define("Routes/Settings", ["Routes/Base", "App"], function(Router, App){
    return  Router.extend({
        routes: {

            "settings":"showSettingsPage",
            "settings/fields":"showNewFieldPage",
            "settings/certificates":"showCertificates",
            "settings/skills":"showNewSkillPage"
        },


        /**
         * New field
         */
        "showNewFieldPage": function(){
            require(["Views/Pages/SettingsFields"], function(Page){
                (new Page()).show();
            });
        },



        /**
         * New skill
         */
        "showNewSkillPage": function(){
            require(["Views/Pages/SettingsSkills" ], function(Page){
                (new Page({})).show();
            });
        },


        /**
         * New skill
         */
        "showCertificates": function(){
            require(["Views/Pages/SettingsCertificates" ], function(Page){
                (new Page({})).show();
            });
        },



        /**
         * Settings Page
         */
        "showSettingsPage": function(){
            require(["Views/Pages/Settings", "Models/Settings"], function(Page, Settings){
                (new Page({
                    model: new Settings()
                })).show();
            });
        }





    });
});