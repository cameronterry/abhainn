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
		'title' => '',
	]
);

$wrapper_attributes = [
	'aria-labelledby' => wp_unique_id( 'abainn-carousel--' ),
];

?>
<div <?php echo get_block_wrapper_attributes( $wrapper_attributes ); ?>>
	<h2 id="<?php echo esc_attr( $wrapper_attributes['aria-labelledby'] ); ?>" class="visually-hidden">
		<?php echo esc_html( $attributes['title'] ); ?>
	</h2>

	<div class="carousel">
		<div class="carousel__slide">Slide 1</div>
		<div class="carousel__slide">Slide 2</div>
		<div class="carousel__slide">Slide 3</div>
		<div class="carousel__slide">Slide 4</div>
	</div>

	<button class="carousel__button.previous">❮</button>
	<button class="carousel__button.next">❯</button>
</div>
