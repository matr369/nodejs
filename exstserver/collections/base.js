var Model = require()
var Collection = function(collection, params){
    this.params = params;
    this.data = params.data || {};
    this.db = collection;
};

Collection.prototype.doRequest = function(){

};

Collection.prototype.create = function(){
    this.db.insert(this.data);
};

module.exports = Collection;