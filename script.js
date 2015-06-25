$(function() {
	$.fn.extend({
		halloActivate: function(options) {
			options = options || {};
			var $this = $(this),
				e = options.event;
			if (e != null) {
				$this.addClass('editable--active');
				$this.hallo({
					editable: true //activate hallo editables
				});
			}
			if (options.deactivateSiblings) { 
				$this.halloDeactivateSiblings(); 
			}
		},
		//Activate parent element. E.g. click on a paragraph and activate the whole div.
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

	$('.wrapper').on('dblclick', function(e) {
		//what should this do? 
	});

	$('.editable--spreadsheet').bind('hallodeactivated', function() {
		var $this = $(this),
			html = $this.html(); 
			//add $().tableToJSON() here to convert
	});

	$('.add-editable').on('click', function() {
		$('<div class="editable"></div>').insertBefore($(this)); //issue: new editables don't have event listeners
	});

	/*$('#enable').button().click(function() {
		var $modified = jQuery('#modified');
		$('.editable').hallo({
			editable: true //activate editor on button click
		});
		$('.editable').bind('halloactivated', function(event, data) {
			$modified.html("Editables are active"); //detects click within editable div
			console.log(($(this).text().length)); //logs number of characters in active div
		}).bind('hallomodified', function(event, data) {
			$modified.html("Editables have been modified"); //detects adding or deleting characters
		}).bind('halloselected', function(event, data) {
			$modified.html("Selection made"); //detects highlighting characters
		}).bind('hallounselected', function(event, data) {
			$modified.html("Selection removed"); //detects un-highlighting 
		});
	});
	$('#disable').button().click(function() {
		$('.editable').hallo({
			editable: false
		}); //disable editor on button click
	});
	$('.editable').bind('hallodeactivated', function() {
		// $(this).hallo({editable:false});
	});*/

});