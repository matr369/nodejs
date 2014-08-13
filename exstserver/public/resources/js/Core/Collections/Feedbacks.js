/**
 * Created with IntelliJ IDEA.
 * User: Mantsevich
 * Date: 03.08.14
 * Time: 1:04
 * To change this template use File | Settings | File Templates.
 */
define("Collections/Feedbacks",["Collections/Base"], function(Collection){
    return Collection.extend({
            url:"/feedbacks"
    });
});