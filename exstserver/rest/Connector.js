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
    var exports = model.model.prototype.exportAttrs || [];
    mongoConnector.done(function(){
        switch (method) {
            case 'read':
                this.collection(model.collection_db).find({}, exports).toArray(function(err, data){
                    if (err) {
                        xhr.reject(err);
                    }else {
                        xhr.resolve(data);
                    }
                });
                break;
            case "find":
                this.collection(model.collection_db).find(options.filter, options.exports || exports).toArray(function(err, data){
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
    var findById = model.id? { "_id": ObjectID(model.id) } : {};
    var exports = model.exportAttrs;
    mongoConnector.done(function(){
        switch (method) {
            case 'create':
                this.collection(db_collection).insert(model.attributes, function(error, result){
                    if (error) {
                        options.error(error);
                        xhr.reject(error);
                    } else {
                        options.success(result[0]);
                        xhr.resolve(result[0]);
                    }
                });
                break;
            case 'read':
                this.collection(db_collection).findOne(findById, exports, function(error, result){
                    if (error) {
                        xhr.reject(error);
                    } else {
                        xhr.resolve(result);
                    }
                });
                break;
            case 'delete':
                this.collection(db_collection).remove( findById, function(error, result){
                    if (error) {
                        xhr.reject(error);
                    } else {
                        xhr.resolve(result);
                    }
                });
                break;
            case 'update':
                this.collection(db_collection).update(findById, model.changed, {}, function(error, result) {
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