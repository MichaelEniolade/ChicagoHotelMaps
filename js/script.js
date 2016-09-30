var map, infowindow ;
var pointMarkersArray = [];
var APIKEY = "AIzaSyDiRkWeMTYD_5LyWcLef_ZMpBqBDbkGLiQ";
var infowindowOld = null;
var markerOld = null;
var viewModel = {
        query: ko.observable(''),
            showMarkerData : function (data , event){
                    infowindow = new google.maps.InfoWindow();
                    if(infowindowOld !== null && markerOld !== null){
                        infowindowOld.close();
                        markerOld.setAnimation(null);
                    }
                    if (data.holdMarker.getAnimation() !== null) {
                      data.holdMarker.setAnimation(null);
                    } else {
                      data.holdMarker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                    infowindow.setContent(data.contentString);
                    setTimeout(function(){infowindow.open(map,data.holdMarker)},600);
                    infowindowOld = infowindow;
                    markerOld = data.holdMarker;
                    map.setZoom(16);
                    map.setCenter(data.holdMarker.getPosition());
                    data.holdMarker.picBoolTest = true;
            },
            myFunction: function(){
                setEveryMap();
            }
        };

function loadScript() {
	try{
		var script = document.createElement('script');
		script.async = true;
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp'+'&signed_in=false&key='+APIKEY+'&callback=initialize';
		document.body.appendChild(script);
		script.onerror = function() {alert('Unable to load Map. Please try again.');};
	}
	catch(e){}
}

window.onload = loadScript;

//map and content initializing
function initialize() {  
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(41.881832, -87.623177),
        mapTypeControl: false,
        disableDefaultUI: true
    };
    if($(window).width() <= 1080) {
        mapOptions.zoom = 13;
    }
    if ($(window).width() < 850 || $(window).height() < 595) {
        vagueNav();
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  

    setpointMarkers(pointMarkers);

    //setEveryMap();

    //this is to reset map on click handler 
    //only as at meeting window resize conditions
    function mapReset() {
        if(markerOld !== null){
            markerOld.setAnimation(null);
        }        
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(13);
            map.setCenter(mapOptions.center);
        } else if(windowWidth > 1080) {
            map.setZoom(14);
            map.setCenter(mapOptions.center);
            infowindow.close();

        }
    }
    $("#reset").click(function() {
        mapReset();
    });
   $(window).resize(function() {
        mapReset();
    }); 
}

//Determines if pointMarkers should be visible
//This function is passed in the knockout viewModel function
function setEveryMap() {
  for (var i = 0; i < pointMarkers.length; i++) {
    if(pointMarkers[i].boolTest === true) {
        //pointMarkers[i].holdMarker.setMap(map);
        console.log('65');
        setTimeout(dropMarker(i), i * 100);
    } else {
        pointMarkers[i].holdMarker.setMap(null);
    }
  }
}

function dropMarker(i) {
    return function() {
      pointMarkers[i].holdMarker.setMap(map);
    };
}

//This provides Information about the different locations
//and information for the pointMarkers
var pointMarkers = [
    {   
    title: "Four Seasons Hotel Chicago",
    lat: 41.899456,  
    lng: -87.624727,
    streetAddress: "120 E Delaware Pl",
    cityAddress: "Chicago, IL 60611, United States",
    url: "fourseasons.com",
    id: "nav0",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "The Langham, Chicago",
    lat: 41.888687, 
    lng: -87.627544, 
    streetAddress: "330 N Wabash Ave, Chicago",
    cityAddress: "IL 60611, United States",
    url: "langhamhotels.com",
    id: "nav1",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "The Talbott Hotel",
    lat: 41.899593,  
    lng: -87.627493, 
    streetAddress: "20 E Delaware Pl",
    cityAddress: "Chicago, IL 60611, USA",
    url: "jdvhotels.com",
    id: "nav2",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "The Whitehall Hotel",
    lat: 41.899060,   
    lng: -87.625729, 
    streetAddress: "105 E Delaware Pl, Chicago",
    cityAddress: "IL 60611, United States",
    url: "thewhitehallhotel.com",
    id: "nav3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "The Godfrey Hotel Chicago",
    lat: 41.894705,  
    lng: -87.632026,   
    streetAddress: "127 W Huron St, Chicago",
    cityAddress: "IL 60654, United States",
    url: "godfreyhotelchicago.com",
    id: "nav4",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "Virgin Hotels Chicago",
    lat: 41.886054,  
    lng: -87.626057, 
    streetAddress: "203 N Wabash Ave, Chicago",
    cityAddress: "IL 60601, United States",
    url: "virginhotels.com",
    id: "nav5",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "The Silver Smith Hotel",
    lat: 41.881832, 
    lng: -87.626642, 
    streetAddress: "10 S Wabash Ave, Chicago",
    cityAddress: "IL 60603, United States",
    url: "silversmithchicagohotel.com",
    id: "nav6",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Radisson Blu Aqua Hotel",
    lat: 41.886746, 
    lng: -87.619940, 
    streetAddress: "221 N Columbus Dr, Chicago",
    cityAddress: "IL 60601, United States",
    url: "radissonblu.com",
    id: "nav7",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Kinzie Hotel",
    lat: 41.889600, 
    lng: -87.628928, 
    streetAddress: "20 W Kinzie St, Chicago",
    cityAddress: "IL 60654, United States",
    url: "kinziehotel.com",
    id: "nav8",
    visible: ko.observable(true),
    boolTest: true
    }   
];

//This is to get Google Street View Image for each marker

var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];     
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

