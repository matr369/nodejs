/**
 * Created by Administrator on 13.08.2014.
 */
var base = require("./Base");
var $ = require("Deferred");
var Model = require("./../Models/interviews");

module.exports = base.extend({
    collection_db: "interviews",
    model: Model
});