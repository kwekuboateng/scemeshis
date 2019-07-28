
    function getAveragerating(obj) {
      var count = 0;
      for (var i = 0; i < obj.length; i++) {
        count = count + obj[i].score
        // console.log(count);
      }
      return (count / obj.length).toFixed(1);
    }

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
          document.getElementById('logo').src = response.secure_url ;
          console.log(response.secure_url, 'na this be logo') // https address of uploaded file
        } else {
          alert("Upload failed. Please try agian.");
        }
      }
      document.getElementById('loading').style.display = 'inline-block'
      xhr.send(formData);
    }

    //upload program line up
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

    //end upload program line up



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

      http.open('POST', loginUrl, true);

         //Send the proper header information along with the request
         http.setRequestHeader("Content-Type", "application/json");

         http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 201) {
              events = http.responseText

                  localStorage.setItem('events', events)
                  document.getElementById('loading3').style.display = 'none'

                  alert('Successfully created event')
                  window.location.href = "/events.html"

          }else if (http.readyState == 4 && http.status == 400){
            alert('Please fill all fields')
          }
      }
      document.getElementById('loading3').style.display = 'inline-block'
      http.send(params);
    }


    //fetch single event

    function getSingleEvent(id){
      var http = new XMLHttpRequest();
      var loginUrl = `${baseUrl}/api/events/${id}`
      ;
      http.open('GET', loginUrl, true);
          const jwtoken = JSON.parse(localStorage.getItem('data')).token
         //Send the proper header information along with the request
         http.setRequestHeader('Authorization', 'Bearer ' + jwtoken);

         http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
              userEvent = JSON.parse(http.responseText)
              document.getElementById('loading').style.display = 'none'
             if (typeof(Storage) !== 'undefined'){
              localStorage.setItem('singleEvent', JSON.stringify(userEvent))
              }
              console.log(http, 'http')

          }
      }
      document.getElementById('loading').style.display = 'inline-block'
        http.send();
     }

    //get all events


    function eventTable() {

      var data = JSON.parse(localStorage.getItem('events'));
      // create object
      console.log(data, 'data')

      var table = document.createElement("table");
      table.id = 'dataTable';
      table.classList.add('table');
      table.classList.add('table-bordered');
      table.classList.add('text-center')

      var thead = document.createElement("thead");
      table.appendChild(thead);

      var tbody = document.createElement("tbody");
      table.appendChild(tbody);

      //Add a header
      var header = document.createElement("tr");

      var idHeaderCell = document.createElement("th");
      var nameHeader = document.createElement("th");
      var logoHeader = document.createElement("th");
      // var messageHeader = document.createElement("th");
      var pluHeader = document.createElement("th");
      var descHeader = document.createElement("th");
      var attendantHeader = document.createElement("th");
      var buttonHeader = document.createElement("th");
      // var submitHeader = document.createElement("th");
      var editHeader = document.createElement("th");
      var ratingHeader = document.createElement("th");



      idHeaderCell.innerHTML = 'Event ID'
      nameHeader.innerHTML = 'Name';
      logoHeader.innerHTML = 'Logo';
      pluHeader.innerHTML = 'PLU Link';
      // messageHeader.innerHTML = 'Message';
      descHeader.innerHTML = 'View Attendants';
      attendantHeader.innerHTML = 'No. of Attendants';
      // submitHeader.innerHTML = 'Submit Message';
      editHeader.innerHTML = 'Edit Event';
      buttonHeader.innerHTML = 'Rating Over 5';
      // ratingHeader.innerHTML = 'Ratings';

      header.appendChild(idHeaderCell);
      header.appendChild(nameHeader);
      // header.appendChild(messageHeader);
      header.appendChild(descHeader);
      header.appendChild(attendantHeader);
      // header.appendChild(submitHeader);
      header.appendChild(pluHeader);
      header.appendChild(logoHeader);
      header.appendChild(editHeader);
      header.appendChild(buttonHeader);
      // header.appendChild(ratingHeader);

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
          var pluLink = data[i].pluLink;
          var submitMessage= data[i].submitMessage
          var attendant = data[i].attendants;
          var ratings = data[i].ratings;



          var tr = document.createElement("tr");

             var idCell = document.createElement("th");
            var nameCell = document.createElement("th");
            var logoCell = document.createElement("th");
            var pluCell = document.createElement("th");
            // var messageCell = document.createElement("th");
            var descCell = document.createElement("th");
            var descbutton = document.createElement("a");
                descbutton.setAttribute('name', 'view attendant')
                descbutton.innerHTML = 'view attendants'
                descbutton.setAttribute('onclick', "window.location.href" + `="/listAttendant.html?id=${id}"`)

            var attendantCell = document.createElement("th");
            // var submitCell = document.createElement("th");
            var editCell = document.createElement("th");
            var openCell = document.createElement("th");
            var editbuttonCell = document.createElement("input");
                editbuttonCell.setAttribute('type', 'button');
                editbuttonCell.setAttribute('name', 'Edit');
                editbuttonCell.setAttribute('value', 'Edit');
                editbuttonCell.classList.add('btn-success');
                editbuttonCell.setAttribute('onclick', "window.location.href" + `="/edit-event.html?id=${id}&name=${name}&logoUrl=${logoUrl}&ratingMessage=${ratingMessage}&submitMessage=${submitMessage}&description=${description}&message=${message}&pluLink=${pluLink}"`)

            var buttonCell = document.createElement("input");
                buttonCell.setAttribute('type', 'button');
                buttonCell.setAttribute('name', 'Open');
                buttonCell.setAttribute('value', 'Open');
                buttonCell.classList.add('btn-primary');
                buttonCell.setAttribute( 'onclick',

                  "window.open" + `("/attendant-reg.html?id=${id}&name=${name}&logoUrl=${logoUrl}&ratingMessage=${ratingMessage}&submitMessage=${submitMessage}&description=${description}&message=${message}&pluLink=${pluLink}")`)

          var createplu = document.createElement('a');
              createplu.setAttribute('name', 'PLU Link');
              createplu.innerHTML = 'PLU Link';
              createplu.setAttribute('target', '_blank')
          createplu.href = pluLink ;


          var createImg = document.createElement('img');
              createImg.src = logoUrl;
              createImg.width = '100';
              createImg.height = '70';
          var ratingCell = document.createElement('th');


          idCell.appendChild(document.createTextNode(id));
          nameCell.appendChild(document.createTextNode(name));
          // messageCell.appendChild(document.createTextNode(message));
          descCell.appendChild(descbutton);
          attendantCell.appendChild(document.createTextNode(attendant.length));
          // submitCell.appendChild(document.createTextNode(submitMessage));
          pluCell.appendChild(createplu);
          logoCell.appendChild(createImg);
          editCell.appendChild(editbuttonCell);
          openCell.appendChild(buttonCell);
          ratingCell.appendChild(document.createTextNode(getAveragerating(ratings)));

          // buttonCell.appendChild()

          tr.appendChild(idCell);
          tr.appendChild(nameCell);
          // tr.appendChild(messageCell);
          tr.appendChild(descCell);
          tr.appendChild(attendantCell);
          // tr.appendChild(submitCell);
          tr.appendChild(pluCell);
          tr.appendChild(logoCell);
          tr.appendChild(editCell)
          tr.appendChild(ratingCell);

          tbody.appendChild(tr);
      }
      document.querySelector('#eventTab').appendChild(table);
  }


  function attendentTable() {

    var data = JSON.parse(localStorage.getItem('singleEvent')); // create object
      newData = data.attendants;
      dataRating = data.ratings;
      // console.log(dataRating);



    var table = document.createElement("table");
    table.id = 'dataTable';
    table.classList.add('table');
    table.classList.add('table-bordered')

    var thead = document.createElement("thead");
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    //Add a header
    var header = document.createElement("tr");


    var nameHeader = document.createElement("th");
    var emailHeader = document.createElement("th");
    var phoneHeader = document.createElement("th");
    var orgHeader = document.createElement("th");
    var positionHeader = document.createElement("th");
    // var ratingHeader = document.createElement("th");




    nameHeader.innerHTML = 'Name';
    emailHeader.innerHTML = 'Email';
    phoneHeader.innerHTML = 'Phone Number';
    orgHeader.innerHTML = 'Company'
    positionHeader.innerHTML = 'Position'
    // ratingHeader.innerHTML = 'Ratings'


    // header.appendChild(idHeaderCell);
    header.appendChild(nameHeader);
    header.appendChild(emailHeader);
    header.appendChild(phoneHeader);
    header.appendChild(orgHeader);
    header.appendChild(positionHeader);
    // header.appendChild(ratingHeader);


    thead.appendChild(header);

    //Add the rest of the data to the table
    for (var i = 0; i < newData.length; i++) {
        // var id = (i + 1);

        var name = newData[i].name;
        var email = newData[i].email;
        var phoneNumber = newData[i].phoneNumber;
        var position = newData[i].position;
        var organisation = newData[i].organisation;
        // var rating = dataRating.length;



        var tr = document.createElement("tr");

          //  var idCell = document.createElement("th");
          var nameCell = document.createElement("th");
          var emailCell = document.createElement("th");
          var phoneCell = document.createElement("th");
          var positionCell = document.createElement("th");
          var orgCell = document.createElement("th");
          // var rateCell = document.createElement("th");



        // idCell.appendChild(document.createTextNode(id));
        nameCell.appendChild(document.createTextNode(name));
        emailCell.appendChild(document.createTextNode(email));
        phoneCell.appendChild(document.createTextNode(phoneNumber));
        positionCell.appendChild(document.createTextNode(position));
        orgCell.appendChild(document.createTextNode(organisation));
        // rateCell.appendChild(document.createTextNode(rating));



        // tr.appendChild(idCell);
        tr.appendChild(nameCell);
        tr.appendChild(emailCell);
        tr.appendChild(phoneCell);
        tr.appendChild(orgCell);
        tr.appendChild(positionCell);
        // tr.appendChild(rateCell);

        tbody.appendChild(tr);
    }
    document.querySelector('#eventTab').appendChild(table);
}


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
                window.location.href = '/events.html'

                console.log(http, 'data')
            }else if (http.readyState == 4 && http.status == 400){
              document.getElementById("loading").style.display = 'none'

                  alert('Please enter correct credentials and try again')

            }
        }
        document.getElementById("loading").style.display = 'inline-block'

        http.send(params);
     }

    //logout

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


              document.getElementById('loading').innerHTML = "none"
              alert('successfully created account.')
              window.location.href = "/index.html"

                console.log(http, 'data')
            }else {
                alert('ooops. Please fill all fields and try again')
            }
        }
        document.getElementById("loading").style.display = 'inline-block'
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

        }
    }
      document.getElementById('loading3').style.display = 'inline-block'
      http.send();
   }
