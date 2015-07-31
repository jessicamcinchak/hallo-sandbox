/** 
 * Top level component 
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
					content: "<h1>Blog Title</h1>",
					type: '', // Ex. title, section-header, paragraph, table. How to process this dynamically when an editable is drawn, set new class like 'editable--title'?
					halloState: ''
				},
				{
					content: "I'm a paragraph. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
					type: '',
					halloState: ''
				}, 
				{
					content: "I'm another paragraph. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.",
					type: '',
					halloState: ''
				
				},
				{
					content: "<h2>Section Header</h2>",
					type: '',
					halloState: ''
				},
				{
					content: "I'm the last paragraph. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
					type: '',
					halloState: ''
				}
			]
		}
	}

	/** Renders array of editable components, assigns unique key to each, and binds to modified status of children */
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
		this.state.editables.push({ content: 'New Field', type: '', halloState: '' });
		this.forceUpdate();
	}

	/** Link to save contents of all editables */
	saveEditables() {
		var downloadContent = this.state.editables.map(function(editable) {
			return editable.content;
		});
		console.log(downloadContent.join(' -- '));
		// Todo: use node/express to save in a more sophisticated way 
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

}

/** 
 * Child component 
 * Editable divs that display in a list. E.g. headers, paragraphs, tables
 */
class Editable extends React.Component {

	render() {
		return (
			// <div className='editable-wrapper'> //add container with add button inbetween each editable
				<div ref='editable' className='editable'>
					<div className='editable__content' dangerouslySetInnerHTML={{ __html: this.props.editable.content }}></div>
				</div>
			// </div>
		);
	}

	/** Batch-apply event listeners to all editable components */
	componentDidMount() {

		var $this = $(React.findDOMNode(this.refs['editable']));
		
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

	/** React wants to rerender every time text is edited, but we just need editables to mount once with their events */
	shouldComponentUpdate() {
		return false;
	}

	/* Clean up event listeners */
	componentWillUnmount() {
		var $this = $(React.findDOMNode(this.refs['editable']));
		$this.off('click');
		$this.off('hallomodified');
		$this.off('halloselected');
		$this.off('hallounselected');
		$this.halloDeactivate();
	}

}

/** 
 * Child component
 * Tracks modified status of Editables by binding multiple hallo events onto the same class selector
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