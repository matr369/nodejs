/**
 * Created by Administrator on 13.08.2014.
 */
var base = require("./Base");
var $ = require("Deferred");
module.exports = base.extend({
    exportAttrs: {
        entity: true,
        email: true
    },
    defaults: function(){
        return {
            email: "",
            password: "",
            entity: "Student"
        };
    }
});