//jQuery plugins and helper functions
$(function() {
	$.fn.extend({ // $.fn extends jQuery prototype object with new methods that can be chained to the jQuery() function
		halloActivate: function(options) {
			options = options || {};
			var $this = $(this),
				$modified = $('#modified'),
				e = options.event;
			if (e != null) {
				$this.addClass('editable--active');
				$this.hallo({
					editable: true, //activate hallo editables
					plugins: { //add basic editing toolbar (no icon images yet). Issue: Shows on first active editable, then "not found"
						'halloformat': {
							'bold': true,
							'italic': true
						}
					},
					toolbar: 'halloToolbarFixed'
				});
				// $this.halloShowToolbar();
				$modified.html("Editable is active");
			}
			if (options.deactivateSiblings) { 
				$this.halloDeactivateSiblings(); 
			}
		},
		// Find and activate closest editable parent element
		// E.g. click on a paragraph and activate the whole outer div
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
				editable: false, //deactive hallo editables
				plugins: {
					'halloformat': {
						'bold': true,
						'italic': true
					}
				},
				toolbar: 'halloToolbarFixed' //duplicated from above, but by adding again it shows up on all active editables
			});
			// $this.halloShowToolbar();
			$this.trigger('hallodeactivated');
		},
		// When you activate a new element, deactivate previously active element
		halloDeactivateSiblings: function(e) {
			var $this = $(this),
				$parent = $this.parent();
			$parent.children('.editable').each(function() {
				if ($(this)[0] !== $this[0]) {
					$(this).halloDeactivate();
				}
			});
		},
		// Extract duplicate plugin code to own method.
		// Todo: successfully call this from halloActivate and halloDeactivate
		halloShowToolbar: function(e) {
			var $this = $(this);
			$this.hallo({
				plugins: {
					'halloformat': {
						'bold': true,
						'italic': true
					}
				},
				toolbar: 'halloToolbarFixed'
			});
		}
	});
});

// Extract HTML content from all editable divs
// Todo: Should this helper function be a plugin method instead?
function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
};