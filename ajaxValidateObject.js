(function ($) {
    /**
     * 
     */
    var ajaxValidateObject = "ajax-validate-object";
    var ajaxValidateObjectSelector = "[" + ajaxValidateObject + "]";
    var ajaxValidateObjectEvent = "change";
    var ajaxValidateResultFunc = "ajaxValidateResultFunc";
    var regExValidate = {
        email: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$",
        username: "^",
        password: "/^[a-z0-9_-]{6,18}$/",
    }
    /**
     * اعتبار سنجی
     */
    $(ajaxValidateObjectSelector).on(ajaxValidateObjectEvent, function () {
        /**
         * شی جاری
         */
        var thisObject = $(this);
        /**
         * برسی می‌شود حتما مقداری وارد شده باشد
         */
        if (objectHasValue(thisObject.val()) == false) return;
        /**
         * اعتبار سنجی مقدار وارد شده
         */
        if (ajaxTypeIsValidate(thisObject.val(), thisObject.attr("ajax-type")) == false) {
            // نمایش خطا
            return;
        }

        /**
         * ارسال درخواست به سرور
         */
        sendObject($(this).attr(ajaxValidateObject), { obj: thisObject.val() },
            function (result) {
                // مقدار بازگشتی از سرور
                alert(result);
            });
    });
    /**
     * متد ارسال ابجکت
     * @param {} model 
     * @param {} data 
     * @param {} callBack 
     * @returns {} 
     */
    function sendObject(model, data, callBack) {
        jQuery.post(model, data, callBack);
    }
    /**
     * 
     */
    function ajaxTypeIsValidate(obj, type) {
        var selectedType = "^";
        switch (type) {
            case "username":
                selectedType = regExValidate.username;
                break;
            case "password":
                selectedType = regExValidate.password;
                break;
            case "email":
                selectedType = regExValidate.email;
                break;
            default:
                selectedType = "^";
                break;
        }
        return new RegExp(selectedType).test(obj);
    }
    /**
     * 
     */
    function objectHasValue(obj) {
        return obj != null && obj.trim() != "";
    }
} (jQuery));