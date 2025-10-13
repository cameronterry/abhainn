<?php
/**
 * Markup for the Example block.
 *
 * @package Teleta
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Content within the block, such as `<InnerBlocks />`.
 * @var \WP_Block $block      Block object and configuration.
 */

if ( ! current_user_can( 'administrator' ) ) {
	return;
}
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	Test
</div>
