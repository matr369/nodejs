/**
 * Created by Mantsevich on 29.07.2014.
 */
define("Views/Fields/AC", ["Views/Fields/Base", "Collections/Base", "jquery", "underscore", "typeahead"], function(Field, Collection, $, _, ac) {

    return Field.extend({
        events: {
            "{initEvent}": "initAC",
            "{destroyEvent}": "killAC",
            "blur": "dropValue",
            "typeahead:selected": "setSelectedValue"
        },

        /**
         * Init typeahead on input
         */
        initAC: function(){
            var self = this,
                options = this.options;
            this.killAC();
            this.$el.typeahead({
                highlight: true,
                hint: options.hint,
                minLength: options.minSize
            }, {
                name: options.listItemClass,
                displayKey: options.displayKey || options.name,
                templates: {},
                source: self.find.bind(this)
            });
        },

        /**
         * Destroy Typeahead
         */
        killAC: function(){
            this.$el.typeahead("destroy");
        },

        find: function(q, callback){
            var options = this.options;
            //this.setValue("");
            this.findByQuery(q)
                .always(function(){

                }).done(function(result){
                    (options.maxItems) && (result = result.slice(0, options.maxItems));
                    callback(result || []);
                }).fail(function(){
                    callback([]);
                });
        },

        __findInArray: function(query, src){
            var comparator = this.options.comparator,
                fieldName = this.options.displayKey || this.options.name,
                idKey = this.options.idKey,
                result = [];
            _.each(src, function(el, i){
                var obj = el;
                if (!_.isObject(el)) {
                    obj = {};
                    obj[idKey] = i;
                    obj[fieldName] = el;
                }
                (comparator(query, obj[fieldName]) === true) && (result.push(obj));
            });
            return result;
        },

        __findInCollectionFilter: function(query, collection){
            var fieldName = this.options.displayKey || this.options.name,
                comparator = this.options.comparator,
                result = [];
            collection.each(function(model){
                (comparator(query, model.get(fieldName))) && (result.push(model.attributes));
            });
            return result;
        },

        __findInCollection: function(query, collection) {
            var self = this,
                xhr = $.Deferred();
            if (collection.length === 0) {
                collection.fetch()
                    .done(function(){
                        xhr.resolve(self.__findInCollectionFilter(query, collection));
                    });
            } else {
                xhr.resolve(self.__findInCollectionFilter(query, collection));
            }
            return xhr;
        },

        findByQuery: function(query){
            var xhr = $.Deferred(),
                src = this.options.src;
            if (_.isArray(src)) {
                xhr.resolve(this.__findInArray(query, src));
            } else if (src instanceof Collection) {
                this.__findInCollection(query, src).done(xhr.resolve);
            } else {
                src.apply(this, arguments).done(xhr.resolve);
            }
            return xhr;
        },

        setSource: function(src) {
            this.options.src = src;
        },

        setSelectedValue: function(event, value){
            this.__value = (_.isObject(value))? value[this.options.idKey] : value;
            this.$el.trigger("field:changed", this.getValue());
        },

        getValue: function(){
            var value = _.isUndefined(this.__value)? "" : this.__value;
            if(value !== "") {
                if(this.options.src instanceof Collection){
                    return this.options.src.get(value);
                }
                else if(_.isArray(this.options.src)){
                    return this.options.src[value];
                }
            }
            return value;
        },

        setValue: function(value){
            this.setSelectedValue(null, value);
        },

        dropValue: function(){
            (this.$el.typeahead("val") === "") && (this.setValue(""));
        }

    }, {
        defaults: $.extend(true, {}, Field.defaults, {
            type: "text",
            idKey: "_id",
            displayKey: "name",
            initEvent: "view:moved",
            destroyEvent: "view:remove",
            listItemClass: "ac-item",
            minSize: 1,
            hint: false,
            maxItems: 10,
            attrs: {
                autocomplete: "off"
            },
            src: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
                'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
                'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
            ],
            comparator: function(query, item){
                return (new RegExp(query, 'i')).test(item);
            }
        })
    })
});