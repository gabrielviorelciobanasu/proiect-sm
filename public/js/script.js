function loadJSON() {
    var data_file = "http://localhost:6789/information/";
    var http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function() {
			
        if (http_request.readyState == 4  ) {
           var jsonObj = JSON.parse(http_request.responseText);
           if(jsonObj.status == "on")
           {
                document.getElementById("status").style.color = "green";
           }
           else{
                document.getElementById("status").style.color = "red";
           }
           document.getElementById("status").innerHTML = jsonObj.status;
           document.getElementById("temperature").innerHTML = jsonObj.actual_temperature;
	   document.getElementById("target").innerHTML = jsonObj.target;
	   document.getElementById("isBurning").innerHTML=jsonObj.isBurning;
           
           
        }
     }
     
     http_request.open("GET", data_file, true);
     http_request.send();

}

setInterval(loadJSON, 1000);

