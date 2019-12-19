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
    this.APIAddress = options.address;
    this.APIKey = options.key;
    return this;
  }

  let fetchNode;

  if (typeof exports === "object") {
    fetchNode = require('node-fetch');
  }

  async function get(resource) {
    try {

      // NODE METHOD GET
      if (typeof exports === "object") {
        // const fetchNode = require('node-fetch');

        let response = await fetchNode(this.APIAddress + resource, {
          headers: {
            "Authorization": this.APIKey
          }
        })

        return await response.json()
      }

      // FETCH METHOD GET
      else if (typeof fetch !== 'undefined') {
        let response = await fetch(this.APIAddress + resource, {
          headers: {
            "Authorization": this.APIKey
          }
        });

        return await response.json();
      }

      // XML METHOD GET
      else if (typeof XMLHttpRequest !== 'undefined') {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.APIAddress + resource, true);
        xhttp.setRequestHeader("Authorization", this.APIkey)
        xhttp.send();
        return await new Promise(function (resolve, reject) {
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              resolve(JSON.parse(xhttp.responseText));
            }
          };
        })
      }

    } catch (error) {
      throw error;
    }
  }

  async function post(resource, data) {
    try {
      // FETCH METHOD POST
      if (typeof fetch !== 'undefined') {
        let response = await fetch(this.APIAddress + resource, {
          headers: {
            "Authorization": this.APIKey,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        });

        return await response.json();
      }

      // XML METHOD POST
      else if (typeof XMLHttpRequest !== 'undefined') {
        // Creates HTTP request template
        const xhttp = new XMLHttpRequest();

        // What should the HTTP request do?
        xhttp.open("POST", this.APIAddress + resource, true);

        // Sends formatted HTTP request
        xhttp.send();

        return await new Promise(function (resolve, reject) {
          // When response is ready, what to do with response?
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              resolve(JSON.parse(xhttp.responseText));
            }
          };
        })
      }


    } catch (error) {
      throw error;
    }
  }

  return {
    init,
    get,
    post
  }
}));