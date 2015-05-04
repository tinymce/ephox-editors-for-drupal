<?php
/**
*@file
* Editor Integration functions for textboxio.
*/

function wysiwyg_textboxio_editor() {
  $editor['textboxio'] = array(
    'title' => 'TextBox.io',
    'vendor url' => 'https://ephox.com',
    'download url' => 'https://ephox.com/download',
    'library path' => wysiwyg_get_path('textboxio'),
   // Commented out for TBIO 1.1/1.2 as TBIO won't calculate the path to its other
   // files appropriately.  See textboxio-1.js for workaround
   'libraries' => array(
     '' => array(
       'title' => 'Default',
       'files' => array(
           'textboxio.js' => array('preprocess' => FALSE),
       ),
     ),
   ),
    'version callback' => 'wysiwyg_textboxio_version',
    'plugin callback' => 'wysiwyg_textboxio_plugins',
    'settings callback' => 'wysiwyg_textboxio_settings',
    'versions' => array(
      '1' => array(
        'js files' => array('textboxio-1.js'),
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
function wysiwyg_textboxio_version($editor) {
  // Not sure if we can programmatically get this - so I've hard coded it for now
  return '1';
}

/**
**
 * Return internal plugins for this editor; semi-implementation of hook_wysiwyg_plugin().
 */
// function wysiwyg_textboxio_plugins($editor) {

// 		return array(
// 					'new-button' => array(
// 										'url' => 'https://textbox.io',
// 										'path' => drupal_get_path('module', 'MYMODULE') . '/ckeditor/new-button',
// 										'buttons' => array(
// 														'new-button' => t(' Add the TextBox.io API Key here'),
// 														),
// 										'load' => TRUE,
// 										),

// 					//'new-button2' => array(
// 					//						'url' => 'http://......',
// 					//						'path' => drupal_get_path('module', 'MYMODULE') . '/ckeditor/new-button2',
// 					//						'buttons' => array(
// 					//											'new-button2' => t('add source'),
// 					//											),
// 					//						'load' => TRUE,
// 					//						),

//     				);

// }
