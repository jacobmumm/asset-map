(function(e){function t(t){for(var a,l,s=t[0],i=t[1],c=t[2],u=0,p=[];u<s.length;u++)l=s[u],o[l]&&p.push(o[l][0]),o[l]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(t);while(p.length)p.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,l=1;l<n.length;l++){var i=n[l];0!==o[i]&&(a=!1)}a&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},o={app:0},r=[];function l(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"64d347f8"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise(function(t,a){n=o[e]=[t,a]});t.push(n[2]=a);var r,i=document.createElement("script");i.charset="utf-8",i.timeout=120,s.nc&&i.setAttribute("nonce",s.nc),i.src=l(e),r=function(t){i.onerror=i.onload=null,clearTimeout(c);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,l=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");l.type=a,l.request=r,n[1](l)}o[e]=void 0}};var c=setTimeout(function(){r({type:"timeout",target:i})},12e4);i.onerror=i.onload=r,document.head.appendChild(i)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var d=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}}),n("router-view")],1)},r=[],l=(n("5c0b"),n("2877")),s={},i=Object(l["a"])(s,o,r,!1,null,null,null),c=i.exports,u=n("8c4f"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("map-picker",{model:{value:e.selectedMapId,callback:function(t){e.selectedMapId=t},expression:"selectedMapId"}}),n("map-viewer",{attrs:{mapId:e.selectedMapId}})],1)},p=[],f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"map-picker"},[n("b-row",[n("b-col",[n("div",{staticClass:"px-4"},[n("b-form-group",{attrs:{label:"Current Map"}},[n("b-form-select",{model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.maps,function(t){return n("option",{key:t.id,domProps:{value:t.id}},[e._v("\n              "+e._s(t.title)+"\n            ")])}),0)],1)],1)]),n("b-col",{staticClass:"ml-2"},[n("b-form-group",{attrs:{label:"New Map"}},[n("b-form",{attrs:{inline:""}},[n("b-form-input",{attrs:{id:"newMapTitle",placeholder:"Create a map"},model:{value:e.newMapTitle,callback:function(t){e.newMapTitle=t},expression:"newMapTitle"}}),n("b-button",{staticClass:"ml-1",on:{click:function(t){return e.createMap()}}},[e._v("Add Map")])],1)],1)],1)],1),e.value?n("b-row",{staticClass:"mt-2"},[n("b-col",[n("watershed-map",{attrs:{id:e.value}})],1)],1):e._e()],1)},h=[],m=(n("7514"),n("c5f6"),{name:"map-picker",mounted:function(){var e=this;fetch("/api/maps").then(function(e){return e.json()}).then(function(t){e.maps=t,t.length&&(e.value=t[0].id)})},props:{value:{type:Number}},watch:{value:function(){this.$emit("input",this.value)}},data:function(){return{newMapTitle:"",maps:[]}},computed:{selectedMap:function(e){return e.value&&e.maps?e.maps.find(function(t){return e.value===t.id}):[]}},methods:{createMap:function(){var e=this,t={title:this.newMapTitle};fetch("/api/maps",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(t){e.maps.push(t),e.value=t.id,e.newMapTitle=""})}}}),g=m,v=(n("73d9"),Object(l["a"])(g,f,h,!1,null,null,null)),b=v.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"map-viewer"},[n("b-row",[n("b-col",[n("div",{staticClass:"px-4"},[n("GmapMap",{staticStyle:{width:"100%",height:"500px"},attrs:{options:{zoomControl:!0,mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,rotateControl:!1,fullscreenControl:!1,disableDefaultUi:!1},center:e.location,zoom:e.zoom},on:{click:e.mapClick}},[e._l(e.watersheds,function(e,t){return n("gmap-polygon",{key:t,attrs:{paths:[e.points],options:{fillColor:e.fillColor}}})}),e.polygon?n("gmap-polygon",{attrs:{paths:[e.polygon],options:{fillColor:e.fillColor},editable:!0},on:{paths_changed:function(t){return e.updateEdited(t)}}}):e._e(),e.place?n("GmapMarker",{attrs:{position:e.place.geometry.location,clickable:!1,draggable:!1},on:{click:function(t){e.center=e.m.position}}}):e._e()],2)],1)]),n("b-col",{staticClass:"mr-3"},[n("h3",[e._v("Watersheds:")]),n("table",{staticClass:"table"},[n("tbody",e._l(e.watersheds,function(t,a){return n("tr",{key:a},[n("td",{style:"background-color: "+t.fillColor},[e._v(e._s(t.name))]),n("td",[n("b-button",{attrs:{variant:"danger"},on:{click:function(t){return e.watersheds.splice(a,1)}}},[n("fa-icon",{attrs:{icon:"trash"}})],1)],1)])}),0),n("tfoot",[n("tr",[n("td",[n("b-form-input",{attrs:{placeholder:"Add a watershed"},model:{value:e.watershed_name,callback:function(t){e.watershed_name=t},expression:"watershed_name"}})],1),n("td",[e.watershed_name?n("verte",{attrs:{picker:"square",model:"rgb"},model:{value:e.fillColor,callback:function(t){e.fillColor=t},expression:"fillColor"}}):e._e()],1),n("td",{attrs:{width:"25%"}},[e.creating_watershed?n("div",[n("b-button",{attrs:{variant:"outline-info"},on:{click:e.cancelWatershed}},[e._v("Cancel")]),e.polygon?n("b-button",{staticClass:"mx-2",attrs:{variant:"info",disabled:!e.polygon},on:{click:e.saveWatershed}},[e._v("Save")]):e._e()],1):e._e(),!e.creating_watershed&&e.watershed_name?n("div",[n("b-button",{attrs:{variant:e.watershed_name?"info":null,disabled:!e.watershed_name},on:{click:function(t){e.creating_watershed=!0,e.polygon=null}}},[e._v("Create")])],1):e._e()])]),e.creating_watershed?n("tr",[n("td",{attrs:{colspan:"3"}},[e.polygon?n("p",[e._v("Drag the points around to define the watershed")]):n("p",[e._v("Click on the map to start drawing boundaries")])])]):e._e()])]),e.watersheds.length>0?n("div",[n("h3",[e._v("Locate Asset:")]),n("gmap-autocomplete",{staticClass:"form-control",attrs:{placeholder:"What's the address?",value:e.address},on:{place_changed:e.setPlace}}),e.locating?n("div",{staticClass:"text-center pt-3"},[n("fa-icon",{attrs:{icon:"spinner",size:"3x",spin:""}})],1):e._e(),e.located?n("div",[e._v("\n          Your watershed is: "+e._s(e.locatedWatershed?e.locatedWatershed.name:"Unknown")+" \n        ")]):e._e()],1):e._e()])],1)],1)},_=[],y=(n("ac6a"),n("7f7f"),n("28a5"),"#CCCCCC"),C={name:"map",props:["mapId"],mounted:function(){this.loadWatersheds()},data:function(){return{location:{lat:35.5951,lng:-82.5515},zoom:9,markers:[],watersheds:[],watershed_name:"",creating_watershed:!1,polygon:null,fillColor:y,address:"",place:null,locating:!1,located:!1,locatedWatershed:null,mapId:null}},computed:{watershedPaths:function(){return this.watersheds.map(function(e){return e.points})}},watch:{mapId:function(){this.loadWatersheds()}},methods:{loadWatersheds:function(){var e=this;this.mapId?fetch("/api/maps/"+this.mapId+"/watersheds").then(function(e){return e.json()}).then(function(t){e.watersheds=t.map(function(e){var t=e.bounds.split(":").map(function(e){var t=e.split(",");return{lat:parseFloat(t[0]),lng:parseFloat(t[1])}});return{name:e.title,fillColor:e.color,points:t}})}):this.cancelWatershed()},mapClick:function(e){if(this.creating_watershed&&!this.polygon){var t={lat:e.latLng.lat(),lng:e.latLng.lng()};console.log("CLICK MAP=",t);var n=.1;this.polygon=[{lat:t.lat+n,lng:t.lng+n},{lat:t.lat+n,lng:t.lng-n},{lat:t.lat-n,lng:t.lng-n},{lat:t.lat-n,lng:t.lng+n}],console.log(this.polygon)}},saveWatershed:function(){var e=this,t={name:this.watershed_name,points:this.polygon,fillColor:this.fillColor},n=!0,a=this.polygon.reduce(function(e,t){return n?n=!1:e+=":",e+=t.lat+","+t.lng,e},"");fetch("/api/maps/"+this.mapId+"/watersheds",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t.name,bounds:a,color:t.fillColor})}).then(function(e){return e.json()}).then(function(n){n.id&&(t.id=n.id,e.watersheds.push(t))}),this.cancelWatershed()},cancelWatershed:function(){this.polygon=null,this.creating_watershed=!1,this.watershed_name="",this.fillColor=y},updateEdited:function(e){console.log("MVC=",e);for(var t=[],n=0;n<e.getLength();n++){for(var a=[],o=0;o<e.getAt(n).getLength();o++){var r=e.getAt(n).getAt(o);a.push({lat:r.lat(),lng:r.lng()})}t.push(a)}console.log("paths=",t[0]),this.polygon=t[0]},setPlace:function(e){e&&(console.log(e),this.locateWatershed(e))},locateWatershed:function(e){this.place=e,this.address=e.formatted_address;var t=this.place.geometry.location.lat(),n=this.place.geometry.location.lng(),a=new google.maps.LatLng(t,n);console.log("LL=",a),this.located=!1,this.locating=!0,this.locatedWatershed=null;var o=this;this.watersheds.forEach(function(e){var t=new google.maps.Polygon({paths:e.points});console.log("CHECKING",t),google.maps.geometry.poly.containsLocation(a,t)&&(o.locatedWatershed=e)}),this.locating=!1,this.located=!0}}},k=C,M=Object(l["a"])(k,w,_,!1,null,null,null),j=M.exports,x={name:"home",components:{mapPicker:b,mapViewer:j},data:function(){return{selectedMapId:null}}},O=x,P=Object(l["a"])(O,d,p,!1,null,null,null),I=P.exports;a["default"].use(u["a"]);var W=new u["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:I},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),T=n("2f62");a["default"].use(T["a"]);var S=new T["a"].Store({state:{},mutations:{},actions:{}}),L=n("9483");Object(L["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var A=n("5f5b"),E=n("ecee"),N=n("ad3d"),z=n("c074"),F=n("f2d1"),$=n("36fc"),J=(n("bbb4"),n("755e"));a["default"].use(A["a"]),E["c"].add(z["a"],F["a"]),a["default"].component("fa-icon",N["a"]),a["default"].component("verte",$["a"]),a["default"].use(J,{load:{key:"AIzaSyBXF7j4I0CI4FPOzI6uZKB6eKjP6Lw1SM8",libraries:"places"}}),a["default"].config.productionTip=!1,window.vueapp=new a["default"]({router:W,store:S,render:function(e){return e(c)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var a=n("8fba"),o=n.n(a);o.a},"73d9":function(e,t,n){"use strict";var a=n("d92f"),o=n.n(a);o.a},"8fba":function(e,t,n){},d92f:function(e,t,n){}});
//# sourceMappingURL=app.de57137d.js.map