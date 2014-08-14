define("Collections/Certificates",["Models/Certificate", "Collections/Base", "underscore"], function(Certificate, Collection){
    return Collection.extend({
        model:Certificate,
        url: '/certificates',
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
