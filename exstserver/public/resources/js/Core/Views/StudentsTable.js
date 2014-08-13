
define("Views/StudentsTable", ["Views/Form","App", "underscore", "jquery", "Collections/Students", "Models/Student", "Core/PropertyList", "Views/StudentsFromTable", "Views/FilterStudentForm", "Collections/RemoteStudents"], function (Form, App, _, $, Students, Student, PropertyList, StudentsFromTable, FilterStudentForm, RemoteStudents) {
   return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "click .extra": "addField",
            "click .deleteField": "deleteField",
            "view:ready": "initSubViews"
        }),

        onSuccessSubmit: function(data){
            this.childrenViews.studentsList.rerender();
        },

        __sendData:function(data){
            var self = this,
                xhr = $.Deferred();
            (new RemoteStudents(data)).done(function(){
                self.childrenViews.studentsList.options.collection = this;
                xhr.resolve(data);
            }).fail(xhr.reject);
            return xhr;
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

            var fiedlId = $(event.currentTarget).data("index");
            var ind = _.findIndex(this.options.fields, function (field) {
                    return field == fiedlId
                });
            if (ind == -1) {
                this.options.fields.push(fiedlId);
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