function fetchImage() {
    if (i === 3) {
        streetViewImage = streetViewUrl + '40.242230, -89.449103&fov=75&heading=' + headingImageView[i] + '&pitch=10&key='+APIKEY;                 
    } else if (i === 4) {
        streetViewImage = streetViewUrl +
                        pointMarkers[i].streetAddress + ',' + pointMarkers[i].cityAddress +
                        '&fov=75&heading=' + headingImageView[i] + '&pitch=10&key='+APIKEY;
    } else {
       streetViewImage = streetViewUrl +
                        pointMarkers[i].lat + ',' + pointMarkers[i].lng +
                        '&fov=75&heading=' + headingImageView[i] + '&pitch=10&key='+APIKEY; 
                    }                   
}

//This is to set the Markers on the map within the initialize function

function setpointMarkers(location) {
    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
         // title: location[i].title,
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'img/marker.png',
            size: new google.maps.Size(25, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)
            },
          shape: {
            coords: [1,25,-40,-25,1],
            type: 'poly'
          }  
        });

        //function to place google street view images within info windows
        fetchImage();

        //Binds infoWindow content to each marker
        location[i].contentString = '<img src="' + streetViewImage + 
                                    '" alt="Street View Image of ' + location[i].title + '"><br><hr style="margin-bottom: 5px"><strong>' + 
                                    location[i].title + '</strong><br><p>' + 
                                    location[i].streetAddress + '<br>' + 
                                    location[i].cityAddress + '<br></p><a class="web-links" href="http://' + location[i].url + 
                                    '" target="_blank">' + location[i].url + '</a>';

        infowindow = new google.maps.InfoWindow({
            content: pointMarkers[i].contentString
        });
        //To view infoWindow when marker is clicked
            //for zooming in on and centering location on click
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
          return function() {
            var _this = this;
            if(infowindowOld !== null && markerOld !== null){
                infowindowOld.close();
                markerOld.setAnimation(null);
            }
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                infowindow.setContent(location[i].contentString);
                setTimeout(function(){infowindow.open(map,_this);},600);
                markerOld = marker;
                infowindowOld = infowindow;
            }
            var windowWidth = $(window).width();
            if(windowWidth <= 1080) {
                map.setZoom(14);
            } else if(windowWidth > 1080) {
                map.setZoom(16);  
            }
            map.setCenter(marker.getPosition());
            location[i].picBoolTest = true;
          }; 
        })(location[i].holdMarker, i));

        new google.maps.event.addListener(location[i].holdMarker,'mouseover', function(marker,i){
            var placeAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+marker.latLng.toUrlValue()+"&key=AIzaSyDiRkWeMTYD_5LyWcLef_ZMpBqBDbkGLiQ";
            $.getJSON( placeAPIURL ,{ 
                format: 'json'
            }).done( function(data){
                    if (data.status == 'OK') {  
                        var point = fromLatLngToPoint(marker.latLng, map);
                        $('#marker-tooltip').html(data.results[0].formatted_address + '<br> Latitude : '+ data.results[0].geometry.location.lat + '<br> Longitude : '+ data.results[0].geometry.location.lng).css({
                            'left': point.x,
                            'top': point.y
                        }).show();
                    } 
            });
        })

        new google.maps.event.addListener(location[i].holdMarker,'mouseout', function(marker,i){
            $('#marker-tooltip').hide();
        });
        
        //setTimeout(function(){ dropMarker(i) }, i * 1000);
        setTimeout(dropMarker(i), i * 500);
    }
}

//this Query through the different locations from navigation bar using knockout.js
    //this only display pointMarkers and navigation elements that match query result

viewModel.pointMarkers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(pointMarkers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.boolTest = true;
            return marker.visible(true);
        } else {
            marker.boolTest = false;
            setEveryMap();
            return marker.visible(false);
        }
    });       
}, viewModel);

viewModel.flickrPhotoArray = ko.observableArray([]);

ko.applyBindings(viewModel);

//to Hide and Show entire Nav/Search Bar on click
    //to Hide/Show Bound to the arrow button
    //to make Navigation elements repsonsive to smaller screen sizes
var isNavVisible = true;
function navEmpty() {
    $("#search-nav").animate({
                height: 0, 
            }, 500);
            setTimeout(function() {
                $("#search-nav").hide();
            }, 500);    
            $("#arrow").attr("src", "img/down-arrow.gif");
            isNavVisible = false;
}
function displayNav() {
    $("#search-nav").show();
            var scrollerHeight = $("#scroller").height() + 55;
            if($(window).height() < 600) {
                $("#search-nav").animate({
                    height: scrollerHeight - 100,
                }, 500, function() {
                    $(this).css('height','auto').css("max-height", 439);
                });  
            } else {
            $("#search-nav").animate({
                height: scrollerHeight,
            }, 500, function() {
                $(this).css('height','auto').css("max-height", 549);
            });
            }
            $("#arrow").attr("src", "img/up-arrow.gif");
            isNavVisible = true;
}

function vagueNav() {
    if(isNavVisible === true) {
            navEmpty();
            
    } else {
            displayNav();  
    }
}

function fromLatLngToPoint(latLng, map) {
    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = Math.pow(2, map.getZoom());
    var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
    return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

$("#arrow").click(vagueNav);

//for Hiding Nav if screen width is resized to < 850 or height < 595
//to Show Nav if screen is resized to >= 850 or height is >= 595

$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 850 && isNavVisible === true) {
            navEmpty();
        } else if($(window).height() < 595 && isNavVisible === true) {
            navEmpty();
        }
    if ($(window).width() >= 850 && isNavVisible === false) {
            if($(window).height() > 595) {
                displayNav();
            }
        } else if($(window).height() >= 595 && isNavVisible === false) {
            if($(window).width() > 850) {
                displayNav();
            }     
        }    
});






