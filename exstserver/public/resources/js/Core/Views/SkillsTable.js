define(["Collections/Skills", "Views/Base", "App", "jquery"], function (Skills, Base, App, $){
    return Base.extend({
        events: {
            "click .fa-times": "destroy"
        },

        destroy:function(event){
            debugger;
            this.collection.remove($(event.target).data("id"));
            $(event.target).parents("tr").detach();
            //$(event.target).parent().detach();
        },

        constructor: function(options){
            debugger;
            options.collection = new Skills();
            this.listenTo(options.collection, "add remove", function(){debugger;this.rerender()});
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