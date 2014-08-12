/**
 * Created by Administrator on 12.08.2014.
 */
var base = require("./Base");
var $ = require("Deferred");
var Model = require("./../Models/managers");
module.exports = base.extend({
    model: Model
});