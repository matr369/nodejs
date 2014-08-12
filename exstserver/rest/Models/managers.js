/**
 * Created by Administrator on 12.08.2014.
 */
var base = require("./Base");
var $ = require("Deferred");
module.exports = base.extend({
    exportAttrs: {
        name: true,
        email : true
    },
    defaults: function(){
        return {
            name: "",
            email: ""
        };
    }
});