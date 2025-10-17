/**
 * WordPress dependencies.
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CarouselInspectorControls = ( { attributes, setAttribute } ) => {
	const { hideScrollbar, sliderButtons, timer } = attributes;

	return <InspectorControls>
		<PanelBody title={ __( 'Carousel Settings', 'abhainn' ) }>
			<ToggleControl
				__nextHasNoMarginBottom
				checked={ hideScrollbar }
				help={ __( 'Hide the visual horizontal scrollbar, relying on buttons and gestures.', 'abhainn' ) }
				label={ __( 'Hide Scrollbar', 'abhainn' ) }
				onChange={ ( value ) => setAttribute( { hideScrollbar: value } ) }
			/>
			<ToggleControl
				__nextHasNoMarginBottom
				checked={ sliderButtons }
				help={ __( 'Provides a UI at the bottom of the carousel to choose a specific slide.', 'abhainn' ) }
				label={ __( 'Show Slider Buttons', 'abhainn' ) }
				onChange={ ( value ) => setAttribute( { sliderButtons: value } ) }
			/>
			<RangeControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				help={ __( 'Used to control how often to switch slides. Set to 0 (zero) to disable.', 'abhainn' ) }
				label={ __( 'Timer (seconds)', 'abhainn' ) }
				max={ 60 }
				min={ 0 }
				onChange={ ( value ) => setAttribute( { timer: value } ) }
				value={ timer }
			/>
		</PanelBody>
	</InspectorControls>;
};

export default CarouselInspectorControls;
