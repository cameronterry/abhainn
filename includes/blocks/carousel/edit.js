/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import CarouselBlockControls from './block-controls';
import CarouselInspectorControls from './inspector-controls';

/**
 * Constants
 */
const DEFAULT_BLOCK = {
	name: 'abhainn/carousel-item',
	innerBlocks: [
		{
			name: 'core/paragraph',
			attributes: {
				placeholder: __( 'Start your new slide here ...', 'abhainn' ),
			},
		}
	],
};

/**
 * Edit component.
 *
 * {@link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/}
 *
 * @param {object}   props                  The block props.
 * @param {object}   props.attributes       Block attributes.
 * @param {string}   props.attributes.title Custom title to be displayed.
 * @param {string}   props.clientId         Client ID for the component.
 * @param {string}   props.className        Class name for the block.
 * @param {object}   props.context          Context provided by higher blocks.
 * @param {Function} props.setAttributes    Sets the value for block attributes.
 * @returns {Function} Render the edit screen
 */
const CarouselEdit = ( { attributes, clientId, setAttributes } ) => {
	const blockProps = useBlockProps();

	const carouselRef = useRef( null );
	const innerBlocksProps = useInnerBlocksProps( {
		className: 'carousel',
		ref: carouselRef,
	}, {
		defaultBlock: DEFAULT_BLOCK,
		directInsert: true,
		renderAppender: false,
	} );

	const handleChooseSlide = ( slide ) => {
		carouselRef.current.scrollTo( {
			left: carouselRef.current.offsetWidth * slide,
		} );
	};

	return <div { ...blockProps }>
		<CarouselBlockControls
			clientId={ clientId }
			onChooseSlide={ handleChooseSlide }
		/>

		<CarouselInspectorControls
			attributes={ attributes }
			setAttribute={ setAttributes }
		/>

		<div { ...innerBlocksProps } />
	</div>;
};

export default CarouselEdit;
