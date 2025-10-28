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
	 * Enqueue scripts and styles for the admin area.
	 *
	 * @return void
	 */
	public function admin() {
		$path = ABHAINN_PATH . 'dist/block-editor.asset.php';
		if ( ! file_exists( $path ) ) {
			return;
		}

		$deps = require $path;

		wp_enqueue_script(
			'abhainn-block-editor',
			ABHAINN_URI . '/dist/block-editor.js',
			$deps['dependencies'],
			$deps['version'],
			[
				'in_footer' => true,
				'strategy'  => 'async',
			]
		);
	}

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
	 * Add preload tags for the theme's fonts.
	 *
	 * @return void
	 */
	public function preload_fonts() {
		$font_families = \WP_Font_Face_Resolver::get_fonts_from_theme_json();

		foreach ( $font_families as $fonts ) {
			foreach ( $fonts as $font ) {
				if ( empty( $font['src'] ) ) {
					continue;
				}

				foreach ( $font['src'] as $src ) {
					echo sprintf(
						'<link rel="preload" href="%s" as="font" crossorigin />' . PHP_EOL,
						$src
					);
				}
			}
		}
	}

	/**
	 * Preload important CSS.
	 *
	 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload
	 *
	 * @param string $tag    The HTML fragment for the `<link />` tag with the stylesheet.
	 * @param string $handle The style handle name from `wp_enqueue_style` or `wp_register_style()`.
	 * @return string
	 */
	public function preload_styles( $tag, $handle, $href, $media ) {
		if ( 'abhainn-site-styles' === $handle ) {
			return sprintf(
				'<link rel="preload" id="%s" href="%s" as="style" media="%s" />',
				$handle,
				$href,
				$media
			) . $tag;
		}

		return $tag;
	}

	/**
	 * Handle actions and filters for enqueuing Assets.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'admin_enqueue_scripts', [ $this, 'admin' ] );
		add_action( 'admin_init', [ $this, 'editor_styles' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'site' ] );
		add_action( 'wp_head', [ $this, 'preload_fonts' ], 5 );

		add_filter( 'style_loader_tag', [ $this, 'preload_styles' ], 10, 4 );
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
			'abhainn-site-scripts',
			ABHAINN_URI . '/dist/site-js.js',
			$deps['dependencies'],
			$deps['version'],
			[
				'in_footer' => true,
				'strategy'  => 'async',
			]
		);

		wp_enqueue_style(
			'abhainn-site-styles',
			ABHAINN_URI . '/dist/site-style.css',
			[],
			$deps['version']
		);
	}
}
