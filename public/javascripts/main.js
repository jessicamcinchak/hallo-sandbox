$(function() {
	
	$('.editable').on('click', $.fn.halloActivateClosestEditableParent.bind($(this)));

	// // Future use - introduce react classes for hallo editables
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

	// Not working: Double click on wrapper to deactivate all editables
	$('.wrapper').on('dblclick', $.fn.halloDeactivate.bind($(this)));

	// Use hallo events to track modified status of editable
	// Link multiple actions onto same class selector
	var $modified = $('#modified');
	$('.editable').bind('hallomodified', function(event, data) {
		$modified.html("Editable has been modified"); //detects adding and deleting characters
	}).bind('halloselected', function(event, data) {
		$modified.html("Selection made"); //detects highlighting
	}).bind('hallounselected', function(event, data) {
		$modified.html("Selection removed"); //detects un-highlighting
	});

	$('.editable--spreadsheet').bind('hallodeactivated', function() {
		var $this = $(this),
			html = $this.html();
			// Add $().tableToJSON() here to convert
	});

	// Click link to add new editable
	$('body').on('click', '.add-editable', function() {
		$('<div class="editable"><p></p></div>').insertBefore($(this));
		// Issue: new editables don't inherit/have event listeners
		// http://stackoverflow.com/questions/15090942/jquery-even-handler-not-working-on-dynamic-content
		// http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements?lq=1
		// http://api.jquery.com/on/#direct-and-delegated-events
	});

	// Extract HTML content from all editable divs
	// Todo: Move this function into plugins
	function downloadInnerHtml(filename, elId, mimeType) {
	    var elHtml = document.getElementById(elId).innerHTML;
	    var link = document.createElement('a');
	    mimeType = mimeType || 'text/plain';

	    link.setAttribute('download', filename);
	    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
	    link.click(); 
	};

	// Click link to save contents of all editables within the wrapper to a file
	var fileName = 'test.html';
	$('.save-editables').click(function(){
    downloadInnerHtml(fileName, 'main','text/html');
	});

});