/**
 * Created by Administrator on 29.07.2014.
 */
define("Models/Feedback",["Models/Base"],function(Base){
    return Base.extend({
        defaults: function(){
            return {
                student: "",
                curator: {
                    name: "Zhanna Vasilenko"
                }
            };
        },
        urlRoot: "/feedbacks"
    });
});