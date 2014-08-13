/**
 * Created by Mantsevich on 26.07.2014.
 */
define(["underscore"], function (_) {
    return {
        patterns: {
            __defaults: {},
            login: {
                required: true,
                minsize: 3
            },
            password: {
                required: true,
                minsize: 5,
                maxsize: 16
            },
            name:{
                required: true,
                minsize:4,
                maxsize: 40,
                name: true
            },
            email:{
                required: true,
                minsize: 5,
                email: true
            },
            emailExadel:{
                required: true,
                minsize: 5,
                emailExadel: true
            },
            fieldName: {
                required: true,
                minsize: 2
            },
            studentChange:{
                requiredRadio: true
            },
            textField: {
                required: true,
                minsize: 2
            },
            radioChoose: {
                required: true,
                radioChoose: true
            },
            checkField: {
                requiredRadio: true,
                minsize: 2
            },
            fieldType: {
                requiredRadio: true
            },
            fieldLook: {
                requiredRadio: true
            },
            chosen: {
                minsize: 1,
                required: true
            },
            ids: {
                radioChoose: true,
                required: true
            },
            required:{
                required: true
            },
            phone:{
                required: true,
                phoneNumber: true
            },
            skype:{
                required: true,
                skypeField:true
            },
            university:{
                required: true,
                univer: true
            },

            grade:{
                gradeLook: true
            },
            date:{
                dateLook: true
            },
            futureWorkHours:{
                futureWork: true
            }

        },

        __processRules: function (rules) {
            if (_.isString(rules)) {
                return this.patterns[rules] || {};
            }
            var result = _.cloneDeep(this.patterns[rules.pattern || "__defaults"]);
            _.assign(result, rules);
            delete result.pattern;
            return result;
        },

        check: function (value, rules, label) {
            var self = this,
                verificationResult = true;
            label = label || "";
            if (!rules) {
                return true;
            }
            rules = this.__processRules(rules);
            _.all(rules, function (ruleValue, ruleName) {
                ruleName = "$" + ruleName;
                if (_.isFunction(self[ruleName])) {
                    verificationResult = self[ruleName](value, ruleValue, label);
                    return (verificationResult === true)? true : false;
                } else {
                    return true;
                }
            });
            return verificationResult;
        },

        // Проверка на обязательность
        $required: function(value, rule, name){
            return (!_.isUndefined(value) && !_.isNull(value) && value.trim() !== "")? true : "Field "+name+" are required.";
        },
        $requiredRadio: function(value, rule, name){
            debugger;

            return (value !== undefined)? true : "Field "+name+" are required.";
        },
        $condition: function(){
            return true;
        },
        // Проверка на тип email
        $email: function(value, rule, name){
            return (this.$equal(value, '^[a-zA-Z0-9_-]+[a-zA-Z0-9_-][a-zA-Z0-9_-]@(?:[a-z0-9]+[-a-z0-9]*\\.){1,3}[a-z]{2,9}$', name) === true)? true : "Field "+name+" must be email.";
        },
        // Проверка на полное соответствие регулярному выражению. Регулярное выражение передается в виде строки
        $equal: function(value, rule, name){
            return (_.first(value.match(new RegExp(rule,'ig'))) === value)? true : "Field "+name+" has invalid format.";
        },
        // Проверить является ли значение числом
        $number: function(value, rule, name){
            var number = parseInt(value,10);
            return (_.isNumber(number) && !_.isNaN(number) && number.toString()===value)? true : "Field "+name+" must be number.";
        },
        // Краткая форма equal.
        $only: function(value, rule, name){
            var reg = '',
                error = "Field "+name+" has invalid format.";
            switch (rule){
                case 'digits':
                    reg = '\\d*';
                    error = "Field "+name+" can contain only digits.";
                    break;
                default:
                    return true;
                    break;
            }
            return (this.$equal(value, reg, name) === true)? true : error;
        },
        // Точная длина поля.
        $size: function(value, rule, name){
            return (value.length === rule)? true : "Length of the field "+name+" must be equal "+rule ;
        },
        $minsize: function(value, rule, name){
            return (value.length >= rule)? true : "Length of the field "+name+" must be no less than "+rule ;
        },
        $maxsize: function(value, rule, name){
            return (value.length <= rule)? true : "Length of the field "+name+" must be no more than "+rule ;
        },
        // проверка является ли строка именем и фамилией
        $name: function(value, rule, name){
            return (this.$equal(value, '[a-z]+[\\ ][a-z]+', name) === true)? true: "Field "+name+" must be first name and last name.";
        },
        //проверка email на домен exadel.com
        $emailExadel: function(value, rule, name){
            return (this.$equal(value,'^[a-z0-9]+[-\\._a-z0-9][a-z0-9]@exadel.com$', name)=== true)? true: "Field "+name+" must be youremail@exadel.com";
        },

        $radioChoose: function(value, rule, name){
            return (this.$equal(value,'([a-zA-Z_0-9]*\\=[a-zA-Z_0-9]*\\;\\s){1,}', name)=== true)? true: "Field "+name+" must be Index1=Name1;...";
        },

        $phoneNumber: function(value, rule, name){
            return (this.$equal(value,'(\\+?[0-9]{3})?\\ ?\\-?\\ ?\\(?\\ ?([0-9]{2})?\\ ?\\)?\\ ?\\-?[0-9]{3}\\ ?\\-?\\ ?[0-9]{2}\\ ?\\-?\\ ?[0-9]{2}', name)=== true)? true: "Field "+name+" must be +123456789012";
        },
        $skypeField: function(value, rule, name){
            return (this.$equal(value,'^[a-zA-Z][a-zA-Z0-9_-]{5,31}', name)=== true)? true: "Field "+name+" must be must be between 6-32 characters, start with a letter and contain only letters and numbers (no spaces or special characters).";
        },
        $univer: function(value, rule, name){
            return (this.$equal(value,'[a-zA-Z ]{1,30}', name)=== true)? true: "Field "+name+" must be must be between 6-32 characters, start with a letter and contain only letters and spaces";
        },
        $gradeLook: function(value, rule, name){
            return (this.$equal(value,'[0-9,]{1,3}', name)=== true)? true: "Field "+name+" must be must be a number";
        },
        $dateLook: function(value, rule, name){
            return (this.$equal(value,'[0-9]{2}\\.[0-9]{2}\\.[0-9]{4}', name)=== true)? true: "Field "+name+" must be XX.XX.XXXX";
        },
        $futureWork: function(value, rule, name){
            return (this.$equal(value,'[0-9]{2}\\ [0-9]{2}\\.[0-9]{2}\\.[0-9]{4}', name)=== true)? true: "Field "+name+" must be XX XX.XX.XXXX";
        }
    }
});