/**
 * WordPress dependencies.
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	__experimentalUnitControl as UnitControl,
	PanelBody,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import simpleCarouselSettings from '../../../../styles/blocks/simple-carousel.json';

/**
 * {@link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blockedit}
 */
const SimpleCarouselBlockEdit = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, name, setAttributes } = props;
		const { className, slideSize } = attributes;

		/**
		 * Ignore blocks of a different type and those without the custom style.
		 */
		if ( ! className || ! simpleCarouselSettings.blockTypes || ! simpleCarouselSettings.blockTypes.includes( name ) || ! className.includes( `is-style-${simpleCarouselSettings.slug}` ) ) {
			return <BlockEdit { ...props } />;
		}

		return <>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody title={ __( 'Simple Carousel', 'abhainn' ) }>
					<UnitControl
						__next40pxDefaultSize
						label={ __( 'Slide Size', 'abhainn' ) }
						onChange={ ( value ) => setAttributes( { slideSize: value } ) }
						value={ slideSize }
					/>
				</PanelBody>
			</InspectorControls>
		</>;
	};
}, 'SimpleCarouselBlockEdit' );

addFilter(
	'editor.BlockEdit',
	'abhainn/simple-carousel-blockedit',
	SimpleCarouselBlockEdit
);
