var express = require('express'),
    $ = require("Deferred"),
    router = express.Router();

var setUpModel = function (params, method, data) {
    if (!this.collection_db) {
        this.collection_db = params.collection;
        this.url = params.collection;
    }
    if (params.id) {
        this.set("_id", params.id);
    }
    switch (method) {
        case "GET":
            return this.fetch();
            break;
    }
};

var setUpCollection = function (params, method, data) {
    if (!this.collection_db) {
        this.collection_db = params.collection;
    }
    switch (method) {
        case "GET":
            return this.fetch();
            break;
        case "POST":
            var xhr = $();
            var model = this.create(data, {
                success: function(){
                    xhr.resolve(model.attributes);
                },
                error: function(){
                    xhr.reject();
                }
            });
            return xhr;
            break;
    }
};

var doRequrest = function (req, res, next) {
    // Connect to the db
    var EntityFolder = "Collections",
        setUpFunction = setUpCollection;
    if (req.params.id) {
        EntityFolder = "Models";
        setUpFunction = setUpModel;
    }
    var Constructor;
    try {
        Constructor = require("../rest/" + EntityFolder + "/" + req.params.collection);
    } catch (e) {
        Constructor = require("../rest/" + EntityFolder + "/Base");
    }
    setUpFunction.call(
        new Constructor(),
        req.params,
        req.method,
        req.body
    ).then(function(result){
        res.send({
            status: "success",
            data: result
        }, 200);
    }, function(error){
        res.send({
            status: "error",
            data: error
        }, 200);
    });
};

router
    .post('/:collection/:id?/:method?', doRequrest)
    .get('/:collection/:id?/:method?', doRequrest);

module.exports = router;
