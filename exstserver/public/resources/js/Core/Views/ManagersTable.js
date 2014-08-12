/**
 * Created by Administrator on 06.08.2014.
 */
define(["Views/Base","underscore", "Views/FilterManagerForm", "Views/ListManagers"],function(Base, _, FilterManagerForm, ListManagers ){
    return Base.extend({
        events: {
            "view:ready": "initSubViews"
        },
        constructor: function(){
            Base.prototype.constructor.apply(this, arguments);
        },
        initSubViews: function(){
            var filterManager = new FilterManagerForm({
                el: this.$(".filter-container")
            });
            filterManager.registerChildView("managerName", this.childrenViews.managerName);
            filterManager.__initFields();
            filterManager.render();
            this.registerChildView("filter", filterManager);
            var listManagers = new ListManagers({
                el: this.$("tbody")
            });
            filterManager.$el.on("form:submit:success", listManagers.doFilter.bind(listManagers));
        }
        /*      __renderChildrenViews: function(){
         Base.prototype.__renderChildrenViews.apply(this, arguments);
         }*/

    },{
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: {
                src: "managerstable.html?v=1",
                $ : "container"
            },

            managerName: "Name",
            managerNamePlaceholder: "Masha Masha"
        })
    });
});

