/**
 * Created by Administrator on 13.08.2014.
 */
var base = require("./Base");
var Students = require("./../Collections/students");
var $ = require("Deferred");
module.exports = base.extend({
    defaults: function(){
        return {
            name: "",
            email: "",
            students: []
        };
    }
});