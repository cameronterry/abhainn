/**
 * WordPress dependencies.
 */
import { createBlock } from '@wordpress/blocks';
import {
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import {
	addCard,
	gallery,
	image,
} from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

const SliderBlockControls = ( { clientId, onChooseSlide } ) => {
	const {
		slideCount,
		slides,
	} = useSelect( ( select ) => {
		const innerBlocks = select( blockEditorStore ).getBlock( clientId )?.innerBlocks ?? [];

		return {
			slideCount: innerBlocks.length,
			slides: innerBlocks.filter( ( { name } ) => 'abhainn/slider-item' === name ),
		};
	} );
	const { insertBlock } = useDispatch( blockEditorStore );

	const addSlide = () => {
		const block = createBlock( 'abhainn/slider-item' );
		insertBlock( block, slideCount, clientId );
	};

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
		<ToolbarButton
			icon={ addCard }
			label={ __( 'Add Slide', 'abhainn' ) }
			onClick={ addSlide }
		/>
	</BlockControls>
};

export default SliderBlockControls;
