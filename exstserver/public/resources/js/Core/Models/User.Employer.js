/**
 * Created by Administrator on 23.07.2014.
 */
define("Models/User.Employer",["Models/User"], function(User){
    return User.extend({
        defaults: {
            defaultPage: "students",
            canDo: ["view_settings"]
        },
        /**
         * function to check allowed actions user
         */
        can: function(whatCan){
            for(var i = 0; i < this.get('canDo').length; i++){
                if(whatCan == this.get('canDo')[i]){
                    return true;
                }
            }
            return false;
        }
    });
});