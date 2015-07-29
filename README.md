# hallo-sandbox

Renders a list of editable html elements as React components using Hallo's live content editor.

## Dev

Requires Node v0.10.0 or newer.

	git clone REPO
	cd REPO
	npm install
	node server.js

## Lessons Learned

* onClick callbacks need to be explicitly bound if written in ES6.
* setProps should only be called on a root component, not a child. Also, if using ES6 class components, use setState.