/**
 * Created by Administrator on 13.08.2014.
 */
var base = require("./Base");
var $ = require("Deferred");
module.exports = base.extend({
    exportAttrs: {
        technology_name: true,
        value: true
    },
    defaults: function(){
        return {
            technology_name: "",
            value: ""
        };
    }
});