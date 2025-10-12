<?php
/**
 * Functions.php
 *
 * @package Abhainn
 */

define( 'ABHAINN_VERSION', '0.1.0' );
define( 'ABHAINN_PATH', get_template_directory() . '/' );
define( 'ABHAINN_URI', get_template_directory_uri() );
define( 'ABHAINN_INC', ABHAINN_PATH . 'includes/' );

/**
 * Ensure and then include the PSR-4 autoloader.
 */
if ( ! file_exists( ABHAINN_PATH . 'vendor/autoload.php' ) ) {
	return;
}

require_once ABHAINN_PATH . 'vendor/autoload.php';

/**
 * Load the theme.
 *
 * @return void
 */
function abhainn_load() {
	\Abhainn\Theme::instance()->load();
}
add_action( 'init', 'abhainn_load', 1 );
