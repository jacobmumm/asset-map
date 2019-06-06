(function(t){function e(e){for(var s,i,r=e[0],l=e[1],c=e[2],d=0,p=[];d<r.length;d++)i=r[d],n[i]&&p.push(n[i][0]),n[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],s=!0,i=1;i<a.length;i++){var l=a[i];0!==n[l]&&(s=!1)}s&&(o.splice(e--,1),t=r(r.s=a[0]))}return t}var s={},n={app:0},o=[];function i(t){return r.p+"js/"+({about:"about"}[t]||t)+"."+{about:"64d347f8"}[t]+".js"}function r(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.e=function(t){var e=[],a=n[t];if(0!==a)if(a)e.push(a[2]);else{var s=new Promise(function(e,s){a=n[t]=[e,s]});e.push(a[2]=s);var o,l=document.createElement("script");l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.src=i(t),o=function(e){l.onerror=l.onload=null,clearTimeout(c);var a=n[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+s+": "+o+")");i.type=s,i.request=o,a[1](i)}n[t]=void 0}};var c=setTimeout(function(){o({type:"timeout",target:l})},12e4);l.onerror=l.onload=o,document.head.appendChild(l)}return Promise.all(e)},r.m=t,r.c=s,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(a,s,function(e){return t[e]}.bind(null,s));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var u=c;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var s=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"mb-2",attrs:{id:"nav"}},[a("b-navbar",{attrs:{toggleable:"lg",type:"primary",variant:"light"}},[a("b-navbar-brand",{attrs:{to:"/"}},[t._v("WNC Mutual Aid")]),a("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),a("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[a("b-navbar-nav",[a("b-nav-item",{attrs:{to:"/maps"}},[t._v("Watershed Maps")])],1),a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-item",{attrs:{to:"/contribute",disabled:""}},[t._v("Contribute")])],1)],1)],1)],1),a("router-view")],1)},o=[],i=(a("5c0b"),a("2877")),r={},l=Object(i["a"])(r,n,o,!1,null,null,null),c=l.exports,d=a("8c4f"),u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"maps"},[a("map-picker",{model:{value:t.selectedMapId,callback:function(e){t.selectedMapId=e},expression:"selectedMapId"}}),a("map-viewer",{attrs:{mapId:t.selectedMapId}})],1)},p=[],f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"map-picker"},[a("b-row",[a("b-col",[a("div",{staticClass:"px-4"},[a("b-form-group",{attrs:{label:"Current Map"}},[a("b-form-select",{model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.maps,function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v("\n              "+t._s(e.title)+"\n            ")])}),0)],1)],1)]),a("b-col",{staticClass:"ml-2"},[a("b-form-group",{attrs:{label:"New Map"}},[a("b-form",{attrs:{inline:""}},[a("b-form-input",{attrs:{id:"newMapTitle",placeholder:"Create a map"},model:{value:t.newMapTitle,callback:function(e){t.newMapTitle=e},expression:"newMapTitle"}}),a("b-button",{staticClass:"ml-1",on:{click:function(e){return t.createMap()}}},[t._v("Add Map")])],1)],1)],1)],1),t.value?a("b-row",{staticClass:"mt-2"},[a("b-col",[a("watershed-map",{attrs:{id:t.value}})],1)],1):t._e()],1)},h=[],m=(a("7514"),a("c5f6"),{name:"map-picker",mounted:function(){var t=this;fetch("/api/maps").then(function(t){return t.json()}).then(function(e){t.maps=e,e.length&&(t.value=e[0].id)})},props:{value:{type:Number}},watch:{value:function(){this.$emit("input",this.value)}},data:function(){return{newMapTitle:"",maps:[]}},computed:{selectedMap:function(t){return t.value&&t.maps?t.maps.find(function(e){return t.value===e.id}):[]}},methods:{createMap:function(){var t=this,e={title:this.newMapTitle};fetch("/api/maps",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(t){return t.json()}).then(function(e){t.maps.push(e),t.value=e.id,t.newMapTitle=""})}}}),v=m,g=(a("73d9"),Object(i["a"])(v,f,h,!1,null,null,null)),b=g.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"map-viewer"},[a("b-row",[a("b-col",[a("div",{staticClass:"px-4"},[a("GmapMap",{staticStyle:{width:"100%",height:"500px"},attrs:{options:{zoomControl:!0,mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,rotateControl:!1,fullscreenControl:!1,disableDefaultUi:!1},center:t.location,zoom:t.zoom},on:{click:t.mapClick}},[t._l(t.watersheds,function(t,e){return a("gmap-polygon",{key:e,attrs:{paths:[t.points],options:{fillColor:t.fillColor}}})}),t.polygon?a("gmap-polygon",{attrs:{paths:[t.polygon],options:{fillColor:t.fillColor},editable:!0},on:{paths_changed:function(e){return t.updateEdited(e)}}}):t._e(),t.place?a("GmapMarker",{attrs:{position:t.place.geometry.location,clickable:!1,draggable:!1},on:{click:function(e){t.center=t.m.position}}}):t._e()],2)],1)]),a("b-col",{staticClass:"mr-3"},[a("h3",[t._v("Watersheds:")]),a("table",{staticClass:"table"},[a("tbody",t._l(t.watersheds,function(e,s){return a("tr",{key:s},[a("td",{style:"background-color: "+e.fillColor},[t._v(t._s(e.name))]),a("td",[a("b-button",{attrs:{variant:"danger"},on:{click:function(e){return t.watersheds.splice(s,1)}}},[a("fa-icon",{attrs:{icon:"trash"}})],1)],1)])}),0),a("tfoot",[a("tr",[a("td",[a("b-form-input",{attrs:{placeholder:"Add a watershed"},model:{value:t.watershed_name,callback:function(e){t.watershed_name=e},expression:"watershed_name"}})],1),a("td",[t.watershed_name?a("verte",{attrs:{picker:"square",model:"rgb"},model:{value:t.fillColor,callback:function(e){t.fillColor=e},expression:"fillColor"}}):t._e()],1),a("td",{attrs:{width:"25%"}},[t.creating_watershed?a("div",[a("b-button",{attrs:{variant:"outline-info"},on:{click:t.cancelWatershed}},[t._v("Cancel")]),t.polygon?a("b-button",{staticClass:"mx-2",attrs:{variant:"info",disabled:!t.polygon},on:{click:t.saveWatershed}},[t._v("Save")]):t._e()],1):t._e(),!t.creating_watershed&&t.watershed_name?a("div",[a("b-button",{attrs:{variant:t.watershed_name?"info":null,disabled:!t.watershed_name},on:{click:function(e){t.creating_watershed=!0,t.polygon=null}}},[t._v("Create")])],1):t._e()])]),t.creating_watershed?a("tr",[a("td",{attrs:{colspan:"3"}},[t.polygon?a("p",[t._v("Drag the points around to define the watershed")]):a("p",[t._v("Click on the map to start drawing boundaries")])])]):t._e()])]),t.watersheds.length>0?a("div",[a("h3",[t._v("Locate Asset:")]),a("gmap-autocomplete",{staticClass:"form-control",attrs:{placeholder:"What's the address?",value:t.address},on:{place_changed:t.setPlace}}),t.locating?a("div",{staticClass:"text-center pt-3"},[a("fa-icon",{attrs:{icon:"spinner",size:"3x",spin:""}})],1):t._e(),t.located?a("div",[t._v("\n          Your watershed is: "+t._s(t.locatedWatershed?t.locatedWatershed.name:"Unknown")+" \n        ")]):t._e()],1):t._e()])],1)],1)},y=[],w=(a("ac6a"),a("7f7f"),a("28a5"),"#CCCCCC"),_={name:"map",props:["mapId"],mounted:function(){this.loadWatersheds()},data:function(){return{location:{lat:35.5951,lng:-82.5515},zoom:9,markers:[],watersheds:[],watershed_name:"",creating_watershed:!1,polygon:null,fillColor:w,address:"",place:null,locating:!1,located:!1,locatedWatershed:null}},computed:{watershedPaths:function(){return this.watersheds.map(function(t){return t.points})}},watch:{mapId:function(){this.loadWatersheds()}},methods:{loadWatersheds:function(){var t=this;this.mapId?fetch("/api/maps/"+this.mapId+"/watersheds").then(function(t){return t.json()}).then(function(e){t.watersheds=e.map(function(t){var e=t.bounds.split(":").map(function(t){var e=t.split(",");return{lat:parseFloat(e[0]),lng:parseFloat(e[1])}});return{name:t.title,fillColor:t.color,points:e}})}):this.cancelWatershed()},mapClick:function(t){if(this.creating_watershed&&!this.polygon){var e={lat:t.latLng.lat(),lng:t.latLng.lng()};console.log("CLICK MAP=",e);var a=.1;this.polygon=[{lat:e.lat+a,lng:e.lng+a},{lat:e.lat+a,lng:e.lng-a},{lat:e.lat-a,lng:e.lng-a},{lat:e.lat-a,lng:e.lng+a}],console.log(this.polygon)}},saveWatershed:function(){var t=this,e={name:this.watershed_name,points:this.polygon,fillColor:this.fillColor},a=!0,s=this.polygon.reduce(function(t,e){return a?a=!1:t+=":",t+=e.lat+","+e.lng,t},"");fetch("/api/maps/"+this.mapId+"/watersheds",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e.name,bounds:s,color:e.fillColor})}).then(function(t){return t.json()}).then(function(a){a.id&&(e.id=a.id,t.watersheds.push(e))}),this.cancelWatershed()},cancelWatershed:function(){this.polygon=null,this.creating_watershed=!1,this.watershed_name="",this.fillColor=w},updateEdited:function(t){console.log("MVC=",t);for(var e=[],a=0;a<t.getLength();a++){for(var s=[],n=0;n<t.getAt(a).getLength();n++){var o=t.getAt(a).getAt(n);s.push({lat:o.lat(),lng:o.lng()})}e.push(s)}console.log("paths=",e[0]),this.polygon=e[0]},setPlace:function(t){t&&(console.log(t),this.locateWatershed(t))},locateWatershed:function(t){this.place=t,this.address=t.formatted_address;var e=this.place.geometry.location.lat(),a=this.place.geometry.location.lng(),s=new google.maps.LatLng(e,a);console.log("LL=",s),this.located=!1,this.locating=!0,this.locatedWatershed=null;var n=this;this.watersheds.forEach(function(t){var e=new google.maps.Polygon({paths:t.points});console.log("CHECKING",e),google.maps.geometry.poly.containsLocation(s,e)&&(n.locatedWatershed=t)}),this.locating=!1,this.located=!0}}},x=_,k=Object(i["a"])(x,C,y,!1,null,null,null),M=k.exports,j={name:"maps",components:{mapPicker:b,mapViewer:M},data:function(){return{selectedMapId:null}}},S=j,P=Object(i["a"])(S,u,p,!1,null,null,null),T=P.exports,W=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"home px-4"},[a("h1",[t._v("WNC Mutual Aid - Developer Projects")]),a("div",{staticClass:"mb-4 spacer"}),t._m(0),a("b-row",[a("b-col",{attrs:{cols:"4"}},[a("div",{staticClass:"card shadow my-4"},[a("div",{staticClass:"card-header py-3"},[a("h6",{staticClass:"m-0 font-weight-bold text-primary"},[t._v("Basic Card Example")])]),a("div",{staticClass:"card-body"},[t._v("\n          The styling for this basic card example is created by using default Bootstrap utility classes. By using utility classes, the style of the card component can be easily modified with no need for any custom CSS!\n        ")])])]),a("b-col",{attrs:{cols:"4"}},[a("div",{staticClass:"card shadow my-4"},[a("div",{staticClass:"card-header py-3"},[a("h6",{staticClass:"m-0 font-weight-bold text-primary"},[t._v("Basic Card Example")])]),a("div",{staticClass:"card-body"},[t._v("\n          The styling for this basic card example is created by using default Bootstrap utility classes. By using utility classes, the style of the card component can be easily modified with no need for any custom CSS!\n        ")])])]),a("b-col",{attrs:{cols:"4"}},[a("div",{staticClass:"card shadow my-4"},[a("div",{staticClass:"card-header py-3"},[a("h6",{staticClass:"m-0 font-weight-bold text-primary"},[t._v("Basic Card Example")])]),a("div",{staticClass:"card-body"},[t._v("\n          The styling for this basic card example is created by using default Bootstrap utility classes. By using utility classes, the style of the card component can be easily modified with no need for any custom CSS!\n        ")])])])],1),a("b-list-group",[a("b-list-group-item",[a("router-link",{attrs:{to:"/maps"}},[t._v("Maps")])],1)],1)],1)},O=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-xl-3 col-md-6 mb-4"},[a("div",{staticClass:"card border-left-primary shadow h-100 py-2"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row no-gutters align-items-center"},[a("div",{staticClass:"col mr-2"},[a("div",{staticClass:"text-xs font-weight-bold text-primary text-uppercase mb-1"},[t._v("Earnings (Monthly)")]),a("div",{staticClass:"h5 mb-0 font-weight-bold text-gray-800"},[t._v("$40,000")])]),a("div",{staticClass:"col-auto"},[a("i",{staticClass:"fas fa-calendar fa-2x text-gray-300"})])])])])]),a("div",{staticClass:"col-xl-3 col-md-6 mb-4"},[a("div",{staticClass:"card border-left-success shadow h-100 py-2"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row no-gutters align-items-center"},[a("div",{staticClass:"col mr-2"},[a("div",{staticClass:"text-xs font-weight-bold text-success text-uppercase mb-1"},[t._v("Earnings (Annual)")]),a("div",{staticClass:"h5 mb-0 font-weight-bold text-gray-800"},[t._v("$215,000")])]),a("div",{staticClass:"col-auto"},[a("i",{staticClass:"fas fa-dollar-sign fa-2x text-gray-300"})])])])])]),a("div",{staticClass:"col-xl-3 col-md-6 mb-4"},[a("div",{staticClass:"card border-left-info shadow h-100 py-2"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row no-gutters align-items-center"},[a("div",{staticClass:"col mr-2"},[a("div",{staticClass:"text-xs font-weight-bold text-info text-uppercase mb-1"},[t._v("Tasks")]),a("div",{staticClass:"row no-gutters align-items-center"},[a("div",{staticClass:"col-auto"},[a("div",{staticClass:"h5 mb-0 mr-3 font-weight-bold text-gray-800"},[t._v("50%")])]),a("div",{staticClass:"col"},[a("div",{staticClass:"progress progress-sm mr-2"},[a("div",{staticClass:"progress-bar bg-info",staticStyle:{width:"50%"},attrs:{role:"progressbar","aria-valuenow":"50","aria-valuemin":"0","aria-valuemax":"100"}})])])])]),a("div",{staticClass:"col-auto"},[a("i",{staticClass:"fas fa-clipboard-list fa-2x text-gray-300"})])])])])]),a("div",{staticClass:"col-xl-3 col-md-6 mb-4"},[a("div",{staticClass:"card border-left-warning shadow h-100 py-2"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row no-gutters align-items-center"},[a("div",{staticClass:"col mr-2"},[a("div",{staticClass:"text-xs font-weight-bold text-warning text-uppercase mb-1"},[t._v("Pending Requests")]),a("div",{staticClass:"h5 mb-0 font-weight-bold text-gray-800"},[t._v("18")])]),a("div",{staticClass:"col-auto"},[a("i",{staticClass:"fas fa-comments fa-2x text-gray-300"})])])])])])])}],E={},I=Object(i["a"])(E,W,O,!1,null,null,null),A=I.exports;s["default"].use(d["a"]);var L=new d["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:A},{path:"/maps",name:"maps",component:T},{path:"/contribute",name:"contribute",component:function(){return a.e("about").then(a.bind(null,"f820"))}},{path:"*",name:"404",component:A}]}),B=a("2f62");s["default"].use(B["a"]);var N=new B["a"].Store({state:{},mutations:{},actions:{}}),$=a("9483");Object($["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});var z=a("5f5b"),F=a("ecee"),q=a("ad3d"),J=a("c074"),K=a("f2d1"),D=a("36fc"),G=(a("bbb4"),a("755e"));s["default"].use(z["a"]),F["c"].add(J["a"],K["a"]),s["default"].component("fa-icon",q["a"]),s["default"].component("verte",D["a"]),s["default"].use(G,{load:{key:"AIzaSyBXF7j4I0CI4FPOzI6uZKB6eKjP6Lw1SM8",libraries:"places"}}),s["default"].config.productionTip=!1,window.vueapp=new s["default"]({router:L,store:N,render:function(t){return t(c)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var s=a("8fba"),n=a.n(s);n.a},"73d9":function(t,e,a){"use strict";var s=a("d92f"),n=a.n(s);n.a},"8fba":function(t,e,a){},d92f:function(t,e,a){}});
//# sourceMappingURL=app.6cfb2eeb.js.map