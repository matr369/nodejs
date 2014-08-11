/**
 * Created by Mantsevich on 10.08.2014.
 */
var Backbone = require("backbone"),
    $ = require("Deferred"),
    mongoConnector = $(),
    ObjectID = require('mongodb').ObjectID,
    client = require('mongodb').MongoClient.connect("mongodb://localhost:27017/exadel-students", function(err, db){
        if(!err) {
            mongoConnector.resolveWith(db, []);
        } else {
            mongoConnector.rejectWith(err, []);
        }
    });



var ConnectorForCollections = function(method, model, options){
    var xhr = $();
    mongoConnector.done(function(){
        switch (method) {
            case 'read':
                this.collection(model.collection_db).find().toArray(function(err, data){
                    if (err) {
                        xhr.reject(err);
                    }else {
                        xhr.resolve(data);
                    }
                });
                break;
            default:
                xhr.reject(new Error("Unknow action."));
                break;
        }

    });
    return xhr;
};

var ConnectorForModels = function(method, model, options){
    var xhr = $();
    var db_collection = model.collection_db || model.collection.collection_db;
    mongoConnector.done(function(){
        switch (method) {
            case 'create':
                this.collection(db_collection).insert(model.attributes, function(error, result){
                    if (error) {
                        xhr.reject(error);
                    } else {
                        xhr.resolve(result[0]);
                    }
                });
                break;
            case 'read':
                this.collection(db_collection).findOne({ "_id": ObjectID(model.id) }, function(error, result){
                    if (error) {
                        xhr.reject(error);
                    } else {
                        xhr.resolve(result);
                    }
                });
                break;
            default:
                xhr.reject(new Error("Unknow action."));
                break;
        }

    });
    return xhr;
};

Backbone.sync = function(method, model, options){
    var xhr = $();
    if (model.isCollection){
        ConnectorForCollections.apply(this, arguments).then(xhr.resolve, xhr.reject);
    } else {
        ConnectorForModels.apply(this, arguments).then(xhr.resolve, xhr.reject);
    }
    return xhr;
};