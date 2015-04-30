(function($) {

	// var s = document.createElement("script");
	// s.type = "text/javascript";
	// s.src = "/sites/all/libraries/textboxio/textboxio.js";
	// document.head.appendChild(s);

	var defaultConfig = {
		basePath : '/sites/all/libraries/textboxio/resources', // Default basePath is inferred from script location which fails in Drupal
	  	css : {
		stylesheets : [''],
		styles : [
				{ rule: 'p',  	text: 'block.p' },
				{ rule: 'h1',   text: 'block.h1' },
				{ rule: 'h2',   text: 'block.h2' },
				{ rule: 'h3',   text: 'block.h3' },
				{ rule: 'h4',   text: 'block.h4' },
				{ rule: 'div',  text: 'block.div' },
				{ rule: 'pre',  text: 'block.pre' }
			]
	  	},
	  	codeview : {
			enabled: true,
			showButton: true
	  	},
	  	images : {
	  		// upload : {},
			allowLocal : true
	  	},
	  	languages : ['en', 'es', 'fr', 'de', 'pt', 'zh'],
	  	// locale : '', // Default locale is inferred from client browser
	  	paste : {
			style : 'prompt'
	  	},
	  	// spelling : {},
	  	ui : {
			toolbar :  {
		  		items : [ 'undo', 'insert', 'style', 'emphasis', 'align', 'listindent', 'format', 'tools' ]
			}
	  	}
	};

 	// Attach this editor to target element
	Drupal.wysiwyg.editor.attach.textboxio = function(context, params, settings) {
		//alert('attach');
		// if (typeof textboxio !== 'undefined') {
		// 	setup();
		// } else {
		// 	setTimeout(function() {
		// 		//fjkadlsjf
		// 		setup();
		// 	}, 1000);
		// }
		// var setup = function() {
			var ta = context.getElementById(params.field);
			ta.style.display = "none";
			var div = context.createElement("div");
			var divIdName = 'tbio_id'+ Date.now();
			div.setAttribute('id',divIdName);
			div.style.width = "100%";
			div.style.height = "300px";
			ta.detach_editor = function(){
				var e = textboxio.get("#" + divIdName);
				e[0].restore();
				$('#' + divIdName).remove();
				e[0] = null;
			};
			ta.parentElement.insertBefore(div, ta);
		   var editor = textboxio.replace('#' + divIdName, defaultConfig);
			// var editor = textboxio.replace('#' + divIdName);
			var contentToSet = (ta.value);
			editor.content.set(contentToSet);
			ta.get_editor = function(){
				return editor;
			};
		// };
	};

	/**
	 * Detach a single or all editors.
	 *
	 * See Drupal.wysiwyg.editor.detach.none() for a full description of this hook.
	*/

  	Drupal.wysiwyg.editor.detach.textboxio = function(context, params, trigger) {
		//alert('detach');
		var ta = context.getElementById(params.field);
		var editor = ta.get_editor();
		ta.value = editor.content.get();
		ta.detach_editor();
		ta.style.display = "block";
  	};

	Drupal.wysiwyg.editor.instance.textboxio = {

		insert: function (content) {
			//alert('Insert');
			var ta = context.getElementById(params.field);
			var editor = ta.get_editor();
			editor.content.insertHtmlAtCursor(content);
		},

		setContent: function (content) {
			//alert('Set Content');
			var ta = context.getElementById(params.field);
			var editor = ta.get_editor();
			editor.content.set(content);
		},

		getContent: function () {
			//alert('Get Content');
			var ta = context.getElementById(params.field);
			var editor = ta.get_editor();
			return editor.content.get();
		}

  };

})(jQuery);
