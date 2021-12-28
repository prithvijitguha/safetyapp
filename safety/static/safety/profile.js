
const mobile = window.matchMedia("(max-width: 540px)");


//reduce size of textreview area to avoid screen leaking 
if (mobile.matches) {
    textreview = document.querySelectorAll('.submissionformclass')
    
    textreview.forEach((element) => {
        element.querySelector('.textreview').cols = 30;
    })
}

//csrf token
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


edit = document.querySelectorAll('.edit')

edit.forEach((edit) => {
    edit.addEventListener('click', () => {
        id = edit.getAttribute("data-place")
        edit_handler(id)
    })
})



cancel = document.querySelectorAll('.cancel')

cancel.forEach((can) => {
    can.addEventListener('click', () => {
        id = can.getAttribute("data-place")
        cancel_handler(id)
    })
})


submit = document.querySelectorAll('.submit')

submit.forEach((sub) => {
    sub.addEventListener('click', () => {
        id = sub.getAttribute('data-place')
        submit_handler(id)
    })
    
})


del = document.querySelectorAll('.delete')

del.forEach((del) => {
    del.addEventListener('click', () => {
        id = del.getAttribute('data-place')
        delete_handler(id)
    })
})




function edit_handler(id) {
    submit = document.getElementById(`submitreview-${id}`)
    editpage = document.getElementById(`editreview-${id}`)

    submit.style.display = "block"
    editpage.style.display = "none"
    
}


function cancel_handler(id) {
    submitpage = document.getElementById(`submitreview-${id}`)
    submitpage.style.display = "none"
    document.getElementById(`editreview-${id}`).style.display = "block"
}


