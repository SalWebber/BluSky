require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "dojo/domReady!"], function (Map, MapView, FeatureLayer) {

    //Code STARTS here
    var myMapConfig = {basemap: "streets"};
    var map = new Map(myMapConfig)

    var viewConfig = {
        container: "viewDiv",
        map: map, //Refers to the map object created in line 4
        zoom: 4, //Zoom as determined by LOV (level of zoom)
        center: [15, 65] // longitude, latitude
    };
    var view = new MapView(viewConfig);


//All code STOPS here
});



