/**
 * Created by Administrator on 05.08.2014.
 */
define(["Backbone", "App", "jquery"], function(Backbone, App, $){
    var Config = App.Config.request;
    //Backbone.emulateHTTP = true;
    Backbone.ajax =  function(request){
        request.url = Config.restUrl + request.url;
        var xhr = $.Deferred(),
            success = request.success,
            error = request.error;
        delete request.success;
        delete request.error;
        $.ajax(request).done(function(data){
            if(Config.successStatuses.indexOf(data.status) > -1) {
                xhr.resolve(data.data);
            }
            else {
                xhr.reject(data.message);
            }
            })
            .fail(function(axhr, status, error){
                xhr.reject(error);
            });
        xhr.then(success, error);
        return xhr;
    }
});