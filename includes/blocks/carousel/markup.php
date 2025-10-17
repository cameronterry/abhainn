<?php
/**
 * Markup for the Query Generated Title block.
 *
 * @package Abhainn
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Content within the block, such as `<InnerBlocks />`.
 * @var \WP_Block $block      Block object and configuration.
 */

if ( ! $block instanceof WP_Block ) {
	return;
}

$attributes = wp_parse_args(
	$attributes,
	[
		'hideScrollbar' => false,
		'sliderButtons' => false,
		'timer'         => 0,
		'title'         => __( 'Carousel', 'abhainn' ),
	]
);

$wrapper_attributes = [
	'aria-labelledby' => wp_unique_id( 'abainn-carousel--' ),
	'data-current'    => 1,
	'data-total'      => 4,
];

if ( $attributes['hideScrollbar'] ) {
	$wrapper_attributes['class'] = 'no-scrollbar';
}

$timer = min( absint( $attributes['timer'] ), 60 );
if ( ! empty( $timer ) ) {
	$wrapper_attributes['data-timer'] = $timer;
}

?>
<div <?php echo get_block_wrapper_attributes( $wrapper_attributes ); ?>>
	<h2 id="<?php echo esc_attr( $wrapper_attributes['aria-labelledby'] ); ?>" class="visually-hidden">
		<?php echo esc_html( $attributes['title'] ); ?>
	</h2>

	<button aria-label="<?php esc_attr_e( 'Previous slide', 'abhainn' ); ?>" class="carousel__button previous" data-action="previous">❮</button>

	<div class="carousel" aria-live="polite">
		<?php
		/**
		 * As this block uses `<InnerBlocks />` in the editor, the content is essentially equivalent to `the_content`.
		 * Therefore, `wp_kses_post()`, would likely lead to breakages and other undesirable issues.
		 */
		echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>
	</div>

	<button aria-label="<?php esc_attr_e( 'Next slide', 'abhainn' ); ?>" class="carousel__button next" data-action="next">❯</button>

	<?php if ( $attributes['sliderButtons'] ) : ?>
	<?php endif; ?>
</div>
