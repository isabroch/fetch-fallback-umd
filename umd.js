(function (root, factory) {

  // AMD
  if (typeof define === "function" && define.amd) {
    define(["jequery"], factory);
  }
  // CommonJS
  else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  }
  // Browser Context
  else {
    root.myFetch = factory(root.jquery);
  }

}(this, function ($) {
  // our own part of the module

  function init(options) {
    this.APIAdress = options.address;
    this.APIKey = options.key;
    return this;
  }

  function isSupported(feature) {
    return feature in window;
  }


  async function get(resource) {
    let linky = this.APIAdress + resource;

    try {

      // FETCH METHOD
      if ((isSupported('fetch'))) {
        let response = await fetch(linky, {
          headers: {
            "Authorization": this.APIKey
          }
        });

        return await response.json();
      }

      // XML METHOD
      else if ((isSupported('XMLHttpRequest'))) {
        // Returning promise to match earlier formatting
        return new Promise(function (resolve, reject) {

          // Creates HTTP request template
          const xhttp = new XMLHttpRequest();

          // When response is ready, what to do with response?
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              Promise.resolve(xhttp.responseText);
            }
          };

          // What should the HTTP request do?
          xhttp.open("GET", linky, true);

          // Sends formatted HTTP request
          xhttp.send();

        })
      }

    } catch (error) {
      throw error;
    }
  }

  return {
    init,
    get
  }
}));