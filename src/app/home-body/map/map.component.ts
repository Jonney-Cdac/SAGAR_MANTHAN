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
import { always, pointerMove } from 'ol/events/condition';
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
import { Graticule } from 'ol';
import LineString from 'ol/geom/LineString';
import {toStringHDMS} from 'ol/coordinate';
import DragPan from 'ol/interaction/DragPan';
import DragZoom from 'ol/interaction/DragZoom';
import ImageWMS from 'ol/source/ImageWMS';
import {Image as ImageLayer} from 'ol/layer';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
public map:any;






// ----------- -Rectangular Zoom --------------------------------------------

dragZoom = new DragZoom({
  condition: always
});

 toggleState = 0;
toggleRectZoom() {
  try{
    //$('#rectZoom').toggleClass("down");
      if( this.toggleState == 0) {
          this.map.addInteraction(this.dragZoom);
          this.toggleState = 1;
      }
      else {
          this.map.removeInteraction(this.dragZoom);
          this.toggleState = 0;
      }			
  }
  catch(err)
  {
    console.info('error in rectangle zoom: ' + err)
  }
}

// ------------ End of Rectangular Zoom

// ----------- for ZoomExtent --------------------------------------------

 zoomToExtent(){	
  try{
    var extent = this.shipSource.getExtent();
    this.map.getView().fit(extent, this.map.getSize());
  }
  catch(err)
  {
    console.info('error in zoom to extent: ' + err)
  }
}

// -----------end of ZoomExtent --------------------------------------------

// Styling of Grid when visible on map

public graticuleOn:any;
public graticuleOnStyle:any;
public graticuleOffStyle:any;


graticule(){	
this.graticuleOn = false;

this.graticuleOnStyle =  new Graticule({	      
    strokeStyle: new Stroke({
      color: 'rgba(255,120,0,0.9)',
      width: 2,
      lineDash: [0.5, 4]
    }),
    showLabels: true,	     
    latLabelPosition: 0.05,	      
    wrapX: false
  });

// Styling of Grid when not visible on map
this.graticuleOffStyle =  new Graticule({	    
    strokeStyle: new Stroke({
      color: 'rgba(255,120,0,0.0)',
      width: 0,
      lineDash: [0.1, 2]
    }),
    showLabels: true,	      
    latLabelPosition: 0.05,	     
    wrapX: false
  })

// for grid Line lables on load
this.graticuleOnStyle.setMap(null);
this.graticuleOffStyle.setMap(this.map);
}
horzGridOnMap(){
//try{
  //$('#horzGrid').toggleClass("down");
  if(this.graticuleOn==false)
  {     
    this.graticuleOffStyle.setMap(null);
    this.graticuleOnStyle.setMap(this.map);
    this.graticuleOn = true;
  }
  else
  {	
    this.graticuleOnStyle.setMap(null);
    this.graticuleOffStyle.setMap(this.map);				
    this.graticuleOn = false;
  }			
//}
//catch(err)
//{
//  console.info('error in horizontal toolbar Grid On Map: ' + err)
//}
}
// ----------- To Enable Pan --------------------------------------  	
enablePan(){
  /*try{
    //$('#enablePanButton').toggleClass("down");
  this.map.getInteractions().forEach(function(interaction:any) {
    if (interaction instanceof DragPan) {
      interaction.setActive(!interaction.getActive());
    }
  }, this);
  }
catch(err)
{
  console.info('error in enable pan: ' + err)
}*/
}
// ----------- End of Enable Pan --------------------------------------


  

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
this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new ImageLayer({
					source: new ImageWMS({
						params: { LAYERS: 'GIS-ENC-OFFSHORE', CSBOOL: '181', CSVALUE: ',,,,,2' },
						//url: 'https://wms.sevencs.com/?'
					})
				}),    
      ],
      target: "map"
    });


