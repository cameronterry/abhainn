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

if ( ! $block instanceof WP_Block ) {
	return;
}

$attributes = wp_parse_args(
	$attributes,
	[
		'level' => 2,
	]
);

if ( empty( $block->context['query']['taxQuery'] ) ) {
	return;
}

$content = '';
foreach ( $block->context['query']['taxQuery'] as $taxonomy => $term_ids ) {
	$terms = get_terms(
		[
			'include'  => $term_ids,
			'taxonomy' => $taxonomy,
		]
	);
	if ( is_wp_error( $terms ) ) {
		continue;
	}

	$content = implode(
		', ',
		wp_list_pluck( $terms, 'name' )
	);
}

if ( empty( $content ) ) {
	return;
}

$html = sprintf(
	'<h%1$d %2$s>%3$s</h%1$d>',
	$attributes['level'],
	get_block_wrapper_attributes(),
	$content
);

/**
 * Ensure we only output the permitted HTML.
 */
echo wp_kses(
	$html,
	[
		'a'      => [
			'class' => [],
			'href'  => [],
			'rel'   => [],
			'title' => [],
		],
		'h1'     => [
			'class' => [],
		],
		'h2'     => [
			'class' => [],
		],
		'h3'     => [
			'class' => [],
		],
		'h4'     => [
			'class' => [],
		],
		'h5'     => [
			'class' => [],
		],
		'h6'     => [
			'class' => [],
		],
		'strong' => [],
	]
);
