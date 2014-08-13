/**
 * Created by Administrator on 29.07.2014.
 */
define(["Views/Base", "Collections/Employers", "Models/Employer", "underscore", "jquery"], function(Base, Employers, Employer, _, $){
    return Base.extend({
        constructor: function(options){
            options = options || {};
            this.rows = [];
            options.collection = new Employers();
            Base.prototype.constructor.apply(this, arguments);
            this.listenTo(options.collection, "add", this.showEmployer);
            this.showAllEmployers();
        },

        showAllEmployers: function(){
            this.collection.forEach(this.showEmployer, this);
        },

        showEmployer: function(model){
            var row = new Base({
                tpl: {
                    src: "employerstable.html?v=1",
                    $: "employer"
                },
                container: this.$el,
                containerResolveMethod: "append",
                fx: {
                    show: {
                        duration: 0
                    },
                    hide: {
                        duration: 0
                    }
                },
                model: model,
                index: this.options.index
            });
            this.options.index+=1;
           row.show();
           this.rows.push(row);
        },

        isNameFilter: function(field, name){
            if(field === "")
                return true;
            return (new RegExp(field, 'i')).test(name);
        },

        isStudentFilter:function(field, students){
            if(field === "")
                return true;
            return students.some(function(student){
                return (new RegExp(field, 'i')).test(student.get('name'));
            });
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
        },
        __ready: function(){
            this.$el.trigger("view:ready");
        }

    },{
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: null
        }),
        prepareCollection :false,
        index: 1
    });
});