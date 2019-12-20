(function (root, factory) {

  // AMD
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  }
  // CommonJS
  else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  }
  // Browser Context
  else {
    root.xfetch = factory(root.jquery);
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
      else if (typeof fetch === 'function') {
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

      // NODE METHOD POST
      if (typeof exports === "object") {
        let response = await fetchNode(this.APIAddress + resource, {
          headers: {
            "Authorization": this.APIKey,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        })

        return await response.json()
      }

      // FETCH METHOD POST
      if (typeof fetch === 'function') {
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
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", this.APIAddress + resource, true);
        xhttp.setRequestHeader("Content-Type", "application/json")
        xhttp.setRequestHeader("Authorization", this.APIkey)
        xhttp.send(JSON.stringify(data));
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

  async function put(resource, data) {
    try {

      // NODE METHOD PUT
      if (typeof exports === "object") {
        let response = await fetchNode(this.APIAddress + resource, {
          headers: {
            "Authorization": this.APIKey,
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify(data)
        })

        return await response.json()
      }

      // FETCH METHOD PUT
      if (typeof fetch === 'function') {
        let response = await fetch(this.APIAddress + resource, {
          headers: {
            "Authorization": this.APIKey,
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify(data)
        });

        return await response.json();
      }

      // XML METHOD PUT
      else if (typeof XMLHttpRequest !== 'undefined') {
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", this.APIAddress + resource, true);
        xhttp.setRequestHeader("Content-Type", "application/json")
        xhttp.setRequestHeader("Authorization", this.APIkey)
        xhttp.send(JSON.stringify(data));
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

  async function del(resource) {
    try {

      // NODE METHOD DELETE
      if (typeof exports === "object") {
        let response = await fetchNode(this.APIAddress + resource, {
          headers: {
            "Authorization": this.APIKey,
          },
          method: "DELETE",
        })

        return await response.status;
      }

      // FETCH METHOD DELETE
      if (typeof fetch === 'function') {
        let response = await fetch(this.APIAddress + resource, {
          headers: {
            "Authorization": this.APIKey,
          },
          method: "DELETE",
        });

        return await response.status;
      }

      // XML METHOD DELETE
      else if (typeof XMLHttpRequest !== 'undefined') {
        const xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", this.APIAddress + resource, true);
        xhttp.setRequestHeader("Authorization", this.APIkey)
        xhttp.send();
        return await new Promise(function (resolve, reject) {
          xhttp.onreadystatechange = function () {
            resolve(xhttp.status);
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
    post,
    put,
    del
  }
}));