define("Views/FieldsTable",["Collections/Fields", "Views/Base", "App", "jquery", "Views/FieldRow"], function (Fields, Base, App, $, FieldRow){
    return Base.extend({
        events: {
            "click .fa-times": "destroy"
        },

        destroy: function(event){
            var tr = $(event.currentTarget).parents("tr");
            var model = this.collection.remove(tr.data("id"));
            model.destroy();
            tr.remove();
        },
        __ready: function(){
            this.listenTo(this.collection, "add remove", this.rerender);
            Base.prototype.__ready.apply(this, arguments);
        },
        constructor: function(options){
            options.collection = new Fields();
            Base.prototype.constructor.apply(this, [options]);
        }

    }, {
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: {
                src: "fieldstable.html?v=1"
            },
            formTitle :"skills table"


        })
    });


});