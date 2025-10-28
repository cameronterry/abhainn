/**
 * WordPress dependencies.
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies.
 */
import simpleCarouselSettings from '../../../../styles/blocks/simple-carousel.json';

const SimpleCarouselBlockEdit = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, name, setAttributes } = props;
		const { className } = attributes;

		/**
		 * Ignore blocks of a different type and those without the custom style.
		 */
		if ( ! simpleCarouselSettings.blockTypes.includes( name ) || ! className.includes( `is-style-${simpleCarouselSettings.slug}` ) ) {
			return <BlockEdit { ...props } />;
		}

		return <>
			<BlockEdit { ...props } />
		</>;
	};
}, 'SimpleCarouselBlockEdit' );

addFilter(
	'editor.BlockEdit',
	'abhainn/simple-carousel-blockedit',
	SimpleCarouselBlockEdit
);
