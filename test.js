let myFetch = require("./umd");

myFetch.init({
  address: "https://reqres.in/api/",
  key: "1234"
});

// METHOD GET
myFetch.get("users/")
  .then(result => console.log(result));