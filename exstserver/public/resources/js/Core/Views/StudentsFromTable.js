define("Views/StudentsFromTable",["Views/Form", "jquery", "Collections/Students"], function (Form, $, Students) {
    return Form.extend({
        constructor: function(options){
            options.collection = new Students();
            Form.prototype.constructor.apply(this,[options]);
        },
        filterRow: function(row){
            if( this.isNameFilter(this.filter.employerName, row.model.get('name')) &&
                this.isStudentFilter(this.filter.studentsName, row.model.get('students'))){
                row.show();
            }
            else{
                row.hide();
            }
        },

        doFilter: function(event, filter){
            try {
                this.filter = filter;
                this.rows.forEach(this.filterRow, this);
            } catch (e){

            }
        }


    }, {
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: {
                src: "studentsfromtable.html?v=1"
            },
            fields: []
        })
    })
});