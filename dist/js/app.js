function updateMapPosition(e){closeMenu(),map.setCenter(e),viewModel.clearAll();var a=new google.maps.places.PlacesService(map),n=e,o={location:n,radius:1e4,keyword:"apartment"};a.nearbySearch(o,nearbySearchCallback("apartment"));var t={location:n,radius:1e4,keyword:"groceries"};a.nearbySearch(t,nearbySearchCallback("groceries"));var r={location:n,radius:1e4,keyword:"games"};a.nearbySearch(r,nearbySearchCallback("games"));var l={location:n,radius:1e4,keyword:"movies"};a.nearbySearch(l,nearbySearchCallback("movies"));var i={location:n,radius:1e4,keyword:"parks"};a.nearbySearch(i,nearbySearchCallback("parks"))}function initMap(){var e={lat:37.335216,lng:-121.887814};map=new google.maps.Map(document.getElementById("map"),{center:e,zoom:12,fullscreenControl:!1,mapTypeControl:!1}),updateMapPosition(e)}function markerCallback(e){(e=void 0==e.place_id?this:e)!=markerSelected&&(viewModel.showPlaceInfo(e.place_id),map.setCenter(e.position),e.setAnimation(google.maps.Animation.BOUNCE),markerSelected&&markerSelected.setAnimation(null),markerSelected=e)}function unselectMarker(){markerSelected&&(markerSelected.setAnimation(null),markerSelected=void 0)}function openMenu(){var e=document.getElementById("main-menu").offsetWidth;e+="px",menuOpen=!0,document.getElementById("main-menu").style.left="0",document.getElementById("menu-toggle").style.left=e}function closeMenu(){var e=document.getElementById("main-menu").offsetWidth;e="-"+e+"px",menuOpen=!1,document.getElementById("main-menu").style.left=e,document.getElementById("menu-toggle").style.left="0"}function toggleMenu(){menuOpen?closeMenu():openMenu()}function initFilters(e){var a,n;"apartment"==e?(a="showApartments",n=viewModel.showApartments):"games"==e?(a="showGames",n=viewModel.showGames):"movies"==e?(a="showMovies",n=viewModel.showMovies):"parks"==e?(a="showParks",n=viewModel.showParks):"groceries"==e&&(a="showGroceryStores",n=viewModel.showGroceryStores),document.getElementById(a).addEventListener("click",function(){viewModel.markers.forEach(function(a){a.listingType==e&&a.setMap(n()?map:null)})})}function centerMapOnUser(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){updateMapPosition({lat:e.coords.latitude,lng:e.coords.longitude})})}var map,markerSelected,menuOpen=!1,nearbySearchCallback=function(e){return function(a,n){n==google.maps.places.PlacesServiceStatus.OK?(viewModel.load(e,a),a.forEach(function(a){var n=new google.maps.Marker({position:a.geometry.location,map:map,title:a.name,icon:{url:"img/"+e+".png",scaledSize:new google.maps.Size(20,20),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(0,10)}});n.place_id=a.place_id,n.addListener("click",markerCallback),n.listingType=e,viewModel.markers.push(n)}),initFilters(e)):console.log("nearbySearch request failed!")}};