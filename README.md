# live-editor-prototype

Renders a list of editable html elements, in the straight-forward design of a blog or similar content-entry form interface, using [React](http://facebook.github.io/react/) with [Hallo.js](http://hallojs.org) to edit text in-place.

As a technical prototype exercise, I'm using jQuery plugin helper methods to manage Hallo's events, and then I bind them to reusable React UI components. With React, my components act like functions - they take in data (as state or props) and render HTML (in this case simple text fields).  

I'm adopting ES6 classes among other new JavaScript features, supported by React v0.13.0, and compiling my code with `gulp-babel` and `gulp-react` node modules.

## Dev

Requires Node v0.10.0 or newer.

	git clone REPO
	cd REPO
	npm install
	node server.js

## Lessons Learned

I'm finding out that React works differently with ES6 in these ways:

* `onClick` callbacks need to be explicitly bound
* Initial state of a component is set as a property on the `constructor`, rather than using `getInitialState`. Same goes for `defaultProps` and `propTypes`
* `setProps` should only be called on the root component, not on a child. And in ES6, use `setState` instead