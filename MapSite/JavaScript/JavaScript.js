//require([modules, modules], function(callback, needs to mirror order of modules) {parameters});
require(["dojo/query", "dojo/dom", "dojo/on", "esri/map", "esri/views/MapView", "esri/layers/FeatureLayer", "dojo/domReady!" ],
    function (query, dom, on, map, MapView, FeatureLayer, domReady) {

        //Code goes in here, and will run after the REQUIRE function loads all modules.

        //set up the map
        var map = new Map({
            basemap: "streets"
        });
        var view = new MapView({
            container: "viewDiv",
            map: map, //Reference to the map object created line 8
            zoom: 4, //Sets zoom lvl based on LOD (lvl of detail)
            center: [15,65] //Sets center POV using LONG/LAT
        });
    
    // points to the states layer in a service storing U.S. census data//
        var fl = new FeatureLayer({("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3");
        map.addLayer(FeatureLayer) //adds the layer to the map
    });

});
//Code stops here.

});
