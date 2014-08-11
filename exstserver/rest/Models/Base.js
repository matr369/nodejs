var Model = require("backbone").Model,
    Connector = require("../Connector"),
    Base = Model.extend({
        isModel: true,
        idAttribute: "_id"
    },{});

module.exports = Base;