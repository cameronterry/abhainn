/**
 * WordPress dependencies.
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const CarouselItemSave = () => {
	const blockProps = useBlockProps.save();

	/**
	 * Note: perhaps not entirely advisable, but basically a slide can be any collection of blocks.
	 */
	return <InnerBlocks.Content />;
};

export default CarouselItemSave;
