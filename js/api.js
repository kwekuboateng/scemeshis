    //global variables

    //cloudinary image upload 
    function clickInput1(){
      document.getElementById("file").click();
    }
    function clickInput2(){
      document.getElementById("runinput").click()
    }

    //upload logo
    function uploadLogo() {
      
      // document.querySelector('#runinput').click()
      var formData = new FormData(),
        file = document.getElementById("file").files[0],
        xhr = new XMLHttpRequest(),
        cloudName = "ds0zewglg";
        console.log(file, 'file')
    
      formData.append("file", file);
      formData.append("upload_preset", "fy9bo9ll"); // REQUIRED
      xhr.open("POST", "https://api.cloudinary.com/v1_1/" +
        cloudName +
        "/image/upload");
    
      xhr.onload = () => {
        if (xhr.status === 200) {
          // Success! You probably want to save the URL somewhere
          document.getElementById('loading').style.display = 'none'
          var response = JSON.parse(xhr.response);
          document.getElementById('logo').src = response.secure_url;
          console.log(response.secure_url, 'na this be logo') // https address of uploaded file
        } else {
          alert("Upload failed. Please try agian.");
        }
      }
      document.getElementById('loading').style.display = 'inline-block'
      xhr.send(formData);
    }

    //upload program line
    function uploadProgramLineUp() {
      
      // document.querySelector('#runinput').click()
      var formData = new FormData(),
        file = document.getElementById("runinput").files[0],
        xhr = new XMLHttpRequest(),
        cloudName = "ds0zewglg";
        console.log(file, 'file')
    
      formData.append("file", file);
      formData.append("upload_preset", "fy9bo9ll"); // REQUIRED
      xhr.open("POST", "https://api.cloudinary.com/v1_1/" +
        cloudName +
        "/image/upload");
    
      xhr.onload = () => {
        if (xhr.status === 200) {
          // Success! You probably want to save the URL somewhere
          document.getElementById('loading1').style.display = 'none'
          var response = JSON.parse(xhr.response);
          document.getElementById('plu').src = response.secure_url;
           // https address of uploaded file
        } else {
          alert("Upload failed. Please try agian.");
        }
      }
      document.getElementById('loading1').style.display = 'inline-block'
      xhr.send(formData);
    }
  


    var baseUrl = 'https://marakesh-api.herokuapp.com'

    //create event
    function createEvents (){
      var http = new XMLHttpRequest();
      var loginUrl = `${baseUrl}/api/events` 
      var params = JSON.stringify({
        name: document.querySelector('#eventName').value,
        createdBy: JSON.parse(localStorage.getItem('data')).id,
        logoUrl: document.querySelector('#logo').src,
        message: document.querySelector('#message2').value,
        description: document.querySelector('#description').value,
        submitMessage: document.querySelector('#submitMessage').value,
        ratingMessage: document.querySelector('#rating1').value,
        pluLink: document.querySelector('#plu').src
      });
      console.log(JSON.parse(params), 'parrrams');
      http.open('POST', loginUrl, true);
 
         //Send the proper header information along with the request
         http.setRequestHeader("Content-Type", "application/json");

         http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
              events = http.responseText

              
            document.getElementById('loading3').style.display = "none"
           
              
                  localStorage.setItem('events', events)
             
              console.log(http, 'events')
          }
      }
        document.getElementById('loading3').style.display = 'inline-block'
        http.send(params);
        
    }
    var tring = JSON.parse(localStorage.getItem('events'))
    console.log(tring, 'tttii')
    //get all events 
    var globalCounter = 0;
    var tbody = document.getElementById('tbody');


    function example() {
     
      var data = JSON.parse(localStorage.getItem('events')); // create object
     
      var table = document.createElement("table");
      table.id = 'dataTable';
      console.log(table, 'tabll')
  
      var thead = document.createElement("thead");
      table.appendChild(thead);
  
      var tbody = document.createElement("tbody");
      table.appendChild(tbody);
  
      //Add a header
      var header = document.createElement("tr");
  
      var idHeaderCell = document.createElement("th");
      var nameHeader = document.createElement("th");
      var logoHeader = document.createElement("th");
      var messageHeader = document.createElement("th");
      var descHeader = document.createElement("th");    
      var ratingHeader = document.createElement("th");
      var buttonHeader = document.createElement("th");

      
     
      nameHeader.innerHTML = 'Name';
      logoHeader.innerHTML = 'Logo';
      messageHeader.innerHTML = 'Message';
      descHeader.innerHTML = 'Description';
      ratingHeader.innerHTML = 'Rating Message'
      buttonHeader.innerHTML = 'Attendant Page'
  
      // header.appendChild(idHeaderCell);
      header.appendChild(nameHeader);
      header.appendChild(messageHeader);
      
     
      header.appendChild(descHeader);
     
      header.appendChild(ratingHeader);
      header.appendChild(logoHeader);
      header.appendChild(buttonHeader);
   
      thead.appendChild(header);
  
      //Add the rest of the data to the table
      for (var i = 0; i < data.length; i++) {
          // var id = (i + 1);
          var id = data[i].id
          var name = data[i].name;
          var logoUrl = data[i].logoUrl;
          var ratingMessage = data[i].ratingMessage;
          var description = data[i].description;
          var message = data[i].message;
          var pluLink = data[i].pluLink

  
          var tr = document.createElement("tr");
  
            //  var idCell = document.createElement("th");
            var nameCell = document.createElement("th");
            var logoCell = document.createElement("th");
            var messageCell = document.createElement("th");
            var descCell = document.createElement("th");    
            var ratingCell = document.createElement("th");
            var buttonCell = document.createElement("input");
                buttonCell.setAttribute('type', 'button');
                buttonCell.setAttribute('name', 'Open');
                buttonCell.setAttribute('value', 'Open');
                buttonCell.classList.add('btn-primary');

               
                buttonCell.addEventListener('click', function(event) {
                  // Stop the link from redirecting
                  event.preventDefault();
              
                  // Redirect instead with JavaScript
                  window.open(`/attendant-reg.html?id=${id}&name=${name}&logoUrl=${logoUrl}&ratingMessage=${ratingMessage}&description=${description}&message=${message}&pluLink=${pluLink}`)
                 
              }, false);
               

          var createImg = document.createElement('img');
              createImg.src = logoUrl;
              createImg.width = '100';
              createImg.height = '70';

        
  
          // idCell.appendChild(document.createTextNode(id));
          nameCell.appendChild(document.createTextNode(name));
          messageCell.appendChild(document.createTextNode(message));
          descCell.appendChild(document.createTextNode(description));
          ratingCell.appendChild(document.createTextNode(ratingMessage));
          logoCell.appendChild(createImg);
          // buttonCell.appendChild()
  
          // tr.appendChild(idCell);
          tr.appendChild(nameCell);
          tr.appendChild(messageCell);
          tr.appendChild(descCell);
          tr.appendChild(ratingCell);
          tr.appendChild(logoCell);
          tr.appendChild(buttonCell);
  
          tbody.appendChild(tr);
      }
      document.querySelector('#dataTable').appendChild(table);
  }
  
    // const getAllEvents = () => {
     
    // }

     //login


     function login (){
        var http = new XMLHttpRequest();
         var loginUrl = `${baseUrl}/api/users/login` 
 
         var params = JSON.stringify({
             email: document.getElementById('exampleLoginEmail').value,
             password: document.getElementById('exampleLoginPassword').value
         });
         console.log(params, 'params')
         http.open('POST', loginUrl, true);
 
         //Send the proper header information along with the request
         http.setRequestHeader("Content-Type", "application/json");

         http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                data = http.responseText

                
              document.getElementById('loading').innerHTML = ""

               
                if (typeof(Storage) !== 'undefined'){
                    localStorage.setItem('data', data)
                }
                window.location.href = '/dashboard.html'
               
                console.log(http, 'data')
            }else{
              alert('please enter correct credentials')
            }
        }
        document.getElementById("loading").innerHTML = '<img src="https://sabarimala.keralartc.com/img/loading.gif" />'
        http.send(params);
     }

     function logout (){
       localStorage.clear();
       window.location.href = '/'
     }

     //register 

     function register(){
        var http = new XMLHttpRequest();
        var registerUrl = `${baseUrl}/api/users/register`

        var params = JSON.stringify({
            name:   document.getElementById('exampleInputName').value,
            email: document.getElementById('exampleInputEmail').value,
            password: document.getElementById('exampleInputPassword').value
        });
        console.log(params, 'params')
        http.open('POST', registerUrl, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-Type", "application/json");


        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 201) {
                data = http.responseText

                
              document.getElementById('loading').innerHTML = ""

              window.location.href = "/index.html"
                
                console.log(http, 'data')
            }else {
                console.log(http, 'error')
            }
        }
        document.getElementById("loading").innerHTML = '<img src="https://sabarimala.keralartc.com/img/loading.gif" />'
        http.send(params);
        
     }


   //fetch events 
   function getEvents (){
    var http = new XMLHttpRequest();
    var loginUrl = `${baseUrl}/api/users/${JSON.parse(localStorage.getItem('data')).id}` 
    ;
    http.open('GET', loginUrl, true);
        const jwtoken = JSON.parse(localStorage.getItem('data')).token
       //Send the proper header information along with the request
       http.setRequestHeader('Authorization', 'Bearer ' + jwtoken);

       http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            userEvents = JSON.parse(http.responseText)
            events = userEvents.events
            
           document.getElementById('loading3').style.display = "none"

           if (typeof(Storage) !== 'undefined'){
            localStorage.setItem('events', JSON.stringify(events))
            }
           
            console.log(events, 'events')
        }
    }
      document.getElementById('loading3').style.display = 'inline-block'
      http.send();
   }

     //populate dashboard
     function displayContent(){
      var displayName = document.querySelector('#displayName');  

      if(localStorage.getItem('data')){
          let data = JSON.parse(localStorage.getItem('data'));
          displayName.textContent = data.name;
      };
        getEvents();
     
        example();
    }
   

 
  document.body.onload = displayContent;
 
  
