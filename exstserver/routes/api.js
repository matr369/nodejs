var express = require('express'),
    $ = require("Deferred"),
    router = express.Router(),
    ObjectID = require('mongodb').ObjectID;

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
        case "DELETE":
            return this.destroy();
            break;
        case "PUT":
            return this.save(data);
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
            if(params.method){
                var model = this[params.method](data);
            } else {
                var model = this.create(data, {
                    success: function () {
                        model.afterFetch().done(function(){
                            xhr.resolve(model.exportToJSON());
                        }).fail(xhr.reject);
                    },
                    error: function (error) {
                        xhr.reject(error);
                    }
                });
            }
            return xhr;
            break;
    }
};

var doRequrest = function (req, res, next) {
    // Connect to the db
    var EntityFolder = "Collections",
        setUpFunction = setUpCollection;
    try {
        ObjectID(req.params.id);
    } catch (e){
        req.params.method = req.params.id;
        req.params.id = null;
    }
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
    .get('/:collection/:id?/:method?', doRequrest)
    .delete('/:collection/:id', doRequrest)
    .put('/:collection?/:id', doRequrest);

module.exports = router;