this.graticule();
     // map.addControl(new FullScreen());

      // map.on('singleclick', (event) => {
      //   var lonLat = toLonLat(event.coordinate);

      //   //if (this.iconFeature) vl.getSource().removeFeature(this.iconFeature);

      //   this.iconFeature = this.addMarker(lonLat[0], lonLat[1]);

      //   var dragInteraction = new Modify({
      //     features: new Collection([this.iconFeature]),
      //    // style: null,
      //   });

      //   this.iconFeature.on('mouseover', function () {
      //     console.log('d');
      //   });

      //   this.iconFeature.on('change', function () {
      //     // console.log(
      //     //   'Feature Moved To:' + this.getGeometry().getCoordinates()
      //     // );
      //   });

      //   const translate = new Translate({
      //     features: new Collection([this.iconFeature]),
      //   });

      //   translate.on('translateend', (e) => {
      //     let lonLat = toLonLat(e.coordinate);
      //   });

      //   map.addInteraction(translate);

      //   const selected_feature = new Select({
      //     condition: pointerMove,
      //     style: new Style({
      //       image: new Icon(
      //         /** @type {olx.style.IconOptions} */ ({
      //           scale: 2,
      //         })
      //       ),
      //     }),
      //   });
      //   map.addInteraction(selected_feature);

      //   //map.addInteraction(dragInteraction);
      // });
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
        Text:'Ship',
    vesselstatus:shipdata[i].vesselstatus,
    mmsi_no:shipdata[i].mmsi_no,
    timestamp1:shipdata[i].timestamp1,
		imo_no:shipdata[i].imo_no,
    ship_name:shipdata[i].ship_name,
    speed:shipdata[i].speed,
    course:shipdata[i].course,
    data_user_provider:shipdata[i].data_user_provider,

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

      this.map.addLayer(this.VectorshipLayer);
      this.map.addLayer(this.VectorWindSpeed);
      this.map.addLayer(this.VectorHeatMapWind);
      this.map.addLayer(this.VectorWaveHeight);
      this.map.addLayer(this.VectorHeatMapWave);
      this.map.addLayer(this.VectorLayerIMD);
      this.map.addLayer(this.VectorLayerCurrentSpeed);
      this.map.addLayer(this.VectorHeatMapCurrentSpeed);


      this.map.on('click', this.clickevtMap1 ); 

      

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
 











// ----------End of Left click on map event -------------------------------


