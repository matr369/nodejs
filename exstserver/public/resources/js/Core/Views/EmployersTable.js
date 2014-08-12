/**
 * Created by Administrator on 28.07.2014.
 */
define(["Views/Base","underscore", "Views/FilterEmployerForm", "Views/ListEmployers"],function(Base, _, FilterEmployerForm, ListEmployers ){
    return Base.extend({
        events: {
            "view:ready": "initSubViews"
        },
        constructor: function(){
            Base.prototype.constructor.apply(this, arguments);
       },
        initSubViews: function(){
            var filterEmployer = new FilterEmployerForm({
                el: this.$(".filter-container")
            });
            filterEmployer.registerChildView("employerName", this.childrenViews.employerName);
            filterEmployer.registerChildView("studentsName", this.childrenViews.studentsName);
            filterEmployer.__initFields();
            filterEmployer.render();
            this.registerChildView("filter", filterEmployer);
            var listEmployers = new ListEmployers({
                el: this.$("tbody")
            });
            filterEmployer.$el.on("form:submit:success", listEmployers.doFilter.bind(listEmployers));
        }


    },{
        defaults: $.extend(true, {}, Base.defaults, {
          tpl: {
              src: "employerstable.html?v=1",
              $ : "container"
          },

           employerName: "Name",
           employerStudents: "Students",
           employerNamePlaceholder: "Masha Masha",
           employerStudentsPlaceholder: "masha masha"
        })
    });
});

