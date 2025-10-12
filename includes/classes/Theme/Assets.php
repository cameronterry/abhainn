<?php
/**
 * Handling the enqueuing of the static assets.
 *
 * @package Abhainn
 */

namespace Abhainn\Theme;

use Abhainn\Registerable;

/**
 * Class Assets.
 */
class Assets implements Registerable {

	/**
	 * Register the assets.
	 *
	 * @return true
	 */
	public function can_register() {
		return true;
	}

	/**
	 * Add the site style to the CSS.
	 *
	 * @return void
	 */
	public function editor_styles() {
		add_editor_style( 'dist/site-style.css' );
	}

	/**
	 * Handle actions and filters for enqueuing Assets.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'admin_init', [ $this, 'editor_styles' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'site' ] );
	}

	/**
	 * Enqueue site-wide CSS and JavaScript.
	 *
	 * @return void
	 */
	public function site() {
		$path = ABHAINN_PATH . 'dist/site-js.asset.php';
		if ( ! file_exists( $path ) ) {
			return;
		}

		$deps = require $path;

		wp_enqueue_script(
			'abhainn-site-js',
			ABHAINN_URI . '/dist/site-js.js',
			$deps['dependencies'],
			$deps['version'],
			[
				'in_footer' => true,
				'strategy'  => 'async',
			]
		);

		wp_enqueue_style(
			'abhainn-site-css',
			ABHAINN_URI . '/dist/site-style.css',
			[],
			$deps['version']
		);
	}
}
