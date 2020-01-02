# Fetch (Fallback)
Fetch functionality with fallbacks for node.js environments and environments that don't support fetch but support XMLHttpRequest. Only accepts JSON responses from API.

## Installation
### Node.js
```bash
npm i @isabroch/fetch-fallback
```

### Web
Add the script before other scripts in your HTML to get the latest version.

If you need an earlier version, change `1.1.6` to the relevant version number. You can find previous versions of Fetch (Fallback) in the Versions tab on npmjs.com
```html
<script src="https://unpkg.com/@isabroch/fetch-fallback@1.1.6/umd.js"></script>
```

## Usage

### If you're using Node.js
The following code works in all environments - so you do not have to write multiple scripts for different environments. If you are using _only_ Node.js, the if wrapper is not necessary.
```js
if (typeof exports === "object") {
  var xfetch = require("@isabroch/fetch-fallback");
}
```

### Initializing
**apiLink** should be the base URL of the API you are trying to access. For example: `https://reqres.in/api/`

**apiAuth** should be the key used to access the API, if there is one.
```js
xfetch.init({
  address: apiLink,
  key: apiAuth
});
```

### Functionality
Available functions include: `get()`, `post()`, `put()`, `del()`

**resource** is what you want from the API. For example, if you're trying to access `https://reqres.in/api/users/`, resource would be `users`. Not providing resource defaults to trying to access just the apiLink: `https://reqres.in/api/`.

**input** is specific to `post()` and `put()`. When creating/updating content, input is the new content to be pushed to the API.

**result** is the response from the API as parsed JSON, usually an object or array.

In the case of `del()`, **result** returns the status code - i.e. `204`.

Fetch Fallback is an async function, so accessing results should be done via `async/await` or `then()`.

```js
xfetch.get(resource)
.then(result => console.log(result))

xfetch.post(resource, input)
.then(result => console.log(result))

xfetch.put(resource, input)
.then(result => console.log(result))

xfetch.del(resource)
.then(result => console.log(result))
```

### Testing with Reqres
[Reqres](https://reqres.in/) is a free REST-API great for testing functionality!\
You can run the code below to test if Fetch Fallback is working properly.
```js
if (typeof exports === "object") {
  var xfetch = require("@isabroch/fetch-fallback");
}

xfetch.init({
  address: "https://reqres.in/api/",
  key: ""
});

xfetch.get("users/1")
.then(result => console.log(result))
/* EXPECTED CONSOLE LOG:
  { data:
    { id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' }
  } */


xfetch.post("users", {name: "morpheus", job: "leader"})
.then(result => console.log(result))
/* EXPECTED CONSOLE LOG:
  { name: 'morpheus',
    job: 'leader',
    id: '537',
    createdAt: '2019-12-20T09:06:36.482Z' } */

xfetch.put("users/2", {name: "morpheus", job: "zion resident"})
.then(result => console.log(result))
/* EXPECTED CONSOLE LOG:
  { name: 'morpheus',
    job: 'zion resident',
    updatedAt: '2019-12-20T09:07:31.314Z' } */

xfetch.del("users/2")
.then(result => console.log(result))
/* EXPECTED CONSOLE LOG:
  204 */
```

## Need Help?
Create an issue at [this project's issue tracker](https://github.com/isabroch/fetch-fallback-umd/issues)! Please include the following details when creating an issue:

- Context of the error; what are you trying to achieve?
- Error message you are receiving from the console
- Environment(s) you are running Fetch (Fallback) in\
  e.g. Node.js, Chrome v77, Firefox...

The more details you are able to provide from the beginning, the faster I can help you.

## License
Fetch (Fallback) uses [MIT License](https://choosealicense.com/licenses/mit/).