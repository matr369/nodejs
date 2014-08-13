define("Views/FieldsTable",["Collections/Fields", "Views/Base", "App", "jquery", "Views/FieldRow"], function (Fields, Base, App, $, FieldRow){
    return Base.extend({
        events: {
            "click .fa-times": "delete"

        },

        delete:function(event){

            this.collection= new Fields();
            this.collection.remove($(event.target).data("id"));
            $(event.target).parents("tr").detach();



        },

        constructor: function(options){
            options.collection = new Fields();

            this.listenTo(options.collection, "add", this.addline);

            Base.prototype.constructor.apply(this, [options]);
        },


        addline:function(field){
            var row = new FieldRow({

                container: this.$("tbody"),

                containerResolveMethod: "append",
                field: field
            });
            row.show();
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