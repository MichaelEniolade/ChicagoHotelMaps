var flickrJSON;

//Binds click handler to flickr image to open modal
$("#flickr").click(function() {
    $(".modal").css("z-index", "3");
    $(".modal").show();
});

//Binds click handler to x button to close modal
$("#exit-modal").click(function() {
    $(".modal").css("z-index", "0");
    $(".modal").hide();
    $('.flickr-image-container img').hide();
    imagesAreSet = true;
});

//GET JSON from flickr
//Display message if error getting flickr JSON
function getFlickrImages() {
        var flickrAPIURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ab2be4f78cbc26981e3fe484038ad122&text=Chicago+Hotels&accuracy=16&lat=41.881832&lon=-87.623177&format=json&jsoncallback=?';
        $.getJSON( flickrAPIURL ,{ 
        	format: 'json'
        }).done( function(data){
        		if (data.stat != 'fail') {
        			var photo = data.photos.photo;
                	flickrJSON = photo;
        		} else {
    				$('.flickr-image-container').append('<h1 style="text-align: center;">Sorry!</h1><br><h2 style="text-align: center;">Flickr Images Could Not Be Loaded</h2>');
					$("#right-arrow").hide();
					$("#left-arrow").hide();
					flickrJSON = {"length":0};
        		}
        }).fail( function(jqxhr, textStatus, error){
        	$('.flickr-image-container').append('<h1 style="text-align: center;">Sorry!</h1><br><h2 style="text-align: center;">Flickr Images Could Not Be Loaded</h2>');
			$("#right-arrow").hide();
			$("#left-arrow").hide();
			flickrJSON = {"length":0};
        });

}
getFlickrImages();

var flickrPhotoArray = [];
var counter = 0;
var imagesAreSet = false;

//Get 30 random images from flickr JSON
//Store image data in flickrPhotoArray
//Hide all images except the first
function setFlickrImages() {
	if(flickrJSON.length > 0){
		if(imagesAreSet === false) {
			for(var i=0; i < 30; i++) {
				var number = Math.floor((Math.random() * 250) + 1);
				var photo = 'https://farm' + flickrJSON[number].farm + '.staticflickr.com/' + flickrJSON[number].server + '/' + flickrJSON[number].id + '_' + flickrJSON[number].secret + '.jpg';
				flickrPhotoArray.push(photo);
				 viewModel.flickrPhotoArray.push({
				 	src:photo,
				 	alt: flickrJSON[number].title + 'Flickr Image',
				 	id:'flickr-image' + i 
				 });

			}
			$(".flickr-image-container").children().hide();
			$($(".flickr-image-container").children()[0]).show();
		} else {
			$("#flickr-image" + counter).show();
		}
	}
}
$("#flickr").click(setFlickrImages);

//Bind click handler to arrow button to view next image
function scrollForward() {
	$('#flickr-image' + counter).hide();
	counter += 1;
	if(counter >= 29) {
		counter = 0;
	}
	$('#flickr-image' + counter).fadeIn(300);	
}

//Bind click handler to arrow button to view previous image
function scrollBackWard() {
	$('#flickr-image' + counter).hide();
	counter -= 1;
	if(counter < 0) {
		counter = 29;
	}
	$('#flickr-image' + counter).fadeIn(300);	
}	
//$("#flickr-image").show();
$("#right-arrow").click(scrollForward);
$("#left-arrow").click(scrollBackWard);        