/**
 * @jsx React.DOM
 */

/** Top level component. Main wrapper that holds a list of all editable components */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditableList = (function (_React$Component) {
	_inherits(EditableList, _React$Component);

	function EditableList() {
		_classCallCheck(this, EditableList);

		_get(Object.getPrototypeOf(EditableList.prototype), "constructor", this).apply(this, arguments);
	}

	/** Child component. Editable divs that display in a list. E.g. headers, paragraphs, tables */

	_createClass(EditableList, [{
		key: "render",
		value: function render() {
			return React.createElement("div", { className: "wrapper", id: "main" }, React.createElement(Modified, null), this.renderList(), React.createElement("a", { href: "#", className: "add-editable", onClick: this.addEditable.bind(this) }, " Add Editable "), React.createElement("a", { href: "#", className: "save-editables", onClick: this.saveEditables.bind(this) }, " Save Editables "));
		}
	}, {
		key: "renderList",
		value: function renderList() {
			var _this = this;

			return this.props.contentList.map(function (content, i) {
				return React.createElement(Editable, { key: 'editable-' + i, content: content, communicate: _this.handleChildStuff.bind(_this) });
			});
		}
	}, {
		key: "handleChildStuff",
		value: function handleChildStuff() {
			console.log('handling'); //communicating
			this.props.content; //how to dynamically set this to read new edits?
			console.log(this); //sets 'anything' as this.props.content
		}
	}, {
		key: "addEditable",
		value: function addEditable() {
			this.props.contentList.push('New Field');
			this.forceUpdate();
		}
	}, {
		key: "saveEditables",
		value: function saveEditables() {
			var fileName = 'test.html';
			$('.save-editables').on('click', function () {
				downloadInnerHtml(fileName, 'main', 'text/html');
			});
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

	/** Child component. Tracks modified status of Editables by binding multiple hallo events onto the same class selector */

	_createClass(Editable, [{
		key: "render",
		value: function render() {
			return React.createElement("div", { className: "editable" }, React.createElement("div", { className: "editable__content" }, this.props.content), React.createElement("div", { className: "editable__controls" }));
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			console.log(this);
			var $this = $(React.findDOMNode(this));

			/** Activate */
			$this.halloActivate();
			this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
			$this.on('click', this.clickCallback);

			/** Track modified status */
			$this.on('hallomodified', function (event, data) {
				_this2.props.communicate();
				_this2.setState({ 'content': 'something' });
				$('.modified').html("Editable has been modified");
			});
			$this.on('halloselected', function (event, data) {
				_this2.props.communicate();
				$('.modified').html("Selection made");
			});
			$this.on('hallounselected', function (event, data) {
				_this2.props.communicate();
				$('.modified').html("Selection removed");
			});

			/** Deactivate all editables by double clicking on wrapper */
			$('.wrapper').on('dblclick', $.fn.halloDeactivate.bind($('.editable')));
		}
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

		// shouldComponentUpdate(newProps) {
		// 	// if this.props.content has changed, do not trigger update - hallo is already doing this
		// }

	}]);

	return Editable;
})(React.Component);

var Modified = (function (_React$Component3) {
	_inherits(Modified, _React$Component3);

	function Modified() {
		_classCallCheck(this, Modified);

		_get(Object.getPrototypeOf(Modified.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Modified, [{
		key: "render",
		value: function render() {
			return React.createElement("p", { className: "modified" }, "Editables have not been modified");
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

React.render(React.createElement(EditableList, { contentList: [1, 2, 3] }), document.body);