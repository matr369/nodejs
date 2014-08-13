/**
 * Created by Administrator on 11.08.2014.
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
    },
    afterFetch: function(){
        var xhr = $(),
            self = this,
            students = new Students(this.get("students") || []);
        if (students.length) {
            students.fetch().done(function(){
                self.set("students", students);
                xhr.resolve();
            }).fail(xhr.reject);
        } else {
            self.set("students", students);
            xhr.resolve();
        }
        return xhr;
    }
});