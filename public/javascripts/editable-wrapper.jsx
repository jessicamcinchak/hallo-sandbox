/** 
 * @jsx React.DOM
 */

/** Main wrapper that holds all editable components */
var EditableWrapper = React.createClass({
	render: function() {
		return (
			<div className='wrapper'>
			</div>
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