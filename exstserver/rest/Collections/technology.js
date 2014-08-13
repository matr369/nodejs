/**
 * Created by Administrator on 13.08.2014.
 */
var base = require("./Base");
var $ = require("Deferred");
var Model = require("./../Models/technology");
module.exports = base.extend({
    model: Model,
    sortByAttrs: {
        technology_name: 1
    }
});