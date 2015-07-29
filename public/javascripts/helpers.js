/** jQuery plugins and helper functions */
$(function() {
	$.fn.extend({ // '$.fn' extends jQuery prototype object with new methods that can be chained to the jQuery() function
		
		/**
		 * Activate editable
		 * @param {object} options - Options object with key 'event'
		 */
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

		/**
		 * Find and activate closest editable parent element. E.g. click on a paragraph and activate the whole outer div
		 * @param {event} e
		 */
		halloActivateClosestEditableParent: function(e) {
			var $this = $(this),
				$target = $(e.target),
				$toActivate = $target.closest('.editable');
			$($toActivate[0]).halloActivate({ 
				event: e, 
				deactivateSiblings: true 
			});
		},

		/**
		 * Deactivate editable
		 * @param {event} e
		 */
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

		/** 
		 * Deactivate previously active element when you activate a new element
		 * @param {event} e
		 */
		halloDeactivateSiblings: function(e) {
			var $this = $(this),
				$parent = $this.parent();
			$parent.children('.editable').each(function() {
				if ($(this)[0] !== $this[0]) {
					$(this).halloDeactivate();
				}
			});
		},

		/**
		 * TODO: successfully call this from halloActivate and halloDeactivate
		 * Extract duplicate plugin code to display formatting toolbar to own method
		 * @param {event} e
		 */
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

/** 
 * Extract HTML content from all editable divs for downloading/saving
 * @param {string} filename
 * @param {string} elId
 * @param {string} mimeType
 */
function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
};