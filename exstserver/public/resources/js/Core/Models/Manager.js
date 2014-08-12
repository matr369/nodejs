/**
 * Created by Administrator on 06.08.2014.
 */
define(["Models/Base"],function(Base){
    return Base.extend({
        defaults: function(){
            return {
                name: "",
                email: ""
            };
        },
        url: "/managers",
        constructor: function(){
            Base.prototype.constructor.apply(this, arguments);
        },
        fetch: function(){
            return $.Deferred().resolve([]);
        }
    });
});