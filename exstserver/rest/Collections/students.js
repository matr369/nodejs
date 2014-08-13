/**
 * Created by Administrator on 11.08.2014.
 */
var base = require("./Base");
var Model = require("./../Models/students");

module.exports = base.extend({
    collection_db: "students",
    model: Model,
    _prepareModel: function(attrs){
        return new Model().clear().set(attrs);
    }
});