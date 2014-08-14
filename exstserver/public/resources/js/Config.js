/**
 * Created by Mantsevich on 17.07.2014.
 */
define("Config", {
    validateBrowserFeatures: function(){
        return !!(window.localStorage && window.JSON && Function.prototype.bind);
    },
    invalidBrowserClass: "update-your-browser",
    readyClass: "app-ready",
    disableStorage: true,
    request: {
        restUrl: "/api",
        successStatuses: ["success"],
        failStatuses: ["error"]
    },
    pages: {
        titlePrefix: "Exadel Students - ",
        titleSuffix: "",
        containerForWrapper: "body",
        classForPageWrapper: "page-container"
    },
    spooler: {
        autoShow: true,
        showEvent: "loading:start",
        hideEvent: "loading:stop"
    },
    templates: {
        settings: {
            evaluate:    /\{%([\s\S]+?)%\}/g,
            interpolate: /\{%=([\s\S]+?)%\}/g,
            encode:      /\{%-([\s\S]+?)%\}/g,
            conditional: /\{%\?(\?)?\s*([\s\S]*?)\s*%\}/g
        },
        exportName: "data",
        clearCache: true,
        core: "core.html?v=4",
        folder: "resources/templates/",
        urlFormat: /(.+)\?v=(\d+)/
    },
    notification: {
        showOnError: true
    },
    routers: {
        list: [
            "Routes/Core",
            "Routes/Settings",
            "Routes/Employers",
            "Routes/Students",
            "Routes/Managers"
            /*,
            "Routes/StudentProfile",
            "Routes/Settings"*/
        ]
    },
    preloadModules: [
        "Views/Notification",
        "Views/Spooler",
        "Core/Request.Rest"
    ]
});