/**
 * @jsx React.DOM
 */

/** Top level component. 
 * Main wrapper that holds a list of editable components 
 */
class EditableList extends React.Component {

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

	/* Set state. (Constructor replaces getInitialState when using ES6 classes) */
	constructor() {
		super();
		this.state = {
			statusText: 'Welcome! Editables have not been modified yet.',
			editables: [
				{
					content: '<p>New Field</p>',
					type: '',
					halloState: ''
				}
			]
		}
	}

	renderList() {
		return this.state.editables.map((editable, i) => {
			return (
				<Editable key={'editable-' + i} editable={editable} callParent={this.handleChildModifications.bind(this)} />
			);
		});
	}

	handleChildModifications(status) {
		this.state.statusText = status;
		this.forceUpdate();
	}

	addEditable() {
		this.state.editables.push({ content: 'New Field', halloState: '' });
		this.forceUpdate();
	}

	saveEditables() {
		var downloadContent = this.state.editables.map(function(editable) {
			return editable.content;
		});
		console.log(downloadContent.join(' -- '));
		//later introduce node/express here to send via server?
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

	componentDidMount() {

		var $this = $(React.findDOMNode(this));
		
		/** Activate an editable */
		$this.halloActivate();

		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
		$this.on('click', this.clickCallback);
		
		/** Track the modified status by tapping onto Hallo events */
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

/** Render React component tree */
React.render(
 	<EditableList />,
 	document.body
);