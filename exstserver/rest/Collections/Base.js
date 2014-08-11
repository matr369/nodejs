var Collection = require("backbone").Collection,
    Model = require("../Models/Base"),
    Connector = require("../Connector"),
    Base = Collection.extend({
        isCollection: true,
        model: Model
    },{});

module.exports = Base;


