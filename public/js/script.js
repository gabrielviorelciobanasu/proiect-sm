function loadJSON() {
    var data_file = "http://localhost:6789/information/";
    var http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function() {
			
        if (http_request.readyState == 4  ) {
           var jsonObj = JSON.parse(http_request.responseText);
           if(jsonObj.status == "ON")
           {
                document.getElementById("status").style.color = "green";
           }
           else{
                document.getElementById("status").style.color = "red";
           }
           document.getElementById("status").innerHTML = jsonObj.status;
           document.getElementById("temperature").innerHTML = jsonObj.actual_temperature;
           
        }
     }
     
     http_request.open("GET", data_file, true);
     http_request.send();
}

setInterval(loadJSON, 1000);



counter = 30;

function timerFunction()
{
    if(counter > 0)
    {
        counter--;
        document.getElementById("wait-to-start").innerHTML = "You need to wait " + counter + " seconds to start again!";
    }
    else
    {
        document.getElementById("wait-to-start").innerHTML = "";
        document.getElementById("button-start").style.backgroundColor = "green";
        document.getElementById("button-start").disabled = false;
    }
}

var timer;
document.getElementById("button-stop").disabled = true;
document.getElementById("button-stop").style.backgroundColor = "gray";
function Start()
{
    document.getElementById("button-start").disabled = true;
    document.getElementById("button-start").style.backgroundColor = "gray";
    document.getElementById("button-stop").style.backgroundColor = "red";
    document.getElementById("button-stop").disabled = false;
    

    clearInterval(timer);
    counter = 30;
}


function Stop()
{
    document.getElementById("button-stop").disabled = true;
    document.getElementById("button-stop").style.backgroundColor = "gray";
    
    timer = setInterval(timerFunction, 1000);
}