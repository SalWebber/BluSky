require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer","esri/layers/TileLayer", "esri/layers/MapImageLayer", "esri/symbols/SimpleLineSymbol",
    "esri/renderers/SimpleRenderer", "esri/widgets/Legend", "esri/widgets/LayerList", "esri/widgets/Search", "esri/tasks/Locator", "esri/PopupTemplate", "dojo/domReady!"],
    function (Map, MapView, FeatureLayer, TileLayer, MapImageLayer, SimpleLineSymbol, SimpleRenderer, Legend, LayerList, Search, Locator, PopupTemplate) {
    //Code starts here
    //set up the map's configuration
    var mapConfig = {
        basemap: "dark-gray",
        layer: [MapIMGlyr]
    };
    //Create a new map
    var SalMap = new Map(mapConfig);

    //Set up the view's configuration
    var viewConfig = {
        container: "viewDiv",
        map: SalMap, //refers to the map made in line 8
        zoom: 13,
        center: [-118.2438934, 34.058481] //long, lat
    };
    //create a MapView for 2D viewing
    var myView = new MapView(viewConfig);

    //Create a symbol for the Freeway layer: THIS MUST be written before you add the feature layer itself,
    //otherwise your layer will load before it knows that it's supposed to look special.
    var freewaySymbol = {
        type: "simple-line",
        style: "solid",
        cap: "round",
        join: "round",
        width: 5,
        color: [150, 3, 44]
    };
     
    // Symbol for U.S. Highways
    var highwaySym = {        
        type: "simple-line", // autocasts as new SimpleLineSymbol() 
        color: "#4DC1BB",
        width: 4,
        style: "short-dash"
    };

    // Symbol for other major highways
    var otherSym = {        
        type: "simple-line", // autocasts as new SimpleLineSymbol()        
        color: "#EBEBEB",        
        width: 3,        
        style: "short-dot"
    };
    //Estbalish your renderer, which references the unique symbols you set up previously
    var freewayRenderer = {        
        type: "unique-value",
        defaultSymbol: otherSym,
        defaultLabel: "Other major roads",
        field: "CLASS", uniqueValueInfos: [
            {value: "I", symbol: freewaySymbol, label: "Interstates"},
            {value: "U", symbol: highwaySym, label: "Highways"}
            ]
    };

    //Set up a Popup Template
    var popTemplate = {
        title: "Major Highways",
        content: "<p> This is highway route {ROUTE_NUM} and it is {DIST_MILES} miles long.</p>.",
        fieldInfos: [{
            fieldName: "ROUTE_NUM"
        }]
    };

    //Create a tiled map service using TileLayer
    var TileLYR = new TileLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer",
        copyright: "ESRI", //Credit attributes to creators of Tile Layer
        opacity: .4 //Sets opacity of the layer at 40%
       });
  
    SalMap.add(TileLYR); //adds TileLayer to the map

    //add featureLayer
    var featureLYR = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Freeway_System/FeatureServer/2",
        popupTemplate: popTemplate, //adds the popup to the layer
        renderer: freewayRenderer //adds renderer to the feature layer
    });

    SalMap.add(featureLYR);  // adds the layer to the map

    //Create a dynamic map service using MapImageLayer
    var MapIMGlyr = new MapImageLayer({
        url: "http://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Hazards/MapServer",
        opacity: .3,
        title: "Los Angeles County Hazards"
    });
    //test
    SalMap.add(MapIMGlyr); //adds dynamic map image to the map   

    //Set up the legend, referencing your feature layer(s)
    var mapLegend = new Legend({
        view: myView, //view property needs to reference back to the mapView you made before
        layerInfos: [{
            layer: featureLYR,
            title: "Major Highways"
        }, {
            layer: MapIMGlyr,
            title: "L.A. Hazards"
        }]
    });

    myView.ui.add(mapLegend, "top-right"); //adds legend to the map; the objects here need to refer
    //back to the view and legend variables you created earlier

    var layerList = new LayerList({
        view: myView
    });
    // Adds widget below other elements in the top left corner of the view
    myView.ui.add(layerList, {
        position: "bottom-right"
    });
    
    //Establish a variable for your Search widget
    var searchWidget = new Search({
        view: myView,
        sources:[
            {       
              locator: new Locator({ url: "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
              singleLineFieldName: "SingleLine",
              name: "Custom Geocoding Service",
              localSearchOptions: {
                  minScale: 300000,
                  distance: 50000
               },
              placeholder: "Search Geocoder",
              maxResults: 3,
              maxSuggestions: 6,
              suggestionsEnabled: false,
              minSuggestCharacters: 0
            }, {
              featureLayer: featureLYR,
              searchFields: ["ROUTE_NUM"],
              displayField: "ROUTE_NUM",
              exactMatch: false,
              outFields: ["*"],
              name: "Route Search",
              placeholder: "example: C13",
              maxResults: 6,
              maxSuggestions: 6,
              suggestionsEnabled: true,
              minSuggestCharacters: 0,
              zoomScale: 10
            }]
    });

    // Adds the search widget below other elements in the top left corner of the view
    myView.ui.add(searchWidget, {
        position: "top-right",
        index: 2
    });

    //Code ends here
});