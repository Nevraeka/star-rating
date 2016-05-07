star-rating
===========

### Installing
##### To install via NPM
```
npm i basic-star-rating
```

### Loading
##### ES6, Babel, & WebPack
star-rating element is built with ES6/ES2015 modules. If you want to use the source files, you may need to transpile code down and use a module loader like Babel or SystemJS. With browser support being in the state it is with regards to ES6 modules, you will need to load the source code with a module loader like Babel. There are many ways to do this but here is what is suggested using Babel...

##### ES5 & HTML Imports
Since we are not using Bower for front end management & NPM typically does not save packages to the root of our generated web component it is recommended that you use module loaders for this element. That said, you can use the star-rating HTML page as a HTML

### Usage
-----


Browser Support
---------------

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_64x64.png" width="48px" height="48px" alt="Edge logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_64x64.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Latest ✔ | Latest ✔ | Latest ✔ | IE 10+ ✔ | Latest ✔ | Latest ✔ |

Requirements
------------

Development
-----------

API
===

Attributes
----------

| Attribute Name | Required   | Type    | Example                                               | Comments                                                                                |
| -------------- | ---------- | ------- | ------------------------------------------------------| ----------------------------------------------------------------------------------------------- |
| maxvalue       |   **No**   | integer | 5                                                     | maxvalue is the total number of stars you wish to display.                              |
| src            |   **No**   | string  | "/images/my-star.png, /images/my-star-selected.png"   | This attribute is a string consisting of two urls that are comma separated in a single  |
|                |            |         |                                                       | string value. These two image paths get added as 'background-image' url's in the css    |
| size           |   **No**   | string  | 36px                                                  | size defines the height & width values in css units for each individual star            |
| value (RO)     |   **N/A**  | integer | 3                                                     | a read-only attribute that exposes the current rating value                             |

Example
=======
### <star-rating> Demos

##### Changing the image src attribute
[![changing the image src attribute](https://raw.githubusercontent.com/Nevraeka/star-rating/master/img/changing-the-image-source.png)](http://codepen.io/Nevraeka/pen/qZpryV/)

````html

<star-rating maxvalue="5"></star-rating>

````

Contributing
============

To contribute to this project all you will need is NPM installed and a love of web components. Please submit any suggestions or changes with a pull request (when possible). Here is the [Code of Conduct](https://github.com/Nevraeka/star-rating/blob/master/code-of-conduct.md) for contributions
