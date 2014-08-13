/**
 * Created by Mantsevich on 17.07.2014.
 */
define("Core/Request", ["jquery", "App"], function($, App){

    var currentRequests = {};

    var Config = App.Config.request,
        defaults = {
            type: "POST"
        },

        /**
         * Constructor
         * @param params
         * @constructor
         */
        Request = function(params){
            // success, error - will run with all send call.
            this.options = _.defaults(params || {}, defaults);
        };

    Request.prototype = {

        /**
         * Send request with data
         * @param data
         * @returns {*}
         */
        send: function(data){

            var self = this,
                xhr = $.Deferred(),
                requestParams = $.extend(true, {}, this.options, { // add success :::???
                    data: data || {}
                }),
                uniqURL = requestParams.url + $.param(requestParams.data);

            if (!currentRequests[uniqURL]) {
                currentRequests[uniqURL] = xhr;
                $.ajax(requestParams).then(function(responce){
                    delete currentRequests[uniqURL];
                    if(responce["status"] == "fail"){
                        xhr.rejectWith(self, [error]);
                    }
                    else{
                        xhr.resolveWith(self, [responce]);
                    }
                }, function(error){
                    delete currentRequests[uniqURL];
                    //TODO: App.Error("");
                    xhr.rejectWith(self, [error]);
                });
                return xhr;
            } else {
                return currentRequests[uniqURL];
            }
        }

    };

    return Request;
});