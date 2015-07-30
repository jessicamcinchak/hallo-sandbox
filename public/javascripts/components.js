/** 
 * Top level component 
 * Main wrapper that holds a list of editable components 
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditableList = (function (_React$Component) {
	_inherits(EditableList, _React$Component);

	_createClass(EditableList, [{
		key: "render",

		/** Render component tree */
		value: function render() {
			return React.createElement("div", { className: "wrapper", id: "main" }, React.createElement(Modified, { statusText: this.state.statusText }), this.renderList(), React.createElement("a", { href: "#", className: "add-editable", onClick: this.addEditable.bind(this) }, " Add Editable "), React.createElement("a", { href: "#", className: "save-editables", onClick: this.saveEditables.bind(this) }, " Save Editables "));
		}

		/** Set state. (Constructor replaces getInitialState in React when using ES6 classes) */
	}]);

	function EditableList() {
		_classCallCheck(this, EditableList);

		_get(Object.getPrototypeOf(EditableList.prototype), "constructor", this).call(this);
		this.state = {
			statusText: 'Editables have not been modified yet.',
			editables: [{
				content: "<h1>Blog Title</h1>",
				type: '', // Ex. title, section-header, paragraph, table. How to process this dynamically when an editable is drawn, set new class like 'editable--title'?
				halloState: ''
			}, {
				content: "I'm a paragraph. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
				type: '',
				halloState: ''
			}, {
				content: "I'm another paragraph. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.",
				type: '',
				halloState: ''

			}, {
				content: "<h2>Section Header</h2>",
				type: '',
				halloState: ''
			}, {
				content: "I'm the last paragraph. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
				type: '',
				halloState: ''
			}]
		};
	}

	/** 
  * Child component 
  * Editable divs that display in a list. E.g. headers, paragraphs, tables
  */

	/** Renders array of editable components, assigns unique key to each, and binds to modified status of children */

	_createClass(EditableList, [{
		key: "renderList",
		value: function renderList() {
			var _this = this;

			return this.state.editables.map(function (editable, i) {
				return React.createElement(Editable, { key: 'editable-' + i, editable: editable, callParent: _this.handleChildModifications.bind(_this) });
			});
		}

		/** Communicate with child components, track modified status of editables */
	}, {
		key: "handleChildModifications",
		value: function handleChildModifications(status) {
			this.state.statusText = status;
			this.forceUpdate();
		}

		/** Link to add new editable field */
	}, {
		key: "addEditable",
		value: function addEditable() {
			this.state.editables.push({ content: 'New Field', type: '', halloState: '' });
			this.forceUpdate();
		}

		/** Link to save contents of all editables */
	}, {
		key: "saveEditables",
		value: function saveEditables() {
			var downloadContent = this.state.editables.map(function (editable) {
				return editable.content;
			});
			console.log(downloadContent.join(' -- '));
			// Todo: use node/express to save in a more sophisticated way
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {}
	}]);

	return EditableList;
})(React.Component);

var Editable = (function (_React$Component2) {
	_inherits(Editable, _React$Component2);

	function Editable() {
		_classCallCheck(this, Editable);

		_get(Object.getPrototypeOf(Editable.prototype), "constructor", this).apply(this, arguments);
	}

	/** 
  * Child component
  * Tracks modified status of Editables by binding multiple hallo events onto the same class selector
  */

	_createClass(Editable, [{
		key: "render",
		value: function render() {
			return React.createElement("div", { className: "editable" }, React.createElement("div", { className: "editable__content", dangerouslySetInnerHTML: { __html: this.props.editable.content } }), React.createElement("div", { className: "editable__controls" }));
		}

		/** Batch-apply event listeners to all editable components */
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var $this = $(React.findDOMNode(this));

			/** Activate an editable */
			$this.halloActivate();

			/** Activate editable on click by activating closest editable parent */
			this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
			$this.on('click', this.clickCallback);

			/** Track modified status by tapping onto Hallo events */
			$this.on('hallomodified', function (event, data) {
				// console.log(data.content);
				var content = $(data.content).html();
				_this2.props.editable.content = content;
				_this2.props.callParent('Editable has been modified');
			});

			$this.on('halloselected', function (event, data) {
				_this2.props.callParent("Selection made");
			});

			$this.on('hallounselected', function (event, data) {
				_this2.props.callParent("Selection removed");
			});

			/** Deactivate all editables by double clicking on the wrapper */
			$('.wrapper').on('dblclick', $.fn.halloDeactivate.bind($this));
		}

		/** React wants to rerender every time text is edited, but we just need editables to mount once with their events */
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate() {
			return false;
		}

		/* Clean up event listeners */
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var $this = $(React.findDOMNode(this));
			$this.off('click');
			$this.off('hallomodified');
			$this.off('halloselected');
			$this.off('hallounselected');
			$this.halloDeactivate();
		}
	}]);

	return Editable;
})(React.Component);

var Modified = (function (_React$Component3) {
	_inherits(Modified, _React$Component3);

	function Modified() {
		_classCallCheck(this, Modified);

		_get(Object.getPrototypeOf(Modified.prototype), "constructor", this).apply(this, arguments);
	}

	/** Call React.render once on most top-level component */

	_createClass(Modified, [{
		key: "render",
		value: function render() {
			return React.createElement("p", { className: "modified" }, this.props.statusText);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {}
	}]);

	return Modified;
})(React.Component);

React.render(React.createElement(EditableList, null), document.body);