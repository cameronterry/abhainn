<?php
/**
 * Add additional information to blocks that support the Simple Carousel (somewhat contradicting its name, but "simple"
 * refers to the presentation rather than handful of files to make it work ...)
 *
 * Related files:
 *  * /styles/blocks/simple-carousel.json
 *  * /assets/css/blocks/styles/simple-carousel.css
 *  * /includes/block-editor/blocks/simple-carousel/*
 *
 * @package Abhainn
 */

namespace Abhainn\Blocks\Styles;

use Abhainn\Registerable;

/**
 * Class SimpleCarousel
 */
class SimpleCarousel implements Registerable {

	/**
	 * Blocks that support the Simple Carousel.
	 *
	 * @var string[]
	 */
	private $supported_blocks = [ 'core/columns', 'core/group' ];

	/**
	 * Register the Simple Carousel.
	 *
	 * @return true
	 */
	public function can_register() {
		return true;
	}

	/**
	 * Handle actions and filters for Simple Carousel block style.
	 *
	 * @return void
	 */
	public function register() {
		add_filter( 'render_block', [ $this, 'render' ], 10, 2 );
	}

	/**
	 * Modify the render of the supported blocks by adding a CSS variable denoting the number of "slides" with the
	 * carousel. The count is of the first-level of inner blocks.
	 *
	 * @param string $content Rendered HTML for the block and any children.
	 * @param array  $block   Settings and attributes related to the block.
	 * @return string
	 */
	public function render( $content, $block ) {
		if ( ! in_array( $block['blockName'], $this->supported_blocks, true ) ) {
			return $content;
		}

		if ( empty( $block['attrs']['className'] ) || false === stripos( $block['attrs']['className'], 'is-style-simple-carousel' ) ) {
			return $content;
		}

		$carousel_style_vars = sprintf(
			'--abhainn-carousel-slide: %d;--abhainn-carousel-slide-size: %s;',
			count( $block['innerBlocks'] ),
			$block['attrs']['slideSize'] ?? '41%' // 41% is the default value.
		);

		$html_processor = new \WP_HTML_Tag_Processor( $content );
		$html_processor->next_tag(); // Move to the containing tag.

		/**
		 * Update the `style=""` attribute, compensating for some blocks which may not have it.
		 */
		$style_attr = $html_processor->get_attribute( 'style' ) ?? '';

		/**
		 * Note: we prefix as seemingly not every style on a Block will end with a semicolon (;). So, it's simpler to
		 * assume this code does by prepending the custom variable than work out if the last style has been closed off
		 * properly.
		 */
		$html_processor->set_attribute( 'style', $carousel_style_vars . $style_attr );

		return $html_processor->get_updated_html();
	}
}
