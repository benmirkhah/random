let vetButton = document.getElementById('bookappointment');
if (vetButton) { //if book apointment exists 
  vetButton.onclick = function() { //on click add vetstoria's supplied js
    let vetScript = document.createElement("script");
    vetScript.type = "text/javascript";
    vetScript.src  = "https://us.vetstoria.com/js/oabp-widget-require.min.js"; 
    document.getElementsByTagName("head")[0].appendChild(vetScript);
    vetButton.onclick = function() { //any future click does nothing
      console.log("Can load the form only once!");
    } 
  }
} else {
  console.log('Missing #bookappointment button!')
}
