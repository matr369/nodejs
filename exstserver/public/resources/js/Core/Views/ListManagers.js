/**
 * Created by Administrator on 06.08.2014.
 */
define(["Views/Base", "Collections/Managers", "Models/Manager", "underscore", "jquery"], function(Base, Managers, Manager, _, $){
    return Base.extend({
        constructor: function(options){
            options = options || {};
            this.rows = [];
            options.collection = new Managers();
            Base.prototype.constructor.apply(this, arguments);
            this.listenTo(options.collection, "add", this.showManager);
            this.showAllManagers();
        },

        showAllManagers: function(){
            this.collection.forEach(this.showManager, this);
            return this;
        },

        showManager: function(model){
            var row = new Base({
                tpl: {
                    src: "managerstable.html?v=1",
                    $: "manager"
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
            return (new RegExp(field, 'i')).test(name);
        },

        filterRow: function(row){
            if( this.isNameFilter(this.filter.managerName, row.model.get('name'))){
                row.show();
            }
            else{
                row.hide();
            }
        },

        doFilter: function(event, filter){
            this.filter = filter;
            this.rows.forEach(this.filterRow, this);
        }

    },{
        defaults: $.extend(true, {}, Base.defaults, {
            tpl: null,
            index:1
        })
    });
});