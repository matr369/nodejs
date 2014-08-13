define("Collections/Fields",["Models/Field", "Collections/Base", "underscore"], function(Field, Collection, _){
    return Collection.extend({
        model:Field,
        url: '/technology',
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
