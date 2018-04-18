//require([modules, modules], function(callback, needs to mirror order of modules) {parameters});
require(["dojo/query", "dojo/ready", "dojo/on", "dojo/dom" ],
    function (query, ready, on, dom) {

        //Code goes in here, and will run after the REQUIRE function loads all modules.
        ready(function(){
            //this runs after the html and scripts have loaded
            stuffOnLoad();
            dom.byId("viewDiv").innerHTML = "Webpage loaded and ready to go.";
            //Adding an event handler. The ON function needs an object to interact with, an event to connect with,
            //and code that you want to run when that even happens.
            on(dom.byId("superButton"), "click", function () {
                //all code within the anonymous function goes here
                alert("Hey man, you're really pushing my buttons.");
            });
        });

        //you have declared a function
        function stuffOnLoad() {
            alert("Check it out. We're all set.")
        }
//Code stops here.

});
