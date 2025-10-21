<?php
/**
 * Markup for the Carousel block.
 *
 * @package Abhainn
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Content within the block, such as `<InnerBlocks />`.
 * @var \WP_Block $block      Block object and configuration.
 */

?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php
	/**
	 * As this block uses `<InnerBlocks />` in the editor, the content is essentially equivalent to `the_content`.
	 * Therefore, `wp_kses_post()`, would likely lead to breakages and other undesirable issues.
	 */
	echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	?>
</div>