clickevtMap1(evt:any) {

	function removeLayersFromMap(layerName:any,featureProperty:any,featurePropertyValue:any)	
	{
		try{
			var layersToRemove:any = [];
			  map.getLayers().forEach(function (layer:any) {
				  if (layer.get('name') != undefined && (layer.get('name')).match(layerName)) {		    	 
					  layer.getSource().clear();
					//@ts-ignore
					  layersToRemove.push(layer);		         
				  }
			  });
	
			  var len = layersToRemove.length;
			  for(var i = 0; i < len; i++) {
								  //@ts-ignore
	
				  var features = layersToRemove[i].getSource().getFeatures();
					  features.forEach(function(feature:any) {
				  
						if (feature.get(featureProperty) == featurePropertyValue)	      
						{	
											//@ts-ignore
							
							layersToRemove[i].getSource().removeFeature(feature);
						};				    	
					});
				
				  map.removeLayer(layersToRemove[i]);
			  }
		}
		catch(err)
		{
			console.info('error in removeLayersFromMap: ' + err)
		}
	}
	
var popupLineStyle = new Style({
	  stroke: new Stroke({
     color: 'darkred',
     width: 1.5
    })
 });

	var imoNoforPopup:any;
	// var previousDrawDistance = this.previousDrawDistance;
	// var currentDrawDistance = this.currentDrawDistance;
	// var cnt= this.cnt; 
	 //var dragPan = this.dragPan;
	 
	 //--------------------
	 //var ringRangeFlag=false;
	 //var pathProjectionStartFlag = false;
	//var distanceFlag=false;
	 //var surpicInteractionOnFlag=4;
	//var customPolygonInteractionFlag=false;
	 
	 //----------------------
	//var distanceFlag=false;
	//var countDrawDistance =0;
	//var messageIdForPopup;
	var map=evt.map;
	//	  try
	//	 {	 
		 
			 // $("#rightClickDiv").hide();
			  console.log(evt.coordinate);    	 
			  var geometryFeature = evt.map.forEachFeatureAtPixel(
					  evt.pixel, function(feature:any) { return feature;
				 });
			
			if(geometryFeature)
			{
				if (geometryFeature.getGeometry().getType() === 'Point')
				{	
					{			
										
					var clickedShipInfo = geometryFeature;
					var coordinate = evt.coordinate;
						
						//var hdms = coordinate.toStringHDMS(toLonLat(coordinate,'EPSG:4326'));
						
					imoNoforPopup = geometryFeature.get('message_id');	
					var id =geometryFeature.get('imo_no');
          var overlayId =id+'_popup';

												{						
							//clickedShipInfo.popupStatus=true;
					coordinate = geometryFeature.getGeometry().getCoordinates();
					var pointCordinates = toStringHDMS(toLonLat(geometryFeature.getGeometry().getCoordinates(),'EPSG:4326'));
					coordinate = geometryFeature.getGeometry().getCoordinates();
					var noSpaceStr = pointCordinates.replace(/\s/g, '');
					var index = noSpaceStr.indexOf("N");
							
							if(index==-1)
								index = noSpaceStr.indexOf("S");
							
							
							var orgTimeStamp = clickedShipInfo.get("timestamp1");
							console.log(orgTimeStamp);
							//if(currentShipState == 'Replay') //if(playFlag==true)
							//	orgTimeStamp = clickedShipInfo.fromTimestamp1;//toTimestamp1;
							
							var indexTime = (orgTimeStamp).indexOf("T");
							var indexPlus = (orgTimeStamp).indexOf("+");
							var date:any = new Date(Date.parse(orgTimeStamp));
							
							var dd:any = date.getDate();
							var mm:any = date.getMonth()+1; 
							var yyyy = date.getFullYear();
							
							var hr = date.getHours();
							var min = date.getMinutes();
							var sec = date.getSeconds();
						
							if(dd<10) 
							{
								dd='0'+dd;
							} 
				
							if(mm<10) 
							{
								mm='0'+mm;
							} 
							
							date =dd+'/'+  mm+'/'+ yyyy;
							var time = hr +":"+ min +":" + sec;						
							var featureToCompare;
							var flagCountryToCompare;
							var countryListIdsShips:any=[];
							
													
							var datauserCountry = null;
							
							
							
							
							if(featureToCompare == flagCountryToCompare)
							{
								var speedInfo = clickedShipInfo.speed;
								var courseInfo = clickedShipInfo.course;
								if(speedInfo!=null)
									speedInfo = speedInfo + " knots";
								if(courseInfo!=null)
									courseInfo = courseInfo + " deg";
								
								
								//--
								// for flag ship popup
								var output =  "<div onmousedown=\"return false\" class= \"popupFont\" id=\""+id+"-lat\">"+ (noSpaceStr.substring(0,index+1)).trim()+" </div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\" id=\""+id+"-lon\">"+ (noSpaceStr.substring(index+1,noSpaceStr.length)).trim()+"</div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\" id=\""+id+"-date\">"+ ((orgTimeStamp).substring(0,indexTime)).trim() +"</div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\" id=\""+id+"-time\">"+ ((orgTimeStamp).substring(indexTime+1,indexPlus)).trim() +"</div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("imo_no")) +" </div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("mmsi_no")) +" </div>" +						
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("ship_name")) +" </div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("speed")) +"</div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("course")) +"</div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("data_user_provider")) +" </div>"; // +
							}
							else
								{
								// for foreign ship popup
								//console.info("Foreign");
								output = "<div onmousedown=\"return false\" class= \"popupFont\" id=\""+id+"-lat\">"+ (noSpaceStr.substring(0,index+1)).trim()+" </div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\"id=\""+id+"-lon\">"+ (noSpaceStr.substring(index+1,noSpaceStr.length)).trim()+"</div>" +		
								"<div onmousedown=\"return false\" class= \"popupFont\" id=\""+id+"-date\">"+ ((orgTimeStamp).substring(0,indexTime)).trim() +"</div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\" id=\""+id+"-time\">"+ ((orgTimeStamp).substring(indexTime+1,indexPlus)).trim() +"</div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("imo_no")) +" </div>" +
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("mmsi_no")) +" </div>" +						
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("ship_name")) +" </div>" +							
								"<div onmousedown=\"return false\" class= \"popupFont\">"+ (clickedShipInfo.get("data_user_provider")) +" </div>";
								}
						var popupdiv=document.createElement("div");					
						map.removeOverlay(map.getOverlayById(overlayId)); //if existing
						  //-------------- 
						 
						popupdiv.setAttribute("id", id);
						popupdiv.setAttribute("class", "ol-popup");
									   
						document.body.appendChild(popupdiv);
						
						var companyVesselDetailsDiv = "";
						if(featureToCompare == flagCountryToCompare)
						{
							companyVesselDetailsDiv = "<div  onmousedown=\"return false\" class= \"popupFont\" style=\"text-decoration: underline blue; \"><a Style=\"color: gray\" href=# id="+id+"-company \">Company Details</a></div>" +
							"<div  onmousedown=\"return false\" class= \"popupFont\" style=\"text-decoration: underline blue;\"><a Style=\"color: gray\" href=# id="+id+"-vessel \">Vessel Details</a> </div>";
						}
						 popupdiv.innerHTML =  "<div onmousedown=\"return false\" id="+id+"-title class=ol-popup-title></div> <a href=# id="+id+"-closer class=ol-popup-closer></a><a href=# id="+id+"-resize class=ol-popup-resize></a>"+
						 "<div onmousedown=\"return false\" class= \"popupFont\" Style=\"padding-top:5px; color: #337ab7\">----------------------</div><div onmousedown=\"return false\" id="+id+"-content class=\"popup-content scrollbar-popup\">"+ output +  
						 companyVesselDetailsDiv + "</div>" ; 
						
						 if(companyVesselDetailsDiv != "")				   
						 {
							var vesselClick:any  = document.getElementById(id+"-vessel");
							vesselClick.onclick = function() {				    	
								//window.open("/lrit/ship/viewvesselonmap/"+id.split('_')[0], '_blank');
								window.open("/lrit/ship/viewvesselonmap/"+clickedShipInfo.imo_no, '_blank');
								 //openWindowWithPost("/lrit/ship/viewvesselonmap/"+clickedShipInfo.imo_no, "");
	
							};
							
							var companyClick:any  = document.getElementById(id+"-company");
								 companyClick.onclick = function() {					    
								//window.open("/lrit/users/companycsodetails/?imoNo="+clickedShipInfo.imo_no.trim(), '_blank');
								 //openWindowWithPost("/lrit/users/companycsodetails", "imoNo="+clickedShipInfo.imo_no );
							};
						 }
							
						 // update popup close status
						 var content = document.getElementById(id+"-content");
						 var closer:any = document.getElementById(id+"-closer");
						 closer.onclick = function() {
							overlay.setPosition(undefined);
							map.removeOverlay(overlay);	
							//@ts-ignore	
							removeLayersFromMap('popupLineLayer'+id,'name','Line'+id);
							
							 var findShipKeyInd = id.indexOf("_popup");
							 var findShipKey = (id.substring(0,findShipKeyInd)).trim();
							//// var clickedShipInfoClose = AllShipStatusInfo.get(findShipKey);	
								var currentShipStateClose =  'latest';
								   
							  
						 						
						};
						
						// popup resize
						var resize:any = document.getElementById(id+"-resize");
						resize.onclick = function() {				    	
							 if(clickedShipInfo.popupResizeStatus==false)
							 { 			
								 document.getElementById(id+"-resize")!.className = "ol-popup-resizeMin";				    		
								 clickedShipInfo.popupResizeHeight = document.getElementById(id+"-content")!.offsetHeight;
								 clickedShipInfo.popupResizeWidth = document.getElementById(id+"-content")!.offsetWidth;
								 document.getElementById(id)!.style.height = '100px';
								 document.getElementById(id)!.style.width = '125px';
								 document.getElementById(id+"-content")!.style.height = '55px'; 
								 document.getElementById(id+"-content")!.style.width = '110px'; 
								 clickedShipInfo.popupResizeStatus=true;					    	 
							 }
							 else
							 {
								 document.getElementById(id+"-resize")!.className = "ol-popup-resize";
								 document.getElementById(id)!.style.height = clickedShipInfo.popupResizeHeight + 45 + 'px';
								 var popupWidthResize = (clickedShipInfo.popupResizeWidth + 30);
								 if (popupWidthResize<130)
									 popupWidthResize = 130;
								 document.getElementById(id)!.style.width = popupWidthResize +'px';
								 document.getElementById(id+"-content")!.style.height = clickedShipInfo.popupResizeHeight + 'px';
								 document.getElementById(id+"-content")!.style.width = clickedShipInfo.popupResizeWidth+ 'px';
								 clickedShipInfo.popupResizeStatus=false;
							 }
													 
						 }
							
						// create popup overlay
					   var overlay = new Overlay({
						   id : overlayId,
						   element: popupdiv,				       
						   autoPan: true,
						  /*// autoPanAnimation: {
							   duration: 250
						   }	*/			      
					   });     			       
					 
					  evt.map.addOverlay(overlay); 			    
					  overlay.setPosition(coordinate);	
					 // $("#"+overlayId).show(); //for hidden popups
					  // create popup line 
					  var countDrag = 0;
					  var vectorLayer_Line:any;
					  var start_point = [coordinate];
						 var end_point = [overlay.getPosition()];
					   
						  var lineCoordinates = [start_point, end_point]; 
					   							//@ts-ignore	

						  removeLayersFromMap('popupLineLayer'+overlayId,'name','Line'+overlayId);
						  vectorLayer_Line = new VectorLayer({
								 source: new VectorSource({
									 features: [new Feature({
										 geometry: new LineString(lineCoordinates),
										 name: 'Line'+overlayId
									 })],
									 wrapX: false,
									//// noWrap: true
								 }),
								// name: "popupLineLayer" +overlayId
							 });
					   evt.map.addLayer(vectorLayer_Line);  		    		 
					
					  
					   var draggingPopup:any;
				   // popup movement functionality 
					popupdiv.addEventListener('mousedown', function(evt) {   	
					   evt.preventDefault();
					   draggingPopup =   overlayId; 
					   var mousedowncoord = map.getEventCoordinate(evt);
					   var currentpopupcoord = map.getOverlayById(draggingPopup).getPosition();
					 function move(evt:any) {   				  
					   var popupdragoffest =  [mousedowncoord[0]-map.getEventCoordinate(evt)[0],mousedowncoord[1]-map.getEventCoordinate(evt)[1]];
					   var newposition = [currentpopupcoord[0]-popupdragoffest[0],currentpopupcoord[1]-popupdragoffest[1] ];
					   map.getOverlayById(draggingPopup).setPosition(newposition);
					   
					 }
					 function end(evt:any) {   				
					   window.removeEventListener('mousemove', move);
					   window.removeEventListener('mouseup', end);
					   var findShipKeyInd = draggingPopup.indexOf("_popup");
					   var findShipKey = (id.substring(0,findShipKeyInd)).trim();
					   ///var clickedShipInfoTemp = AllShipStatusInfo.get(findShipKey);
					var clickedShipInfoTemp =" ";	
					 							//@ts-ignore	

					   removeLayersFromMap('popupLineLayer'+draggingPopup,'name','Line'+draggingPopup); //Always remove before draw
				  
					if(clickedShipInfoTemp != undefined){
					   
						var pointCordinates = [coordinate[0], coordinate[1]];
											
						countDrag = countDrag+5;				;
						start_point = pointCordinates;
							end_point =  map.getOverlayById(draggingPopup).getPosition();					    				
						var lineCoordinates = [start_point, end_point]; 
						   
						/////   removeLayersFromMap('popupLineLayer'+draggingPopup,'name','Line'+draggingPopup);
						   
						   var features = new Feature({
									 name: 'Line'+draggingPopup,
								  geometry: new LineString(lineCoordinates)					  
							  });
				
						   features.setStyle(popupLineStyle);
						   vectorLayer_Line = new VectorLayer({
								//name: "popupLineLayer" ;//+draggingPopup,

								  source: new VectorSource({wrapX: false,
										 }),
							  });
							vectorLayer_Line.getSource().addFeature(features);
							vectorLayer_Line.set("name","popupLineLayer" +draggingPopup)	       
							   map.addLayer(vectorLayer_Line);
					}
					 }
					 
					 window.addEventListener('mousemove', move);
					 window.addEventListener('mouseup', end);
					
				   });   			
									
				}
				} // end of else on click display ship details
			   } // end of if (geometryFeature.getGeometry().getType() === 'Point')
				/*else if (geometryFeature.getGeometry().getType() === 'LineString')
				{
					// To delete drawn distance line from map. 				
					var currentSelectedLine = geometryFeature.get('name');
						
					var overlay = map.getOverlays();
					var overlayToRemoveArr = [];					
					for (var m=0; m<overlay.getLength(); m++)
					{						
						var currentOverlayId = overlay.item(m).getId();
						
						if(currentOverlayId!= undefined )
						{							
							if( currentOverlayId.match(currentSelectedLine))
							{
								overlayToRemoveArr.push(currentOverlayId);							
							}
						}
					}
					
					for (var n=0; n<overlayToRemoveArr.length; n++)
					{
						var overlayToRemove = map.getOverlayById(overlayToRemoveArr[n]);
						map.removeOverlay(overlayToRemove);
					}					
				
					var features = vectorLayer_SelectedShipPosition.getSource().getFeatures();
					features.forEach(function(feature) {
						  
						if (feature.get('name').match(currentSelectedLine))	      
							{
							vectorLayer_SelectedShipPosition.getSource().removeFeature(feature);
						};
					});
				}*/
				
			} // end of if(geometryFeature)
			else{
				/*//if(pathProjectionStartFlag == true)
				{	
					addInteractionCircle(evt.coordinate);		
					
				}//*/
			}			
	//  }
	// catch(err)
	//	{
	//		console.info('error in Left Click on map event: ' + err)
	//	} 
	};

// delete selected layers from map	







}




