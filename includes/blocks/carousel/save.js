/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

const CarouselSave = () => {
	/**
	 * Note: perhaps not entirely advisable, but basically a slide can be any collection of blocks.
	 */
	return <InnerBlocks.Content />;
};

export default CarouselSave;
