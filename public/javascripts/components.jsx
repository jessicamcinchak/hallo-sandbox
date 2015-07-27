/** 
 * @jsx React.DOM
 */

/** Top level component. Main wrapper that holds all editable components */
var EditableList = React.createClass({
	renderEditableList: function() {
		return this.props.contentList.map(function(content, i) {
			return (
				<Editable key={'editable-' + i} content={content} />
			);
		});
	},
	render: function() {
		return (
			<div className='wrapper' id='main'>
				{this.renderEditableList()}
				<a href="#" className="add-editable" onClick={this.addEditable} >Add Editable</a>
			</div>
		);
	},

	addEditable: function() {
		this.props.contentList.push('New Field');
		this.forceUpdate();
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {
	}

});

/** Child component. Editable divs that display in a list. E.g. headers, paragraphs, tables */
var Editable = React.createClass({

	componentDidMount: function() {
		$this = $(React.findDOMNode(this));
		$this.halloActivate();
		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
		$this.on('click', this.clickCallback);
	},

	componentWillUnmount: function() {
		$this = $(React.findDOMNode(this));
		$this.off('click');
		$this.halloDeactivate();
	},

	render: function() {
		return (
			<div className='editable'>
				<div className='editable__content'>
					{this.props.content}
				</div>
				<div className='editable__controls'>
				</div>
			</div>
		);
	}

});

React.render(
 	<EditableList contentList={[1, 2, 3]} />,
 	document.body
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