if (isSupported('fetch')){}

else {
  return await new Promise(function(resolve, reject) {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      resolve(JSON.parse(xhttp.responseText));
    }
  };
});
}

function isSupported(feature) {
  return feature in window;
}