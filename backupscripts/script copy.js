
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const mobile = window.matchMedia("(max-width: 540px)");

function initMap() {

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 12.9715987, lng: 77.5945627},
    zoom: 16,
    disableDefaultUI: true,
    zoomControl: true
    
  });




var input = document.getElementById('searchInput');
map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

input.style.width = "75%";

var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds', map);


var infowindow = new google.maps.InfoWindow();


//click to get users location
const locationButton = document.createElement("button");
locationButton.textContent = "Current Location";
locationButton.classList.add("custom-map-control-button");
map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
locationButton.addEventListener('click', function() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude, 
                lng: position.coords.longitude,
            }
            infowindow.setPosition(pos);
            infowindow.setContent("You are here");
            infowindow.open(map);
            map.setCenter(pos);
        }
        
    )
}
})


markerlist = []


var marker = new google.maps.Marker({map: map});


map.addListener('click', (IconMouseEvent) => {
   id = IconMouseEvent.placeId
   
   if (id != null || id != undefined ) {


   var request = {
    placeId: id,
    fields: ['name', 'place_id', 'formatted_address', 'photos']
  };
  
  service = new google.maps.places.PlacesService(map);

  service.getDetails(request, callback); 

  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      data_handler(place);
        }
    }
}
})

autocomplete.addListener('place_changed', function() {
infowindow.close();
marker.setVisible(false);
const place = autocomplete.getPlace();

if (!place.geometry) {
    window.alert("Please enter a valid search query");
    return;
}

// If the place has a geometry, then present it on a map.
if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
} else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
}
marker.setIcon(({
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(35, 35),
    
}));
marker.setPosition(place.geometry.location);
marker.setVisible(true);






 
//Incase About button is clicked

document.getElementById('aboutuslink').addEventListener('click', function() {
    document.getElementById('about').style.display = "block";
    
aboutmodal = document.getElementById('about');

window.onclick = function(event) {
    if (event.target == aboutmodal) {
      aboutmodal.style.display = "none";
   }
}

})


data_handler(place) 

     
});

}









