/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 03.08.14
 * Time: 1:04
 * To change this template use File | Settings | File Templates.
 */
define("Collections/Interviews",["Collections/Base", "Models/Interview"], function(Collection, Interview){
    return Collection.extend({
        model: Interview,
        url: "/interviews"
    });
});