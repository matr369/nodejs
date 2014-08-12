/**
 * Created by Administrator on 05.08.2014.
 */
define(["Routes/Base", "App"], function(Router, App){
    return Router.extend({
        routes: {
            "managers":"showManagersList"
        },
        showManagersList: function(){
            require(["Views/Pages/Managers"], function(Page){
                (new Page()).show();
            });
        }
    });
});