//function that handles viewing, submitting reviews
function data_handler(place) {

      //fetch results place_id to fill up review aggregate on location selection
      fetch(`/review/${place.place_id}`, {
        method: "GET"
         }) 

         .then((response) => {
            return response.json()
          })
          .then((data) => {
            var saf = data.placesafety
            var hyg = data.placehygiene
            var sing = data.placesingle
            var coup = data.placecouple
            var grp = data.placegroup
            var lgbtq = data.placelgbtq
            var total = data.total
            var test = JSON.parse(data.test)   

            
            if (document.getElementById('submissionform').style.display = "block") {
                document.getElementById('submissionform').style.display = "none";
            }
           
            
               //5 star safety system
           document.getElementById('safety5star').style.display = "none"; 
           document.getElementById('safety4star').style.display = "none";
           document.getElementById('safety3star').style.display = "none";
           document.getElementById('safety2star').style.display = "none";
           document.getElementById('safety1star').style.display = "none";
           document.getElementById('safetynostar').style.display = "block";
            
           //5 star hygiene system
           document.getElementById('hygiene5star').style.display = "none"; 
           document.getElementById('hygiene4star').style.display = "none";
           document.getElementById('hygiene3star').style.display = "none";
           document.getElementById('hygiene2star').style.display = "none";
           document.getElementById('hygiene1star').style.display = "none";
           document.getElementById('hygienenostar').style.display = "block";

           
           document.getElementById('establishment').innerHTML = place.name;
           document.getElementById('location').innerHTML = place.formatted_address;
          
          
           document.getElementById('Single').innerHTML = `${sing} recommended, based on ${total} reviews   `;
           document.getElementById('Couple').innerHTML = `${coup} recommended, based on ${total} reviews`;
           document.getElementById('Group').innerHTML = `${grp} recommended, based on ${total} reviews`;
           document.getElementById('Lgbtq').innerHTML = `${lgbtq} recommended, based on ${total} reviews`;
           document.getElementById('safetytotal').innerHTML = `${saf} based on ${total} reviews`;
           document.getElementById('hygienetotal').innerHTML = `${hyg} based on ${total} reviews`;
           //change the below function to check for reviews to publish


           //reset searchbox 
           document.getElementById('searchInput').value = ""
           
               //text review display logic. If null review dont display. Else show review 
               if (test[0] != null && test[0] != undefined && test[0] != "") {
                   document.getElementById('userreview').style.display = "block";
                   document.getElementById('userreview').innerHTML = '<strong>' + '"' + test[0] + '"' + '</strong>' 
                   
               }

               else {
                   document.getElementById('userreview').style.display = "none";
               }

            

           //logic for choosing which safety star shows up 
            if (4.5 <= saf && saf <= 5) {
               document.getElementById('safety5star').style.display = "block";
               
               document.getElementById('safetynostar').style.display = "none";
            }
            else if (3.5 <= saf && saf < 4.5)
            {
               
               document.getElementById('safety4star').style.display = "block";
              
               document.getElementById('safetynostar').style.display = "none";
            }
            else if (2.5 <= saf && saf < 3.5)
            {
               
               document.getElementById('safety3star').style.display = "block";
               
               document.getElementById('safetynostar').style.display = "none";
            }
            else if (1.5 <= saf && saf < 2.5)
            {
               
               document.getElementById('safety2star').style.display = "block";
           
               document.getElementById('safetynostar').style.display = "none";
            }
            else if (0.5 <= saf  && saf < 1.5)
            {
               document.getElementById('safety1star').style.display = "block";
               document.getElementById('safetynostar').style.display = "none";
            }
            
            else
            {
                document.getElementById('safetynostar').style.display = "block";
            }



            //logic for which star shows up for hygiene
            if (4.5 <= hyg && hyg <= 5) {
            document.getElementById('hygiene5star').style.display = "block"; 
            document.getElementById('hygienenostar').style.display = "none";
            }
            else if (3.5 <= hyg && hyg < 4.5)
            {
                document.getElementById('hygiene4star').style.display = "block"; 
                document.getElementById('hygienenostar').style.display = "none";
            }
            else if (2.5 <= hyg && hyg < 3.5)
            {
                document.getElementById('hygiene3star').style.display = "block";
                document.getElementById('hygienenostar').style.display = "none";
            }
            else if (1.5 <= hyg && hyg < 2.5)
            {
                document.getElementById('hygiene2star').style.display = "block"; 
                document.getElementById('hygienenostar').style.display = "none";
            }
            else if (0.5 <= hyg  && hyg < 1.5)
            {
                document.getElementById('hygiene1star').style.display = "block"; 
                document.getElementById('hygienenostar').style.display = "none";
            }
            
            else
            {
            document.getElementById('hygienenostar').style.display = "block";
            }      
            
    
            
             //added photos to search results 

             var photos = place.photos;

             if (photos == null || photos.length < 3)  {
             document.getElementById('photoblock').style.display = "none"
             }
                 
             else if (photos.length >= 3) {
             document.getElementById('photo1').src = photos[0].getUrl();
             document.getElementById('photo2').src = photos[1].getUrl();
             document.getElementById('photo3').src = photos[2].getUrl();
             document.getElementById('photoblock').style.display = "block";
             document.getElementById('photoblock').style.left = "1%";
             }

        
        
           //below takes care of Anonymous user so they cant add reviews

           if (document.getElementById('checkuser').innerHTML == "None") {
            document.getElementById('addreviewbtn').disabled = true;
            document.getElementById("notloggedinwarning").style.display = "block";
            }

           



            //fill up submission form
            fetch(`/reviewpage/${place.place_id}`, {
                method: "GET"
            })
            .then((response) => {
                return response.json()
              })
              .then((data) => {
                   //pre check boxes
                document.getElementById('submissionform').reset()               
                document.getElementById('name').value = place.name;
                document.getElementById('name').disabled = true;                               
                document.getElementById('safetyrating').value = data.placesaf;
                document.getElementById('hygienerating').value = data.placehyg;
                
                document.getElementById('result').setAttribute('data-place', place.place_id)

                

            //pre fill submission form
                   
        
            if (data.placereview == null || data.placereview == undefined){
                document.getElementById('textreview').value = "" 
            }
            else {
            document.getElementById('textreview').value = data.placereview; 
            }
               //single rating box 
               
               if (data.placesing == 'True') {
                document.getElementById('singlerating').checked = true;
               }
               
               else {
                document.getElementById('singlerating').checked = false;
               }

               // couple rating box 

               if (data.placecoup == 'True') {
                document.getElementById('couplerating').checked = true;
               }
               
               else {
                document.getElementById('couplerating').checked = false;
               }

               //group rating box 

               if (data.placegrp == 'True') {
                document.getElementById('grouprating').checked = true;
               }
               
               else {
                document.getElementById('grouprating').checked = false;
               }


               if (data.placelgbtq == 'True') {
                document.getElementById('lgbtqrating').checked = true;
               }
               
               else {
                document.getElementById('lgbtqrating').checked = false;
               }

                    
            


            //close dialogue box incase search starts:


            if (mobile.matches) {
                document.getElementById('intro').style.display = "none";
                document.getElementById('map').style.display = "block"; 
                document.getElementById('map').style.height = "300px";
               
               
             }
            else {
               
                document.getElementById('intro').style.display = "none";
                document.getElementById('map').style.display = "block";            
                document.getElementById('map').style.cssFloat = "none";
                document.getElementById('map').style.width = "45%";
                document.getElementById('map').style.cssFloat = "left";
                
            }

             
            })

     
           
            //map closes and results shows up 
            // for mobile devices only 
            if (mobile.matches) {
                document.getElementById('result').style.display = "block";
             
            }
            //desktop devices
            else {
            
            document.getElementById('map').style.overflow = "hidden";
                   
            document.getElementById('result').style.display = "block";
            }

            

            //close review and open map to search again
            document.getElementById('closereviewbtn').addEventListener('click', function() {
                   
                if (mobile.matches) {
                    document.getElementById('map').style.height= "400px";
                    
                }

                else {
                    document.getElementById('map').style.width = "75%";
                    document.getElementById('map').style.float = "none";

                }

                
                document.getElementById('result').style.display = "none";
            })
        

           // fetch reviewpage form against place_id to be submitted. This is personal review, user has submitted or for new review
           
           document.getElementById('addreviewbtn').addEventListener('click', function() {
          
        
           document.getElementById('submissionform').style.display = "block"; 
           
                //Adjusting form placement 

                //mobile devices
                if (mobile.matches) {
                document.getElementById('submitreview').style.display = "block";
                document.getElementById('result').style.display = "none";
                document.getElementById('submitreview').style.display = "block";
                document.getElementById('textreview').cols = "30"
                }
                
                //desktop devices
                else {
              
                document.getElementById('submitreview').style.display = "block";
                document.getElementById('result').style.display = "none";
                document.getElementById('submitreview').style.display = "block";

                }

                     // cancel button sends you back to homescreen      
            document.getElementById('cancelbtn').addEventListener('click', function(){
            document.getElementById('result').style.display = "block"; 
         
            document.getElementById('submitreview').style.display = "none";
        

        })

    
    //submit review/alter review
    document.getElementById('submitbtn').addEventListener('click', function() {

        var name = document.getElementById('name').value
        var saf = document.getElementById('safetyrating').value
        var hyg = document.getElementById('hygienerating').value
        var sing = document.getElementById('singlerating').checked
        var coup = document.getElementById('couplerating').checked 
        var grp = document.getElementById('grouprating').checked
        var lgb = document.getElementById('lgbtqrating').checked
        var txt = document.getElementById('textreview').value 
        var place = document.getElementById('result').getAttribute('data-place')

        if (txt.value == "") {
            txt.value == null
        }

    
        var mydata = {
            "placename": name, 
            "safrat": saf, 
            "hygrat": hyg, 
            "singrat": sing, 
            "couprat": coup, 
            "grprat": grp, 
            "lgbrat": lgb, 
            "txtreview": txt,
        }; 


        const request = new Request( `/reviewpage/${place}`,
            {headers: {'X-CSRFToken': csrftoken}});
    
        fetch(request,          
        {
            method: "PUT", 
            body: JSON.stringify(mydata),
          
        })
        .then(function() 
    {
        document.getElementById('submitreview').style.display = "none";
        document.getElementById('submissionform').reset()
        document.getElementById('map').style.cssFloat = "none";
        document.getElementById('map').style.width = "75%";
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        modal.style.display = "block";
        setTimeout(function() {modal.style.display = "none";}, 1800)
        //reset map for search after submission
        if (mobile.matches) {
            document.getElementById('map').style.height = "400px";
        }
        else {
            document.getElementById('map').style.height = "650px";
        }
     })
    
})

})


   
});

};


        