/**
 * WordPress dependencies.
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies.
 */
import simpleCarouselSettings from '../../../../styles/blocks/simple-carousel.json';

const SimpleCarouselControls = ( settings, name ) => {
	if ( simpleCarouselSettings.blockTypes.includes( name ) ) {
		settings.attributes = {
			...settings.attributes,
			slideSize: {
				type: 'string',
				default: '41%',
			},
		};
	}

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'abhainn/simple-carousel-controls',
	SimpleCarouselControls
);
