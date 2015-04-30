(function($) {
  var editor;
  var ta;

  /**
   * Attach this editor to a target element.
   */
  Drupal.wysiwyg.editor.attach.editlive = function(context, params, settings) {
    // alert('Attaching...');
    ta = context.getElementById(params.field);
    ta.style.display = "none";

    var div = context.createElement("div");
    var divIdName = 'EL_' + Date.now();
    div.setAttribute('id',divIdName);
    div.style.width = "100%";
    div.style.height = "600px";

    ta.parentElement.insertBefore(div, ta);
    editor = new EditLiveJava('editlive', '100%', '100%');
    // This is calculated in the editlive.inc file and referenced here
    editor.setDownloadDirectory(settings.downloaddir);
    editor.setConfigurationFile(settings.downloaddir + "/configuration.xml")
    editor.setBody(encodeURIComponent(ta.value));
    //Pass in the Drupal session cookie - its HTTP Only so we have to parse this on the server
    editor.setCookie(settings.session_cookie);
    // This is calculated in the editlive.inc file and referenced here
    editor.setStyles(settings.editorcss);
    editor.showInElement(divIdName);
  };

  /**
   * Detach a single or all editors.
   *
   * See Drupal.wysiwyg.editor.detach.none() for a full description of this hook.
   */
  Drupal.wysiwyg.editor.detach.editlive = function (context, params, trigger) {
    alert('Detaching...params.name:' + params.name)
    // Needed to add the true parameter to this to ensure that local images were
    // uploaded before the editor sends the body content to the server
    ta.value = editor.getBody(true);

    // We need to "dispose" of the editor here
    // TODO: DELETE content button fails to work when EditLive is on the page
    $("#EditLiveDiv").remove();
    editor = null;
    ta.style.display = "block";
  };

  /**
   * Instance methods for editlive.
   * THESE DON'T APPEAR TO EVER BE CALLED - research tells me these may be used by the autosave module.
   * Are there other uses?
   */
  Drupal.wysiwyg.editor.instance.editlive = {
    insert: function (content) {
      // alert('Insert');
      editor.insertHTMLAtCursor(content);
    },
    setContent: function (content) {
      // alert('Set Content');
      editor.setBody(content);
    },
    getContent: function () {
      // alert('Get Content');
      return editor.getBody(true);
    }
  };
})(jQuery);
