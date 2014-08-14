define("Views/StudentsTable", ["Views/Form", "App", "underscore", "jquery", "Collections/Students", "Models/Student", "Core/PropertyList", "Views/StudentsFromTable", "Views/FilterStudentForm", "Collections/RemoteStudents"], function (Form, App, _, $, Students, Student, PropertyList, StudentsFromTable, FilterStudentForm, RemoteStudents) {
    return Form.extend({
        events: $.extend(true, {}, Form.prototype.events, {
            "click .extra": "addField",
            "click .deleteField": "deleteField",
            "view:ready": "initSubViews"
        }),

        onSuccessSubmit: function (data) {
            this.childrenViews.studentsList.rerender();
        },

        __sendData: function (data) {
            var self = this,
                xhr = $.Deferred();

            (new RemoteStudents(data)).done(function () {
                self.childrenViews.studentsList.options.collection = this;
                xhr.resolve(data);
            }).fail(xhr.reject);
            return xhr;
        },

        serialize: function () {

            var result = {},
                arr = [];
            for (var j = 0; j < this.fields.length; j++) {
                if(this.fields[j].options.name=="name")
                {
                    arr.push(this.fields[j]);
                }
                for (var i = 0; i < this.options.ourfields.length; i++) {
                    if (this.fields[j].options.name == this.options.ourfields[i] ) {
                        arr.push(this.fields[j]);
                    }
                }
            }
            this.fields=arr;

            _.each(this.fields || [], function (field) {
                _.extend(result, field.serialize());
            });
            return result;
        },


        initSubViews: function () {
            var studentsFromTable = new StudentsFromTable({
                container: this.$("tbody"),
                containerResolveMethod: "replaceWith",
                fields: this.options.ourfields
            });
            this.registerChildView("studentsList", studentsFromTable);
            studentsFromTable.show();
        },

        constructor: function (options) {
            Form.prototype.constructor.apply(this, [options]);
        },

        deleteField: function (event) {
            var ind = _.findIndex(this.options.ourfields, function (field) {
                return field == $(event.target).data("index")
            });

            if (ind > -1) {
                this.options.ourfields.splice(ind, 1);
                this.fields.splice(ind + 1, 1);
                this.rerender();
            }
        },

        addField: function (event) {

            var fiedlId = $(event.currentTarget).data("index");
            var ind = _.findIndex(this.options.ourfields, function (field) {
                return field == fiedlId
            });
            if (ind == -1) {
                this.options.ourfields.push(fiedlId);
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
            ourfields: [],
            properties: {},
            title: "StudentsTable"


        })
    });
});
