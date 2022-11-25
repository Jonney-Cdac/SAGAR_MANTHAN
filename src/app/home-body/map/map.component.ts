import { Component, AfterViewInit } from '@angular/core';
import { Map, View } from 'ol';
import FullScreen from 'ol/control/FullScreen';
import { toLonLat, transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import Modify from 'ol/interaction/Modify';
import Collection from 'ol/Collection';
import Translate from 'ol/interaction/Translate';
import Select from 'ol/interaction/Select';
import { pointerMove } from 'ol/events/condition';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';
import {RegularShape} from 'ol/style';
import {fromLonLat} from 'ol/proj';
import Stamen from 'ol/source/Stamen';
import {Heatmap, Vector} from 'ol/layer';
// import GeoJSON from 'ol/format/GeoJSON';
import MousePosition from 'ol/control/MousePosition';
import {ScaleLine, defaults as defaultControls} from 'ol/control';
// import ImageWMS from 'ol/source/ImageWMS';
import * as olTransform from 'ol/transform';
// import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import TileWMS from 'ol/source/TileWMS';
import {
  addCoordinateTransforms,
  addProjection,
} from 'ol/proj';
import { stringToGlsl } from 'ol/style/expressions';
//import * as data from "src/assets/forecast.json"
//import * as data from "src/assets/final16.geojson"
// import { marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  public markerSource = new VectorSource();
  public iconFeature: any;
  public markerSource1 = new VectorSource();
  public iconFeature1: any;
  public markerSource2 = new VectorSource();
  public iconFeature2: any;

  public shipSource = new VectorSource();

  public markerStyle = new Style({
    image: new Icon({
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      color: '#ffcd46',
      src: 'https://miro.medium.com/fit/c/20/20/1*cXyewOihHeBJGuwrzpTlQA.jpeg',
    }),
  });

  
  addMarker(lon:any, lat:any) {
    const iconFeature = new Feature({
      geometry: new Point(transform([lon, lat], 'EPSG:4326', 'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });

    this.markerSource.addFeature(iconFeature);

    return iconFeature;
  }

  ngAfterViewInit() {
    const initialState = {
      lng: 11,
      lat: 49,
      zoom: 9,
    };

    
      const vl = new VectorLayer({
        source: this.markerSource,
        style: this.markerStyle,
      });
      //ship data
//---------
//import ol.style.
var shipRespondNormalStyle = new Style({
 	 image: new Circle({		             
	    		 radius: 3,
	    		 stroke: new Stroke({
	    	     color: 'green',
	    	     width: 1
 		 }),
 		 fill: new Fill({
 			 color: 'green'
	          })
 	 }),
 	 text: new Text({
          offsetY: 20,	
          font: 'bold 12px Calibri,sans-serif',
          fill: new Fill({
            color: '#000'
          }),
          stroke: new Stroke({				              
         	color: 'yellow',
            width: 3
          })
        })
  });		


var shipNotRespondStyle = new Style({
	 image: new Circle({		             
 		 radius: 3,
 		 stroke: new Stroke({
 	     color: 'red',
 	     width: 1
		 }),
		 fill: new Fill({
			 color: 'red'
       })
	 }),
	 text: new Text({
      offsetY: 20,	
      font: 'bold 12px Calibri,sans-serif',
      fill: new Fill({
        color: '#000'
      }),
      stroke: new Stroke({			              
     	color: 'yellow',
        width: 3
      })
    })
});


function shipStyle(feature:any){
	var shipstatus = feature.get("vesselstatus");
	if(shipstatus =="Responding_Normally"){
		return shipRespondNormalStyle;
	}
			return shipNotRespondStyle;

}



const vectorshipLayer = new VectorLayer({
		source: this.shipSource,
  style:shipStyle
});


//---------
var map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      target: "map"
    });


      map.addLayer(vl);
	        map.addLayer(vectorshipLayer);

      map.addControl(new FullScreen());

      map.on('singleclick', (event) => {
        var lonLat = toLonLat(event.coordinate);

        //if (this.iconFeature) vl.getSource().removeFeature(this.iconFeature);

        this.iconFeature = this.addMarker(lonLat[0], lonLat[1]);

        var dragInteraction = new Modify({
          features: new Collection([this.iconFeature]),
         // style: null,
        });

        this.iconFeature.on('mouseover', function () {
          console.log('d');
        });

        this.iconFeature.on('change', function () {
          // console.log(
          //   'Feature Moved To:' + this.getGeometry().getCoordinates()
          // );
        });

        const translate = new Translate({
          features: new Collection([this.iconFeature]),
        });

        translate.on('translateend', (e) => {
          let lonLat = toLonLat(e.coordinate);
        });

        map.addInteraction(translate);

        const selected_feature = new Select({
          condition: pointerMove,
          style: new Style({
            image: new Icon(
              /** @type {olx.style.IconOptions} */ ({
                scale: 2,
              })
            ),
          }),
        });
        map.addInteraction(selected_feature);

        //map.addInteraction(dragInteraction);
      });
 //   });
 //ShipPosition	
 var shipdata;
 fetch('/assets/shipdata.json').then(res => res.json())
    .then(jsonData => {
      shipdata = jsonData;
	  for(var i=0;i<shipdata.length;i++){
		
			var iconFeature = new Feature({
        geometry: new Point(transform([shipdata[i].longitude, shipdata[i].latitude], "EPSG:4326", "EPSG:3857")),
        name:'test',
		vesselstatus:shipdata[i].vesselstatus,
		Text:'Ship'
		
    });
    this.shipSource.addFeature(iconFeature);
	  //  this.markerSource.addFeature(iconFeature);

	}
	  
    });
	

    

//WindSpeed
 

  const VectorLayer1 = new VectorLayer({
    source: this.markerSource1,
    //style: this.markerStyle,

    style: function (feature) {

      var direction = feature.get('winddirection');
              var speed = feature.get('windspeed');
              var deg = dict[direction] * 22.5;
              console.log("Degree :" + deg + " Dir :" + direction);
              const angle = (deg * Math.PI) / 180;
              const scale = speed / 10;
              shaft.setScale([1, scale]);
              shaft.setRotation(angle);
              head.setDisplacement([
                  0,
                  head.getRadius() / 2 + shaft.getRadius() * scale,
              ]);
   
              head.setRotation(angle);
           return styles;
       }
  });

/*
  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
    }),visible : false,

    style: function (feature) {

   var direction = feature.get('winddirection');
           var speed = feature.get('windspeed');
           var deg = dict[direction] * 22.5;
           console.log("Degree :" + deg + " Dir :" + direction);
           const angle = (deg * Math.PI) / 180;
           const scale = speed / 10;
           shaft.setScale([1, scale]);
           shaft.setRotation(angle);
           head.setDisplacement([
               0,
               head.getRadius() / 2 + shaft.getRadius() * scale,
           ]);

           head.setRotation(angle);
        return styles;
    }
});*/












  // const Vector = new Heatmap({
  //   source: this.markerSource2,
  //   //style: this.markerStyle,
  // });
/*
 var magnitude;
  const Vector1 = new Heatmap({
    source: new VectorSource({
        
    }),
    blur: parseInt("100", 10),
    radius: 10,//parseInt(7, 10),
    weight: function (feature:any) {
        
        magnitude = parseFloat(feature.get('magnitude'));
        return (magnitude / 25);
    },
});
*/







  const shaft:any = new RegularShape({
    points: 2,
    radius: 5,
    stroke: new Stroke({
        width: 2,
        color: 'black',
    }),
    rotateWithView: true,
});

const head:any = new RegularShape({
    points: 3,
    radius: 5,
    fill: new Fill({
        color: 'black',
    }),
    // displacement: [0,2,5],
    rotateWithView: true,
});

const styles = [new Style({ image: shaft }), new Style({ image: head })];


var dict = {
    "N": 0, "NNE": 1, "NE": 2, "ENE": 3, "E": 4, "ESE": 5, "SE": 6, "SSE": 7, "S": 8, "SSW": 9, "SW": 10, "WSW": 11, "W": 12, "WNW": 13, "NW": 14, "NNW": 15
};


map.addLayer(VectorLayer1);
//map.addLayer(Vector1);
//WindDirectionData	
var winddata;
fetch('/assets/forecast.json').then(res => res.json())
   .then(jsonData => {
     winddata = jsonData;
   for(var i=0;i<winddata.length;i++){
   try{
console.log(winddata[i].currentdirection);
this.iconFeature1 = new Feature({
  geometry: new Point(transform([winddata[i]["20km_lon"], winddata[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
  name: 'test' + i,
winddirection: winddata[i]["20km"][0].winddirection,
windspeed: winddata[i]["20km"][0].windspeed
});
this.markerSource1.addFeature(this.iconFeature1);

this.iconFeature1 = new Feature({
  geometry: new Point(transform([winddata[i]["50km_lon"], winddata[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
  name: 'test' + i,
winddirection: winddata[i]["50km"][0].winddirection,
windspeed: winddata[i]["50km"][0].windspeed
});
this.markerSource1.addFeature(this.iconFeature1);





this.iconFeature1 = new Feature({
  geometry: new Point(transform([winddata[i]["100km_lon"], winddata[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
  name: 'test' + i,
winddirection: winddata[i]["100km"][0].winddirection,
windspeed: winddata[i]["100km"][0].windspeed
});
this.markerSource1.addFeature(this.iconFeature1);
   }
   catch{}
/*
try{

this.iconFeature1 = new Feature({
  geometry: new Point(transform([winddata[i]["20km_lon"], winddata[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
  name:'test',
magnitude:winddata[i]["20km"][0].windspeed
});
this.Vector1.addFeature(this.iconFeature1);

this.iconFeature1 = new Feature({
  geometry: new Point(transform([winddata[i]["50km_lon"], winddata[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
  name:'test',
magnitude:winddata[i]["50km"][0].windspeed
});
Vector1.addFeature(this.iconFeature1);


this.markerSource2.addFeature(this.iconFeature1);
this.iconFeature1 = new Feature({
  geometry: new Point(transform([winddata[i]["100km_lon"], winddata[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
  name:'test',
magnitude:winddata[i]["100km"][0].windspeed
});
this.Vector1.getSource().addFeature(this.iconFeature1);
}
catch{}*/

}
   
});
 
/*
var features = [];
        console.info(data[0]["20km"][0]);
        for (var i = 0; i < data.length; i++) {
			try{
            iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([data[i]["20km_lon"], data[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
                name: 'test' + i,
				winddirection: data[i]["20km"][0].winddirection,
				windspeed: data[i]["20km"][0].windspeed
            });
            vectorLayer.getSource().addFeature(iconFeature);

            iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([data[i]["50km_lon"], data[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
                name: 'test' + i,
				winddirection: data[i]["50km"][0].winddirection,
				windspeed: data[i]["50km"][0].windspeed
            });
            vectorLayer.getSource().addFeature(iconFeature);

            iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([data[i]["100km_lon"], data[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
                name: 'test' + i,
				winddirection: data[i]["100km"][0].winddirection,
				windspeed: data[i]["100km"][0].windspeed
            });
            vectorLayer.getSource().addFeature(iconFeature);
			// }catch{}   
            
            // try{
iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([data[i]["20km_lon"], data[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
        name:'test',
		magnitude:data[i]["20km"][0].windspeed
    });
    vector.getSource().addFeature(iconFeature);

iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([data[i]["50km_lon"], data[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
        name:'test',
		magnitude:data[i]["50km"][0].windspeed
    });
    vector.getSource().addFeature(iconFeature);
iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([data[i]["100km_lon"], data[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
        name:'test',
		magnitude:data[i]["100km"][0].windspeed
    });
    vector.getSource().addFeature(iconFeature);

}catch{}
        }
*/














      }
}
