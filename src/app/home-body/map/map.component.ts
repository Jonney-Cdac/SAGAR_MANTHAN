import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Map, Overlay, View } from 'ol';
import FullScreen from 'ol/control/FullScreen';
import { toLonLat, transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Feature, { FeatureLike } from 'ol/Feature';
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
import {Heatmap as HeatmapLayer, Vector} from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
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
import { Geometry } from 'ol/geom';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  public VectorWindSpeed:any;
  public VectorshipLayer:any;
  public VectorHeatMapWind:any;
  public VectorWaveHeight:any;
  public VectorHeatMapWave:any;
  public VectorLayerIMD:any;
  public VectorHeatMapCurrentSpeed:any;
  public VectorLayerCurrentSpeed:any;
  button_click1:any = false;
  button_click2:any = false;
  button_click3:any = false;
  button_click4:any = false;
  button_click5:any = false;
  button_click6:any = false;
  button_click7:any = false;
  button_click8:any = false;
 




  public markerSource = new VectorSource();
  public iconFeature: any;
  public markerSourceWindSpeed = new VectorSource();
  public iconFeatureWindSpeed: any;
  public markerSourceHeatMapWind : any;
  public iconFeatureHeatMapWind: any;
  public markerSourceWaveHeight = new VectorSource();
  public iconFeatureWaveHeight: any;
  public markerSourceHeatMapWave : any;
  public iconFeatureHeatMapWave: any;
  public markerSourceCurrentSpeed = new VectorSource();  
  public iconFeatureCurrentSpeed: any;
  public markerSourceHeatMapCurrent : any;
  public iconFeatureHeatMapCurrent: any;
  public shipSource = new VectorSource();

  // public markerStyle = new Style({
  //   image: new Icon({
  //     anchorXUnits: 'fraction',
  //     anchorYUnits: 'pixels',
  //     color: '#ffcd46',
  //     src: 'https://miro.medium.com/fit/c/20/20/1*cXyewOihHeBJGuwrzpTlQA.jpeg',
  //   }),
  // });

  
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

  //Ship Data 
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



this.VectorshipLayer = new VectorLayer({
		source: this.shipSource,
    visible:false,
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



     // map.addControl(new FullScreen());

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
// const vector = new ol.layer.Heatmap({
//   source: new ol.source.Vector({
      
//   }),
//   blur: parseInt(100, 10),
//   radius: 10,
//   weight: function (feature) {
//       magnitude = parseFloat(feature.get('magnitude'));
//       return (magnitude / 25);
//   },
// });

this.markerSourceHeatMapWind = new VectorSource();
 var magnitude;
 this.VectorHeatMapWind = new HeatmapLayer({
       source : this.markerSourceHeatMapWind,
       visible:false,
//          url: 'data/kml/2012_Earthquakes_Mag5.kml',
//                  format: new KML({
//                    extractStyles: false,
//                  }),
// }),
       blur: parseInt("100", 10),
    radius: 10,//parseInt(7, 10),
  weight: function (feature:any) {
        
        magnitude = parseFloat(feature.get('magnitude'));
        return (magnitude / 25);
    },
});



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


var dict:any = {
  "N": 0, "NNE": 1, "NE": 2, "ENE": 3, "E": 4, "ESE": 5, "SE": 6, "SSE": 7, "S": 8, "SSW": 9, "SW": 10, "WSW": 11, "W": 12, "WNW": 13, "NW": 14, "NNW": 15
};

this.VectorWindSpeed = new VectorLayer({
  source: this.markerSourceWindSpeed,
  visible:false,
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

//WindDirectionData	
var winddata;
fetch('/assets/forecast.json').then(res => res.json())
   .then(jsonData => {
     winddata = jsonData;
   for(var i=0;i<winddata.length;i++){
   try{
console.log(winddata[i].currentdirection);
this.iconFeatureWindSpeed = new Feature({
  geometry: new Point(transform([winddata[i]["20km_lon"], winddata[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
  name: 'test' + i,
winddirection: winddata[i]["20km"][0].winddirection,
windspeed: winddata[i]["20km"][0].windspeed
});
this.markerSourceWindSpeed.addFeature(this.iconFeatureWindSpeed);

this.iconFeatureWindSpeed = new Feature({
  geometry: new Point(transform([winddata[i]["50km_lon"], winddata[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
  name: 'test' + i,
winddirection: winddata[i]["50km"][0].winddirection,
windspeed: winddata[i]["50km"][0].windspeed
});
this.markerSourceWindSpeed.addFeature(this.iconFeatureWindSpeed);

this.iconFeatureWindSpeed = new Feature({
  geometry: new Point(transform([winddata[i]["100km_lon"], winddata[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
  name: 'test' + i,
winddirection: winddata[i]["100km"][0].winddirection,
windspeed: winddata[i]["100km"][0].windspeed
});
this.markerSourceWindSpeed.addFeature(this.iconFeatureWindSpeed);
   }
   catch{}
//HeatMap

try{

this.iconFeatureHeatMapWind = new Feature({
  geometry: new Point(transform([winddata[i]["20km_lon"], winddata[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
  name:'test',
magnitude:winddata[i]["20km"][0].windspeed
});
this.markerSourceHeatMapWind.addFeature(this.iconFeatureHeatMapWind);

this.iconFeatureHeatMapWind = new Feature({
  geometry: new Point(transform([winddata[i]["50km_lon"], winddata[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
  name:'test',
magnitude:winddata[i]["50km"][0].windspeed
});
this.markerSourceHeatMapWind.addFeature(this.iconFeatureHeatMapWind)

this.iconFeatureHeatMapWind = new Feature({
  geometry: new Point(transform([winddata[i]["100km_lon"], winddata[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
  name:'test',
magnitude:winddata[i]["100km"][0].windspeed
});
this.markerSourceHeatMapWind.addFeature(this.iconFeatureHeatMapWind);
}


catch{}

}
   
});
 





//Wave Height


this.markerSourceHeatMapWave = new VectorSource();
 var magnitudeWave;
  this.VectorHeatMapWave = new HeatmapLayer({
       source : this.markerSourceHeatMapWave,
       visible:false,
//          url: 'data/kml/2012_Earthquakes_Mag5.kml',
//                  format: new KML({
//                    extractStyles: false,
//                  }),
// }),
       blur: parseInt("100", 10),
    radius: 10,//parseInt(7, 10),
  weight: function (feature:any) {
        
        magnitudeWave = parseFloat(feature.get('magnitudeWave'));
        return (magnitudeWave / 25);
    },
});



this.VectorWaveHeight = new VectorLayer({
  source: this.markerSourceWaveHeight,
  visible:false,                             
  //style: ....                        
});                    
   

var wavedata;
fetch('/assets/forecast.json').then(res => res.json())
   .then(jsonData => {
     wavedata = jsonData;
for (var i = 0; i < wavedata.length; i++) {
try{
  this.iconFeatureWaveHeight = new Feature({
      geometry: new Point(transform([wavedata[i].flc_lon, wavedata[i].flc_lat], "EPSG:4326", "EPSG:3857")),
      name: 'test'
  });
  this.markerSourceWaveHeight.addFeature(this.iconFeatureWaveHeight);
  
  this.iconFeatureWaveHeight = new Feature({
      geometry: new Point(transform([wavedata[i]["20km_lon"], wavedata[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
      name: 'test'
  });
  this.markerSourceWaveHeight.addFeature(this.iconFeatureWaveHeight);
  
  this.iconFeatureWaveHeight = new Feature({
      geometry: new Point(transform([wavedata[i]["50km_lon"], wavedata[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
      name: 'test'
  });
  this.markerSourceWaveHeight.addFeature(this.iconFeatureWaveHeight);
  
  this.iconFeatureWaveHeight = new Feature({
      geometry: new Point(transform([wavedata[i]["100km_lon"], wavedata[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
      name: 'test'
  });
  this.markerSourceWaveHeight.addFeature(this.iconFeatureWaveHeight);
}
  catch{}
  //Heatmap
  try {
      this.iconFeatureHeatMapWave = new Feature({
          geometry: new Point(transform([wavedata[i]["20km_lon"], wavedata[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
          name: 'test',
          magnitudeWave: wavedata[i]["20km"][0].waveheight
      });
      this.markerSourceHeatMapWave.addFeature(this.iconFeatureHeatMapWave);


      this.iconFeatureHeatMapWave = new Feature({
          geometry: new Point(transform([wavedata[i]["50km_lon"], wavedata[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
          name: 'test',
          magnitudeWave: wavedata[i]["50km"][0].waveheight
      });
      this.markerSourceHeatMapWave.addFeature(this.iconFeatureHeatMapWave);
      

      this.iconFeatureHeatMapWave = new Feature({
          geometry: new Point(transform([wavedata[i]["100km_lon"], wavedata[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
          name: 'test',
          magnitudeWave: wavedata[i]["100km"][0].waveheight
      });
      this.markerSourceHeatMapWave.addFeature(this.iconFeatureHeatMapWave);
  
   } 
   catch {}
   
  }
  
});


//IMD


this.VectorLayerIMD = new VectorLayer({
  source: new VectorSource({
      url: '/assets/final16.geojson',
      format: new GeoJSON()
  }),
  visible:false,
  
  //title:'VectorLayer3',
  style:
   function(feature:any){ 
    if(feature.get('id') == '1')
   return new Style({
      fill:fillStyle1,
  });
  else if(feature.get('id')=='2')
  return new Style({
      fill:fillStyle2,
  })

  else if(feature.get('id')=='3')
  return new Style({
      fill:fillStyle3,
  })

  else if(feature.get('id')=='4')
  return new Style({
      fill:fillStyle4,
  })

  else if(feature.get('id')=='5')
  return new Style({
      fill:fillStyle5,
  })
  
  else if(feature.get('id')=='6')
  return new Style({
      fill:fillStyle6,
  })

  return new Style({
    fill:fillStyle6,
})

}

})
const fillStyle1= new Fill({
  color: [255,0,0,0.2]
})

const fillStyle2= new Fill({
  color: [255,0,0,0.2]
})

const fillStyle3= new Fill({
  color: [255,0,0,0.2]
})

const fillStyle4= new Fill({
  color: [255,0,0,0.2]
})

const fillStyle5= new Fill({
  color: [255,0,0,0.2]
})

const fillStyle6= new Fill({
  color: [255,0,0,0.2]
})
 








//Current Speed And Current Direction

//var i = 0;
        //var content = document.getElementById('popup-content');


        this.markerSourceHeatMapCurrent = new VectorSource();
        var magnitudeCurrent;
         this.VectorHeatMapCurrentSpeed = new HeatmapLayer({
              source : this.markerSourceHeatMapCurrent,
              visible:false,
       //          url: 'data/kml/2012_Earthquakes_Mag5.kml',
       //                  format: new KML({
       //                    extractStyles: false,
       //                  }),
       // }),   
              blur: parseInt("100", 10),
           radius: 10,//parseInt(7, 10),
         weight: function (feature:any) {
               
          magnitudeCurrent = parseFloat(feature.get('magnitudeCurrent'));
               return (magnitudeCurrent / 25);
           },
       });
       

         //var i = 0;
        //var content:any = document.getElementById('popup-content');
        const shaft1:any = new RegularShape({
            points: 2,
            radius: 5,
            rotateWithView: true,
        });

        const head1:any = new RegularShape({
            points: 3,
            radius: 5,
            rotateWithView: true,
        });

         const styles1 = [new Style({ image: shaft1 }), new Style({ image: head1 })];

        var dict1:any = {
            "N": 0, "NNE": 1, "NE": 2, "ENE": 3, "E": 4, "ESE": 5, "SE": 6, "SSE": 7, "S": 8, "SSW": 9, "SW": 10, "WSW": 11, "W": 12, "WNW": 13, "NW": 14, "NNW": 15
        };


        this.VectorLayerCurrentSpeed = new VectorLayer({
            source: this.markerSourceCurrentSpeed,
            visible:false,
            style: function (feature) {

                var direction = feature.get('currentdirection');
                //var speed = feature.get('currentspeed') * 0.036;
                var speed = feature.get('currentspeed');
                //var speed = 50;

                var deg = dict1[direction] * 22.5;
                console.log("Degree :" + deg + " Dir :" + direction);
                const angle = (deg * Math.PI) / 180;
                const scale = speed / 40;
                if (speed >= 1 && speed <= 50) 
                {
                    shaft1.setStroke(new Stroke({
                        width: 2,
                         //color: '#9ACD32',
                         color: 'Brown',
                        
                    }));
                    head1.setFill(
                        new Fill({
                            //color: '#9ACD32',
                            color: 'Brown',

                        }));

                }
                if(speed >50 && speed <= 100) 
                {
                    shaft1.setStroke(new Stroke({
                        width: 2,
                        color: '#87CEFA',
                    }));
                    head1.setFill(
                        new Fill({
                            color: '#87CEFA',
                        }));
                }

                if(speed >100 && speed <= 150) 
                {
                    shaft1.setStroke(new Stroke({
                        width: 2,
                        color: 'blue' ,
                    }));
                    head1.setFill(
                        new Fill({
                            color: 'blue',
                        }));
                }

                if(speed >150 && speed <= 200) 
                {
                    shaft1.setStroke(new Stroke({
                        width: 2,
                        color: '#DB7093' ,
                    }));
                    head1.setFill(
                        new Fill({
                            color: '#DB7093',
                        }));
                }

                if(speed>200)
                {
                    shaft1.setStroke(new Stroke({
                        width: 2,
                        color: '#DC143C' ,
                    }));
                    head1.setFill(
                        new Fill({
                            color: '#DC143C',
                        }));
                }
                

                //const scale = speed / 50;
                shaft1.setScale([1,scale]);
                shaft1.setRotation(angle);
                head1.setDisplacement([
                    0,
                    head1.getRadius() / 2 + shaft1.getRadius() * scale,
                ]);

                head1.setRotation(angle);
                return styles1;
            }
        });


              
         
       
      //  var escape = document.createElement('textarea');

/*
        function qualifyURL(url) {
            let a = document.createElement('a');
            a.href = url;
            return a.href;
        }

        function toggleVisibility(id, key, on, off, set) {
            let el = document.getElementById(id);
            let style = el.currentStyle || window.getComputedStyle(el);
            if (set && style[key] === set) return; // do not change, if already set
            if (style[key] === on) {
                el.style[key] = off;
            } else {
                el.style[key] = on;
            }
        }



        function toggleCoordFormat() {
            coord_fmt++;
            if (coord_fmt > 2) coord_fmt = 0;
        }

        function coordinateFormat(coord) {
            var coo = [coord[0], coord[1]];
            while (coo[0] > 180) coo[0] -= 360;
            while (coo[0] < -180) coo[0] += 360;

            return coord_fmt == 2
                ? degToDMS(coo[1], 1) + " " + degToDMS(coo[0], 0)
                : coord_fmt
                    ? degToMin(coo[1], 1) + " " + degToMin(coo[0], 0)
                    : degToDeg(coo[1], 1) + " " + degToDeg(coo[0], 0);
        }

        function toggleScaleUnit() {
            let avail = ['degrees', 'imperial', 'nautical', 'metric']; // 'us' also available but same as 'imperial'
            for (i = 0; i < avail.length; i++) {
                if (scaleLineControl.getUnits() === avail[i]) {
                    i++;
                    if (i >= avail.length) i = 0;
                    scaleLineControl.setUnits(avail[i]);
                    break;
                }
            }
        }

        var coord_fmt = 0; // 0=DEG, 1=MIN, 2=DMS
        var mousePositionControl = new ol.control.MousePosition({
            "coordinateFormat": coordinateFormat, // function that takes a ol.Coordinate and returns a string representation
            "projection": "EPSG:4326", // WGS84 [lon,lat]
            "target": document.getElementById("controls-coord"), className: "mouse-position-inner", // do not show in map but in spacific control
            "undefinedHTML": "click to change format"
        });
        var scaleLineControl = new ol.control.ScaleLine({
            "geodesic": true, // display "real" scale of map center
            "minWidth": 100, // default 64
            "units": "nautical", // use naut. miles as default
            "target": document.getElementById("controls-scale"), className: "scale-line-inner" // do not show in map but in specific control
        });

        

        // Popup showing the position the user clicked
       var container = document.getElementById('popup');
        var popup = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        map.addOverlay(popup);

        // Add a pointermove handler to the map to render the popup.
        map.on('pointermove', function (evt) {
            var feature = map.forEachFeatureAtPixel(evt.pixel, function (feat, layer) {
                return feat;
            }
            );

            if (feature && feature.get('type') == 'Point') {
                var coordinate = evt.coordinate;    //default projection is EPSG:3857 you may want to use ol.proj.transform

                content.innerHTML = feature.get('desc');
                popup.setPosition(coordinate);
            }
            else {
                popup.setPosition(undefined);

            }
        });
*/


var currentdata;
fetch('/assets/forecast.json').then(res => res.json())
   .then(jsonData => {
    currentdata = jsonData;
        for (var i = 0; i < currentdata.length; i++) {
            try {
                this.iconFeatureCurrentSpeed = new Feature({
                    geometry: new Point(transform([currentdata[i]["20km_lon"], currentdata[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
                    name: 'test' + i,
                    currentdirection: currentdata[i]["20km"][0].currentdirection,
                    currentspeed: currentdata[i]["20km"][0].currentspeed,
                    type: 'Point',
                    desc: '<pre> <b>Waypoint Details </b> ' + '<br>' + 'Current-speed : ' + currentdata[i]["20km"][0].currentspeed + '<br>currentdirection: ' + currentdata[i]["20km"][0].currentdirection + '</pre>'
                    
                });
                this.markerSourceCurrentSpeed.addFeature(this.iconFeatureCurrentSpeed);

                this.iconFeatureCurrentSpeed = new Feature({
                    geometry: new Point(transform([currentdata[i]["50km_lon"], currentdata[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
                    name: 'test' + i,
                    currentdirection: currentdata[i]["50km"][0].currentdirection,
                    currentspeed: currentdata[i]["50km"][0].currentspeed,
                    type: 'Point',
                    desc: '<pre> <b>Waypoint Details </b> ' + '<br>' + 'Current-speed : ' + currentdata[i]["50km"][0].currentspeed + '<br>currentdirection: ' + currentdata[i]["50km"][0].currentdirection + '</pre>'
                });
                this.markerSourceCurrentSpeed.addFeature(this.iconFeatureCurrentSpeed);

                this.iconFeatureCurrentSpeed = new Feature({
                    geometry: new Point(transform([currentdata[i]["100km_lon"], currentdata[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
                    name: 'test' + i,
                    currentdirection: currentdata[i]["100km"][0].currentdirection,
                    currentspeed: currentdata[i]["100km"][0].currentspeed,
                    type: 'Point',
                    desc: '<pre> <b>Waypoint Details </b> ' + '<br>' + 'Current-speed : ' + currentdata[i]["100km"][0].currentspeed + '<br>currentdirection: ' + currentdata[i]["100km"][0].currentdirection + '</pre>'
                });
                this.markerSourceCurrentSpeed.addFeature(this.iconFeatureCurrentSpeed);
                 }catch{}   

                // Heat map
                 try{
                  
                  this.iconFeatureHeatMapCurrent = new Feature({
                    geometry: new Point(transform([currentdata[i]["20km_lon"], currentdata[i]["20km_lat"]], "EPSG:4326", "EPSG:3857")),
                    name: 'test',
                    magnitudeCurrent: currentdata[i]["20km"][0].currentspeed
                });
                this.markerSourceHeatMapCurrent.addFeature(this.iconFeatureHeatMapCurrent);

                this.iconFeatureHeatMapCurrent = new Feature({
                    geometry: new Point(transform([currentdata[i]["50km_lon"], currentdata[i]["50km_lat"]], "EPSG:4326", "EPSG:3857")),
                    name: 'test',
                    magnitudeCurrent: currentdata[i]["50km"][0].currentspeed
                });
                this.markerSourceHeatMapCurrent.addFeature(this.iconFeatureHeatMapCurrent);
                this.iconFeatureHeatMapCurrent = new Feature({
                    geometry: new Point(transform([currentdata[i]["100km_lon"], currentdata[i]["100km_lat"]], "EPSG:4326", "EPSG:3857")),
                    name: 'test',
                    magnitudeCurrent: currentdata[i]["100km"][0].currentspeed
                });
                this.markerSourceHeatMapCurrent.addFeature(this.iconFeatureHeatMapCurrent);

            } catch {}
        }

      });


   



    //All Layers 

      map.addLayer(this.VectorshipLayer);
      map.addLayer(this.VectorWindSpeed);
      map.addLayer(this.VectorHeatMapWind);
      map.addLayer(this.VectorWaveHeight);
      map.addLayer(this.VectorHeatMapWave);
      map.addLayer(this.VectorLayerIMD);
      map.addLayer(this.VectorLayerCurrentSpeed);
      map.addLayer(this.VectorHeatMapCurrentSpeed);






      

}

//On Button Event Function

ShipLayer(){
  if(this.button_click1){
  this.VectorshipLayer.setVisible(true);
  console.log("shiplayer true");
  }
  else{
  this.VectorshipLayer.setVisible(false);
  console.log("shiplayer false");
  }
}

  
  WindSpeed() {
    if(this.button_click2){
      this.VectorWindSpeed.setVisible(true);
      
      }
      else{
        this.VectorWindSpeed.setVisible(false);
              }
    } 

    
  HeatMapWind() {
      if(this.button_click3){
        this.VectorHeatMapWind.setVisible(true);
        
        }
        else{
          this.VectorHeatMapWind.setVisible(false);
                  }
      
    } 
    
    WaveHeight() {
      if(this.button_click4){
        this.VectorWaveHeight.setVisible(true);
        
        }
        else{
          this.VectorWaveHeight.setVisible(false);
                  }
    } 

    HeatMapWave() {
      if(this.button_click5){
        this.VectorHeatMapWave.setVisible(true);
        
        }
        else{
          this.VectorHeatMapWave.setVisible(false);
                  }
    } 

    IMD() {
      if(this.button_click6){
        this.VectorLayerIMD.setVisible(true);
        
        }
        else{
          this.VectorLayerIMD.setVisible(false);
           }
    } 
 
    HeatMapCurrentSpeed() {
      if(this.button_click7){
        this.VectorHeatMapCurrentSpeed.setVisible(true);
        
        }
        else{
          this.VectorHeatMapCurrentSpeed.setVisible(false);
           }
      
    } 
 
    CurrentSpeed() {
      if(this.button_click8){
        this.VectorLayerCurrentSpeed.setVisible(true);
        
        }
        else{
          this.VectorLayerCurrentSpeed.setVisible(false);
        }
     
    } 
 






}




