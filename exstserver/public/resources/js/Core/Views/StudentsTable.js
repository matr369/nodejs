
define("Views/StudentsTable", ["Views/Form","App", "underscore", "jquery", "Collections/Students", "Models/Student", "Core/PropertyList", "Views/StudentsFromTable"], function (Form, App, _, $, Students, Student, PropertyList, StudentsFromTable) {
   return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "click .extra": "addField",
            "click .deleteField": "deleteField",
            "view:ready": "initSubViews",
            "click .find": "findIt"


        }),

        findIt:function(){
            debugger;
            $(".intable").detach();
            this.initSubViews();
        },

        onSuccessSubmit: function(data){
            debugger;
            this.childrenViews.studentsList.rerender();
        },

        __sendData:function(data){
            debugger;
            return $.Deferred().resolve([]);
        },



        initSubViews: function(){

            var studentsFromTable = new StudentsFromTable({
                container: this.$("tbody"),
                containerResolveMethod: "replaceWith",
                fields: this.options.fields
            });
            this.registerChildView("studentsList", studentsFromTable);
            studentsFromTable.show();
        },

        constructor: function(options){
            debugger;
            options.collection = new Students();
            Form.prototype.constructor.apply(this,[options]);
        },

        deleteField: function (event) {
            var ind = _.findIndex(this.options.fields, function (field) {
                return field == $(event.target).data("index")
            });

            if (ind > -1) {
                this.options.fields.splice(ind, 1);
                this.rerender();
            }

        },

        addField: function (event) {
            var ind = _.findIndex(this.options.fields, function (field) {
                    return field == $(event.target).data("index")
                }),
                len = this.options.fields.length;
            if (ind == -1 && $(event.target).data("index")!="name") {
                this.options.fields[len] = $(event.target).data("index");
                this.rerender();
            }

        },
        render: function (options) {
            this.options.properties = PropertyList;
            return Form.prototype.render.apply(this, arguments);

        }



    }, {

        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "studentstable.html?v=1"
            },
            fields: [],
            properties: {},
            title:"StudentsTable"


        })
    });
});
