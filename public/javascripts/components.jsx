/** 
 * @jsx React.DOM
 */

/** Top level component. Main wrapper that holds all editable components */
var EditableWrapper = React.createClass({
	render: function() {
		return (
			<div className='wrapper' id='main'>
				<Editable />
			</div>
		);
	}
});

/** Child component. Editable divs that display in a list. E.g. headers, paragraphs, tables */
var Editable = React.createClass({
	componentDidMount: function() {
		$this = React.findDOMNode(this);
		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
		$this.on('click', this.clickCallback);
	},
	componentWillUnmount: function() {
		$this.off('click');
	},
	render: function() {
		return (
			<div className='editable'>
				<h2 className="editable">This is a h2 header</h2>
			</div>
		);
	}
});

/** Child component. Link that adds a new editable, inheriting all behavior from Editable */
var AddEditable = React.createClass({
	render: function() {
		return (
			<a href="#" class="add-editable">Add Editable</a>
		);
	}
});

/** Child component. Link that saves all editables, writes out formatted inner html */
var SaveEditables = React.createClass({
	render: function() {
		return (
			<a href="#" class="save-editables">Save Editables</a>
		);
	}
});

React.render(
	<EditableWrapper />
	document.getElementById('main')
);

	// // Future use - introduce react classes for hallo editables
	// React.createClass({
	// 	componentDidMount: function() {
	// 		$this = React.findDOMNode(this);
	// 		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
	// 		$this.on('click', this.clickCallback);
	// 	},
	// 	componentWillUnmount: function() {
	// 		$this.off('click');
	// 	},
	// 	render: function() {} //this should return div
	// 	// how to deal with state? 
	// });