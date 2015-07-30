/**
 * @jsx React.DOM
 */

/** Top level component. 
 * Main wrapper that holds a list of editable components 
 */
class EditableList extends React.Component {

	/** Render component tree */
	render() {
		return (
			<div className='wrapper' id='main'>
				<Modified statusText={this.state.statusText} />
				{this.renderList()}
				<a href="#" className="add-editable" onClick={this.addEditable.bind(this)}> Add Editable </a>
				<a href="#" className="save-editables" onClick={this.saveEditables.bind(this)}> Save Editables </a>
			</div>
		);
	}

	/** Set state. (Constructor replaces getInitialState in React when using ES6 classes) */
	constructor() {
		super();
		this.state = {
			statusText: 'Editables have not been modified yet.',
			editables: [
				{
					content: '<p>New Field</p>',
					type: '',
					halloState: ''
				}
			]
		}
	}

	/** Renders array of editable components, assigns unique key to each, and binds to   */
	renderList() {
		return this.state.editables.map((editable, i) => {
			return (
				<Editable key={'editable-' + i} editable={editable} callParent={this.handleChildModifications.bind(this)} />
			);
		});
	}

	/** Communicate with child components, track modified status of editables */
	handleChildModifications(status) {
		this.state.statusText = status;
		this.forceUpdate();
	}

	/** Link to add new editable field */
	addEditable() {
		this.state.editables.push({ content: '<p>New Field<p>', halloState: '' });
		this.forceUpdate();
	}

	/** Link to save contents of all editables */
	saveEditables() {
		var downloadContent = this.state.editables.map(function(editable) {
			return editable.content;
		});
		console.log(downloadContent.join(' -- '));
		// Todo: use node/express to save
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

}

/** Child component. 
 * Editable divs that display in a list. E.g. headers, paragraphs, tables
 */
class Editable extends React.Component {

	render() {
		return (
			<div className='editable'>
				<div className='editable__content' dangerouslySetInnerHTML={{ __html: this.props.editable.content }}></div>
				<div className='editable__controls'>
				</div>
			</div>
		);
	}

	/** Batch-apply event listeners to all editable components */
	componentDidMount() {

		var $this = $(React.findDOMNode(this));
		
		/** Activate an editable */
		$this.halloActivate();

		/** Activate editable on click by activating closest editable parent */
		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
		$this.on('click', this.clickCallback);
		
		/** Track modified status by tapping onto Hallo events */
		$this.on('hallomodified', (event, data) => {
			// console.log(data.content);
			var content = $(data.content).html();
			this.props.editable.content = content;
			this.props.callParent('Editable has been modified');
		});

		$this.on('halloselected', (event, data) => {
			this.props.callParent("Selection made");
		});

		$this.on('hallounselected', (event, data) => {
			this.props.callParent("Selection removed");
		});

		/** Deactivate all editables by double clicking on the wrapper */
		$('.wrapper').on('dblclick', $.fn.halloDeactivate.bind($this));
	}

	componentDidUpdate() {
	}

	/* Clean up event listeners */
	componentWillUnmount() {
		var $this = $(React.findDOMNode(this));
		$this.off('click');
		$this.off('hallomodified');
		$this.off('halloselected');
		$this.off('hallounselected');
		$this.halloDeactivate();
	}

}

/** Child component.
 * Tracks modified status of Editables by binding multiple hallo events onto the same class selector.
 */
class Modified extends React.Component {

	render() {
		return (
			<p className="modified">
				{ this.props.statusText }
			</p>
		);
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

}

/** Call React.render once on most top-level component */
React.render(
 	<EditableList />,
 	document.body
);