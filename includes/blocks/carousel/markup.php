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
		'scrollMarkers' => false,
		'timer'         => 0,
		'title'         => __( 'Carousel', 'abhainn' ),
	]
);

$class_names = [];

$slide_count = $block->inner_blocks->count();

$wrapper_attributes = [
	'aria-labelledby' => wp_unique_id( 'abainn-carousel--' ),
	'data-current'    => 1,
];

if ( $attributes['hideScrollbar'] ) {
	$class_names[] = 'no-scrollbar';
}

$timer = min( absint( $attributes['timer'] ), 60 );
if ( ! empty( $timer ) ) {
	$class_names[]                    = 'has-timer';
	$wrapper_attributes['data-timer'] = $timer;
}

$wrapper_attributes['class'] = implode( ' ', $class_names );

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

	<?php if ( $attributes['scrollMarkers'] ) : ?>
		<div class="scroll-markers is-style-progress" style="--abhainn-progress-duration: <?php echo esc_attr( $timer - 1 ); ?>s;">
			<?php
			for ( $i = 0; $i < $slide_count; $i++ ) :
				$slide_radio_id = wp_unique_id( $wrapper_attributes['aria-labelledby'] . '--slide-' );
				?>
				<input name="<?php echo esc_attr( $wrapper_attributes['aria-labelledby'] . '--toggle' ); ?>" id="<?php echo esc_attr( $slide_radio_id ); ?>" <?php checked( $i, 0 ); ?> data-action="<?php echo esc_attr( $i + 1 ); ?>" type="radio" value="<?php echo esc_attr( $i ); ?>" />
				<label for="<?php echo esc_attr( $slide_radio_id ); ?>">
					<span class="visually-hidden">
						<?php
						echo esc_html(
							sprintf(
							/* translators: %d: Slide number. */
								__( 'Show slide %d', 'abhainn' ),
								$i
							)
						);
						?>
					</span>
				</label>
			<?php endfor; ?>
		</div>
	<?php endif; ?>
</div>
