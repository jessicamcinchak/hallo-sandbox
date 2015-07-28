/**
 * @jsx React.DOM
 */

/** Top level component. Main wrapper that holds a list of all editable components */
class EditableList extends React.Component {

	render() {
		return (
			<div className='wrapper' id='main'>
				<Modified />
				{this.renderList()}
				<a href="#" className="add-editable" onClick={this.addEditable.bind(this)}> Add Editable </a>
				<a href="#" className="save-editables" onClick={this.saveEditables.bind(this)}> Save Editables </a>
			</div>
		);
	}

	renderList() {
		return this.props.contentList.map((content, i) => {
			return (
				<Editable key={'editable-' + i} content={content} communicate={this.handleChildStuff.bind(this)} />
			);
		});
	}

	handleChildStuff() {
		console.log('handling');
		this.props.content = 'something';
	}

	addEditable() {
		this.props.contentList.push('New Field');
		this.forceUpdate();
	}

	saveEditables() {
		var fileName = 'test.html';
		$('.save-editables').on('click', function() {
			downloadInnerHtml(fileName, 'main','text/html');
		})
	}

	componentDidMount() {
		$('.wrapper').on('dblclick', $.fn.halloDeactivate.bind($('.editable')));
	}

	componentWillUnmount() {
	}

}

/** Child component. Editable divs that display in a list. E.g. headers, paragraphs, tables */
class Editable extends React.Component {

	render() {
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

	componentDidMount() {
		console.log(this);
		var $this = $(React.findDOMNode(this));
		$this.halloActivate();
		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
		$this.on('click', this.clickCallback);
		$this.on('hallomodified', (event, data) => {
			this.props.communicate();
			this.setState({'content': 'something'}); // Should only call on root component, not child. Also not available on ES6 class components.
			// this.props.content = 'something'; // Do this in handleChildStuff
		});
	}

	componentWillUnmount() {
		var $this = $(React.findDOMNode(this));
		$this.off('click');
		$this.off('hallomodified');
		$this.halloDeactivate();
	}

	// shouldComponentUpdate(newProps) {
	// 	// if this.props.content has changed, do not trigger update - hallo is already doing this
	// }

}

/** Child component. Tracks modified status of Editables by binding multiple hallo events onto the same class selector */
/** TODO: Track modified status of newly added fields */
class Modified extends React.Component {

	render() {
		return (
			<p className="modified">
				Editables have not been modified
			</p>
		);
	}

	componentDidMount() {
		// var $modified = $('.modified');
		// $('.editable').bind('hallomodified', function(event, data) {
		// 	$modified.html("Editable has been modified"); //detects adding and deleting characters
		// }).bind('halloselected', function(event, data) {
		// 	$modified.html("Selection made"); //detects highlighting
		// }).bind('hallounselected', function(event, data) {
		// 	$modified.html("Selection removed"); //detects un-highlighting
		// });
	}

	componentWillUnmount() {
	}

}

React.render(
 	<EditableList contentList={[1, 2, 3]} />,
 	document.body
);
