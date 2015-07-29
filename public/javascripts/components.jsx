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

	/** Replaces getInitialState when using ES6 classes */
	constructor() {
		super(); //this is new
		this.state = { editables: [
				{
					content: '',
					halloState: ''
				}
			]
		}
	}

	renderList() {
		return this.state.editables.map((editable, i) => {
			return (
				<Editable key={'editable-' + i} editable={editable} communicate={this.handleChildStuff.bind(this)} />
			);
		});
	}

	handleChildStuff() {
		console.log('handling'); //communicating
		this.props.content = 'anything'; //how to dynamically set this to read new edits?
		console.log(this); //sets 'anything' as this.props.content
	}

	addEditable() {
		this.state.editables.push({ content: 'New Field', halloState: '' });
		this.forceUpdate();
	}

	saveEditables() {
		var fileName = 'test.html';
		$('.save-editables').on('click', function() {
			downloadInnerHtml(fileName, 'main','text/html');
		})
	}

	componentDidMount() {
		$('.wrapper').on('dblclick', () => {

		});
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
					{this.props.editable.content}
				</div>
				<div className='editable__controls'>
				</div>
			</div>
		);
	}

	componentDidMount() {

		var $this = $(React.findDOMNode(this));
		
		/** Activate */
		$this.halloActivate();
		this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
		$this.on('click', this.clickCallback);
		
		/** Track modified status */
		$this.on('hallomodified', (event, data) => {
			this.props.communicate();
			this.setState({'content': 'something'});
			$('.modified').html("Editable has been modified");
		});
		$this.on('halloselected', (event, data) => {
			this.props.communicate();
			$('.modified').html("Selection made");
		});
		$this.on('hallounselected', (event, data) => {
			this.props.communicate();
			$('.modified').html("Selection removed");
		});

		/** Deactivate all editables by double clicking on wrapper */
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

	// shouldComponentUpdate(newProps) {
	// 	// if this.props.content has changed, do not trigger update - hallo is already doing this
	// }

}

/** Child component. Tracks modified status of Editables by binding multiple hallo events onto the same class selector */
class Modified extends React.Component {

	render() {
		return (
			<p className="modified">
				Editables have not been modified
			</p>
		);
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

}

React.render(
 	<EditableList />,
 	document.body
);
