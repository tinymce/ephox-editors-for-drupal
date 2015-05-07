<?php
/**
 * @file
 * Editor integration functions for EditLive.
 */
function wysiwyg_editlive_editor() {
  $editor['editlive'] = array(
	'title' => 'EditLive',
	'vendor url' => 'http://ephox.com',
	'download url' => 'http://ephox.com/download',
	'library path' => wysiwyg_get_path('editlive') . '/editlivejava',
	'libraries' => array(
	  '' => array(
		'title' => 'Default',
		'files' => array('editlivejava.js'),
	  ),
	),
	'version callback' => 'wysiwyg_editlive_version',
	'settings callback' => 'wysiwyg_editlive_settings',
	'versions' => array(
	  '9' => array(
		'js files' => array('editlive.js'),
	  ),
	),
  );
  return $editor;
}

/**
 * Detect editor version.
 *
 * @param $editor
 *   An array containing editor properties as returned from hook_editor().
 *
 * @return
 *   The installed editor version.
 */
// This appears to be used to determine which library to load from the libraries array.
function wysiwyg_editlive_version($editor) {
  // Not sure if we can programmatically get this - so I've hard coded it for now
  return '9';
}

/**
 * Return runtime editor settings for a given wysiwyg profile.
 *
 * @param $editor
 *   A processed hook_editor() array of editor properties.
 * @param $config
 *   An array containing wysiwyg editor profile settings.
 * @param $theme
 *   The name of a theme/GUI/skin to use.
 *
 * @return
 *   A settings array to be populated in
 *   Drupal.settings.wysiwyg.configs.{editor}
 */
function wysiwyg_editlive_settings($editor, $config, $theme) {
  //echo "css_setting: " . $config['css_setting'] . "     css_path: " . $config['css_path'];
  // echo "===================== DEBUGGING =====================";
  // echo "<ul>";
  // echo "<li>CSS CONFIG SETTING: " . $config['css_setting'] . "</li>";
  // echo "<li>CSS PATH SETTING: " . $config['css_path'] . "</li>";
  $cssContents = "";
  // We only want to add the CSS if the Editor CSS select list value for the editor profile is set to 'Define CSS'
  // This will put the CSS in a variable that we insert later via setStyles() in JavaScript
  if (isset($config['css_setting']) && $config['css_setting'] == 'self' && isset($config['css_path'])) {
	$calculatedCSSPath = strtr($config['css_path'], array('%b' => base_path(), '%t' => drupal_get_path('theme', variable_get('theme_default', NULL))));
	$css = getcwd() . $calculatedCSSPath;
	// echo "<li>CALCULATED CSS: " . $calculatedCSSPath . "</li>";
	$handle = fopen($css, "r");
	//echo "<li>HANDLE: " . $handle . "</li>";
	$cssContents = fread($handle, filesize($css));
	fclose($handle);
	// echo "<li>" . $cssContents . "</li>";
  } else {
	// Not really needed here for testing to make sure I know if this passes through or not
	// echo "<li>CALCULATED CSS: n/a" . "</li>";
  }
	// echo "</ul>";
  global $user;
  // echo "===================== DEBUGGING =====================";
  $settings = array(
	'downloaddir' => "/" . $editor["library path"],
	'editorcss' => $cssContents,
	'session_cookie' => session_name() . '=' . $user->sid,
  );
  return $settings;
}

