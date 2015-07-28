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
		key: "renderEditableList",
		value: function renderEditableList() {
			return this.props.contentList.map(function (content, i) {
				return React.createElement(Editable, { key: 'editable-' + i, content: content });
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement("div", { className: "wrapper", id: "main" }, this.renderEditableList(), React.createElement("a", { href: "#", className: "add-editable", onClick: this.addEditable.bind(this) }, "Add Editable"), React.createElement("a", { href: "#", className: "save-editables", onClick: this.saveEditables.bind(this) }, "Save Editables"));
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
			$('.save-editables').click(function () {
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

	_createClass(Editable, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var $this = $(React.findDOMNode(this));
			$this.halloActivate();
			this.clickCallback = $.fn.halloActivateClosestEditableParent.bind($(this));
			$this.on('click', this.clickCallback);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var $this = $(React.findDOMNode(this));
			$this.off('click');
			$this.halloDeactivate();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement("div", { className: "editable" }, React.createElement("div", { className: "editable__content" }, this.props.content), React.createElement("div", { className: "editable__controls" }));
		}
	}]);

	return Editable;
})(React.Component);

React.render(React.createElement(EditableList, { contentList: [1, 2, 3] }), document.body);