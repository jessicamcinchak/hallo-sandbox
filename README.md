# hallo-sandbox

Renders a list of editable html elements as React components using Hallo's live content editor.

## Dev

Requires Node v0.10.0 or newer.

	git clone REPO
	cd REPO
	npm install
	node server.js

## Lessons Learned

* `onClick` callbacks need to be explicitly bound if written in ES6.
* `setProps` should only be called on a root component, not a child. And when we use ES6 class components, we need to consequently use `setState` instead.
* Also learned while transitioning to ES6, we now set state as a property on the `constructor`, rather than using `getInitialState`.