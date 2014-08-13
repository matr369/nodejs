define("Collections/Properties",["Models/Property", "Collections/Base", "underscore"], function(Property, Collection, _){
    return Collection.extend({
        model:Property,
        /**
         * Singleton
         * @returns {*|Collection.constructor._instance}
         */
        constructor: function(){
            if (this.constructor._instance) {
                return this.constructor._instance;
            } else {
                Collection.prototype.constructor.apply(this, arguments);
                this.constructor._instance = this;
            }
        }

    });
});
