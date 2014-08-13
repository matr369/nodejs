define("Views/SkillsTable",["Collections/Skills", "Views/Base", "App", "jquery"], function (Skills, Base, App, $){
    return Base.extend({
        events: {
            "click .fa-times": "destroy"
        },

        destroy:function(event){
            var model = this.collection.get($(event.target).data("id"));
            this.collection.remove(model);
            model.destroy();
        },

        __ready: function(){
            this.listenTo(this.options.collection, "add remove", this.rerender);
            Base.prototype.__ready.apply(this, arguments);
        },

        constructor: function(options){
            options.collection = new Skills();
            Base.prototype.constructor.apply(this, arguments);
        },

        __prepareCollection: function(){
            var self = this,
                xhr = Base.prototype.__prepareCollection.apply(this, arguments);
            (xhr) && xhr.done(function(){ self.options.prepareCollection = false; });
            return xhr;
        }

    }, {
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: {
                src: "form.skillstable.html?v=1"
            },
            formTitle :"skills table"
        })
    });


});