/**
 * Created by Administrator on 12.08.2014.
 */
var base = require("./Base");
var $ = require("Deferred");
var Model = require("./../Models/feedbacks");

module.exports = base.extend({
    collection_db: "feedbacks",
    model: Model
});