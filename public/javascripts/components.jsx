/**
 * @jsx React.DOM
 */

/** Top level component. Main wrapper that holds a list of all editable components */
class EditableList extends React.Component {

	renderEditableList() {
		return this.props.contentList.map(function(content, i) {
			return (
				<Editable key={'editable-' + i} content={content} />
			);
		});
	}

	render() {
		return (
			<div className='wrapper' id='main'>
				{this.renderEditableList()}
				<a href="#" className="add-editable" onClick={this.addEditable.bind(this)} >Add Editable</a>
				<a href="#" className="save-editables" onClick={this.saveEditables.bind(this)}>Save Editables</a>
			</div>
		);
	}

	addEditable() {
		this.props.contentList.push('New Field');
		this.forceUpdate();
	}

	saveEditables() {
		var fileName = 'test.html';
		$('.save-editables').click(function() {
			downloadInnerHtml(fileName, 'main','text/html');
		})
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

}

/** Child component. Editable divs that display in a list. E.g. headers, paragraphs, tables */
class Editable extends React.Component {

	componentDidMount() {
		var $this = $(React.findDOMNode(this));
		$this.halloActivate();
		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
		$this.on('click', this.clickCallback);
	}

	componentWillUnmount() {
		var $this = $(React.findDOMNode(this));
		$this.off('click');
		$this.halloDeactivate();
	}

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

}

React.render(
 	<EditableList contentList={[1, 2, 3]} />,
 	document.body
);
