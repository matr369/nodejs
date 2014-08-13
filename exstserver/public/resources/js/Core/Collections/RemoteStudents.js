/**
 * Created by Administrator on 13.08.2014.
 */
define("Collections/RemoteStudents", ["Backbone", "Collections/Students", "jquery"], function(Backbone, Students, $){
   return function(filter){
        var xhr = $.Deferred();
        Backbone.ajax({
            url: "/students/find",
            type: "POST",
            data: filter
        }).done(function(result){
            var students = new Students(result);
            xhr.resolveWith(students);
        }).fail(xhr.reject);
        return xhr;
    };
});