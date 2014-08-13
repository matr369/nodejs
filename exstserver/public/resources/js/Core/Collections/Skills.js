define("Collections/Skills",["Models/Skill", "Collections/Base", "underscore"], function(Skill, Collection, _){
    return Collection.extend({
        model:Skill,
        url: '/technology',
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