function submit_handler(id) {
    submit = document.getElementById(`submitreview-${id}`)
    var name = document.getElementById(`name-${id}`).value
    var saf = document.getElementById(`safetyrating-${id}`).value
    var hyg = document.getElementById(`hygienerating-${id}`).value
    var sing = document.getElementById(`singlerating-${id}`).checked
    var coup = document.getElementById(`couplerating-${id}`).checked 
    var grp = document.getElementById(`grouprating-${id}`).checked
    var lgb = document.getElementById(`lgbtqrating-${id}`).checked
    var txt = document.getElementById(`textreview-${id}`).value 

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


    const request = new Request( `/reviewpage/${id}`,
    {headers: {'X-CSRFToken': csrftoken}});


    fetch(request,          
    {
        method: "PUT", 
        body: JSON.stringify(mydata),
        
    })
    document.getElementById(`submitreview-${id}`).style.display = "none"
    document.getElementById(`editreview-${id}`).style.display = "block"
    document.getElementById(`saferating-${id}`).innerHTML = `${saf} Stars`
    document.getElementById(`hygrating-${id}`).innerHTML = `${hyg} Stars`

    //change true/false to yes/no 
     
    recList = [sing, coup, grp, lgb,]
    

    for (i = 0; i < recList.length; i++) {
        if (recList[i] == true) { 
            recList[i] = "Yes"
        }
        else {
            recList[i] = "No"
        }
    }  

    document.getElementById(`singlerat-${id}`).innerHTML = recList[0]
    document.getElementById(`grouprat-${id}`).innerHTML = recList[2]
    document.getElementById(`lgbtqrat-${id}`).innerHTML = recList[3]
    document.getElementById(`couplerat-${id}`).innerHTML = recList[1]
    document.getElementById(`txtreview-${id}`).innerHTML = `<strong>${txt}</strong>`

     

    

  



    //safety rating system
    fivestar = document.getElementById(`safety5star-${id}`)
    fourstar = document.getElementById(`safety4star-${id}`)
    threestar = document.getElementById(`safety3star-${id}`)
    twostar = document.getElementById(`safety2star-${id}`)
    onestar = document.getElementById(`safety1star-${id}`)
    nostar = document.getElementById(`safetynostar-${id}`)


    if (saf == '5') {
        fivestar.style.display = "block"
        fourstar.style.display = "none"
        threestar.style.display = "none"
        twostar.style.display = "none"
        onestar.style.display = "none"
        nostar.style.display = "none"
    }

    else if (saf == '4') {
        fivestar.style.display = "none"
        fourstar.style.display = "block"
        threestar.style.display = "none"
        twostar.style.display = "none"
        onestar.style.display = "none"
        nostar.style.display = "none"
    }

    else if (saf == '3') {
        fivestar.style.display = "none"
        fourstar.style.display = "none"
        threestar.style.display = "block"
        twostar.style.display = "none"
        onestar.style.display = "none"
        nostar.style.display = "none"
    }

    else if (saf == '2') {
        fivestar.style.display = "none"
        fourstar.style.display = "none"
        threestar.style.display = "none"
        twostar.style.display = "block"
        onestar.style.display = "none"
        nostar.style.display = "none"
    }

    else if (saf == '1') {
        fivestar.style.display = "none"
        fourstar.style.display = "none"
        threestar.style.display = "none"
        twostar.style.display = "none"
        onestar.style.display = "block"
        nostar.style.display = "none"
    }

    else if (saf == '0') {
        fivestar.style.display = "none"
        fourstar.style.display = "none"
        threestar.style.display = "none"
        twostar.style.display = "none"
        onestar.style.display = "none"
        nostar.style.display = "block"
    }
    
    
    

     //hygiene rating change

     hygfivestar = document.getElementById(`hygiene5star-${id}`)
     hygfourstar = document.getElementById(`hygiene4star-${id}`)
     hygthreestar = document.getElementById(`hygiene3star-${id}`)
     hygtwostar = document.getElementById(`hygiene2star-${id}`)
     hygonestar = document.getElementById(`hygiene1star-${id}`)
     hygnostar = document.getElementById(`hygienenostar-${id}`)
 
     if (hyg == '5') {
         hygfivestar.style.display = "block"
         hygfourstar.style.display = "none"
         hygthreestar.style.display = "none"
         hygtwostar.style.display = "none"
         hygonestar.style.display = "none"
         hygnostar.style.display = "none"
     }
 
     else if (hyg == '4') {
         hygfivestar.style.display = "none"
         hygfourstar.style.display = "block"
         hygthreestar.style.display = "none"
         hygtwostar.style.display = "none"
         hygonestar.style.display = "none"
         hygnostar.style.display = "none"
     }
 
     else if (hyg == '3') {
         hygfivestar.style.display = "none"
         hygfourstar.style.display = "none"
         hygthreestar.style.display = "block"
         hygtwostar.style.display = "none"
         hygonestar.style.display = "none"
         hygnostar.style.display = "none"
     }
 
     else if (hyg == '2') {
         hygfivestar.style.display = "none"
         hygfourstar.style.display = "none"
         hygthreestar.style.display = "none"
         hygtwostar.style.display = "block"
         hygonestar.style.display = "none"
         hygnostar.style.display = "none"
     }
 
     else if (hyg == '1') {
         hygfivestar.style.display = "none"
         hygfourstar.style.display = "none"
         hygthreestar.style.display = "none"
         hygtwostar.style.display = "none"
         hygonestar.style.display = "block"
         hygnostar.style.display = "none"
     }
 
     else if (hyg == '0') {
         hygfivestar.style.display = "none"
         hygfourstar.style.display = "none"
         hygthreestar.style.display = "none"
         hygtwostar.style.display = "none"
         hygonestar.style.display = "none"
         hygnostar.style.display = "block"
     }


     


     //alert to user 
     var modal = document.getElementById("successmodal");
     modal.style.display = "block";
     setTimeout(function() {modal.style.display = "none";}, 1500)
 
}



function delete_handler(id) {
    deletedpost = document.getElementById(`deletedpost-${id}`)
    review = document.getElementById(`editreview-${id}`)

    const request = new Request( `/reviewpage/${id}`,
        {headers: {'X-CSRFToken': csrftoken}});


    fetch(request,          
        {
            method: "DELETE", 
            body: JSON.stringify(`${id}`)                  
        })
    review.style.display = "none";
    deletedpost.style.display = "block";
    //alert to user 
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    setTimeout(function() {modal.style.display = "none";}, 1500)
} 