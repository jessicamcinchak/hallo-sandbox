# hallo-sandbox

Renders a list of editable html elements as React components using Hallo's live content editor.

## Dev

Requires Node v0.10.0 or newer.

	git clone REPO
	cd REPO
	npm install
	node server.js

## Lessons Learned

React v0.13.0 adds support for ES6, and this project is a prototype to adopt ES6 classes in my React code. I'm finding out that React works differently with ES6 in these ways:

* `onClick` callbacks need to be explicitly bound
* The initial state of a component is set as a property on the `constructor`, rather than using `getInitialState`. Same goes for `defaultProps` and `propTypes`
* `setProps` should only be called on the root component, not on a child. And in ES6, use `setState` instead