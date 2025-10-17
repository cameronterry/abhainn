/**
 * WordPress dependencies.
 */
import {
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { gallery, image } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

const CarouselBlockControls = ( { clientId, onChooseSlide } ) => {
	const slides = useSelect( ( select ) =>
		select( blockEditorStore ).getBlock( clientId )?.innerBlocks.filter( ( { name } ) => 'abhainn/carousel-item' === name ) ?? []
	);

	const slideControls = useMemo( () => {
		const controls = [];
		slides.forEach( ( element, index ) => {
			controls.push( {
				onClick: () => onChooseSlide( index ),
				icon: image,
				title: sprintf(
					__( 'Slide %d', 'abhainn' ),
					index + 1,
				),
			} );
		} );

		return controls;
	}, [ slides ] );

	return <BlockControls group="block">
		<ToolbarDropdownMenu
			icon={ gallery }
			label={ __( 'Select a Slide', 'abhainn' ) }
			controls={ slideControls }
		/>
	</BlockControls>
};

export default CarouselBlockControls;
