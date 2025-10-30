/**
 * WordPress dependencies
 */
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import edit from './edit';
import save from './save';
import block from './block.json';

registerBlockType(
	block,
	{
		edit,
		save,
	}
);

if ( block.blockStyles?.length > 0 ) {
	block.blockStyles.forEach( ( blockStyle ) => {
		registerBlockStyle( block.name, blockStyle );
	} );
}
