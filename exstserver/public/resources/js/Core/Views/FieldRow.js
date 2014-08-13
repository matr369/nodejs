define("Views/FieldRow",["Views/Base", "jquery"],function(Base, $){
    return Base.extend({},{
        defaults: $.extend(true, {}, Base.defaults,{
            tpl:'<tr><td>{%- data.field.get(\'name\') %}</td><td>{%- data.field.get(\'fieldType\') %}</td><td>{%- data.field.get(\'defaultValue\') %}</td><td>{%- data.field.get(\'fieldLook\') %}</td><td>{%- data.field.get(\'change\') %}</td><td>{%- data.field.get(\'optionsRadio\') %}</td><td><a><i data-id={%- data.field.get(\'id\') %} class="fa fa-times curs" alt=(\'Delete\')> </i></a></td></tr>'
})
});

});