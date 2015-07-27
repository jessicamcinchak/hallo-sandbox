// var config = {
// 	baseClass: "test",
// 	elementClassFragment: "__",
// 	modifierClassFragment: "--"
// };

// $(function() {
// 	/** Activate editable on click by activating closest editable parent */
// 	$('.editable').on('click', $.fn.halloActivateClosestEditableParent.bind($(this)));

// 	/**
// 	 * Use hallo events to track modified status of editable
// 	 * Link multiple actions onto same class selector
// 	 */
// 	var $modified = $('#modified');
// 	$('.editable').bind('hallomodified', function(event, data) {
// 		$modified.html("Editable has been modified"); //detects adding and deleting characters
// 	}).bind('halloselected', function(event, data) {
// 		$modified.html("Selection made"); //detects highlighting
// 	}).bind('hallounselected', function(event, data) {
// 		$modified.html("Selection removed"); //detects un-highlighting
// 	});

// 	/** Paste csv data into editable, format as table, save out as JSON */
// 	$('.editable--spreadsheet').bind('hallodeactivated', function() {
// 		var $this = $(this),
// 			html = $this.html();
// 			// Add $().tableToJSON() here to convert
// 	});

// 	/** Click link to add new editable */
// 	$('body').on('click', '.add-editable', function() {
// 		var $editable = $('<div class="editable"><p></p></div>');
// 		$editable.insertBefore($(this));
// 		// Apply hallo event listeners to newly added elements individually. Once React, we'll eventually do this in a batch
// 		$editable.on('click', $.fn.halloActivateClosestEditableParent.bind($(this)));
// 	});

// 	/** Double click on wrapper to deactivate all editables */
// 	$('.wrapper').on('dblclick', $.fn.halloDeactivate.bind($('.editable')));

// 	/** Click link to save contents of all editables within the wrapper to a file */
// 	var fileName = 'test.html';
// 	$('.save-editables').click(function(){
//     	downloadInnerHtml(fileName, 'main','text/html');
// 	});

// });