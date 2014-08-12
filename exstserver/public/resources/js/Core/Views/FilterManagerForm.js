/**
 * Created by Administrator on 06.08.2014.
 */
define(["Views/Form", "jquery"], function(Form, $){
    return Form.extend({
        events:{
            "keyup": "submit"
        },

        __sendData: function(data){
            return $.Deferred().resolve(data);
        }

    },{
        defaults: $.extend(true, {}, Form.defaults, {
            tpl: null
        })
    });
});