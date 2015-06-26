$(function() {
	$.fn.extend({
		halloActivate: function(options) {
			options = options || {};
			var $this = $(this),
				$modified = $('#modified'),
				e = options.event;
			if (e != null) {
				$this.addClass('editable--active');
				$this.hallo({
					editable: true //activate hallo editables
				});
				$modified.html("Editable is active");
			}
			if (options.deactivateSiblings) { 
				$this.halloDeactivateSiblings(); 
			}
		},
		//Find and activate closest editable parent element. 
		//E.g. click on a paragraph and activate the outer div.
		halloActivateClosestEditableParent: function(e) {
			var $this = $(this),
				$target = $(e.target),
				$toActivate = $target.closest('.editable');
			$($toActivate[0]).halloActivate({ 
				event: e, 
				deactivateSiblings: true 
			});
		},
		halloDeactivate: function(e) {
			var $this = $(this);
			$this.removeClass('editable--active');
			$this.hallo({
				editable: false //deactive hallo editables
			});
			$this.trigger('hallodeactivated');
		},
		//When you activate a new element, deactive previously active element. 
		//Only one editable should be active at a time.
		halloDeactivateSiblings: function(e) {
			var $this = $(this),
				$parent = $this.parent();
			$parent.children('.editable').each(function() {
				if ($(this)[0] !== $this[0]) {
					$(this).halloDeactivate();
				}
			});
		}
	});

	$('.editable').on('click', $.fn.halloActivateClosestEditableParent.bind($(this)));

	// //Future use - introduce react classes for hallo editables
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

	//Double click on wrapper to deactivate all editables
	//NOT WORKING
	$('.wrapper').on('dblclick', $.fn.halloDeactivate.bind($(this)));

	//Use hallo events to track modified status of editable
	var $modified = $('#modified');

	$('.editable').bind('hallomodified', function(event, data) {
		$modified.html("Editable has been modified"); //detects adding and deleting characters
	}).bind('halloselected', function(event, data) {
		$modified.html("Selection made"); //detects highlighting
	}).bind('hallounselected', function(event, data) {
		$modified.html("Selection removed"); //detects un-highlighting
	});

	$('.editable--spreadsheet').bind('hallodeactivated', function() { //why is this deactivated??
		var $this = $(this),
			html = $this.html();
			//add $().tableToJSON() here to convert
	});

	$('.add-editable').on('click', function() {
		$('<div class="editable"></div>').insertBefore($(this)); 
		//issue: new editables don't have event listeners, or class="editable"
	});
});