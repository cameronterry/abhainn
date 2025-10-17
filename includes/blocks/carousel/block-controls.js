/**
 * WordPress dependencies.
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { gallery, image } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

const CarouselBlockControls = ( { clientId } ) => {
	return <BlockControls group="block">
		<ToolbarDropdownMenu
			icon={ gallery }
			label={ __( 'Select a Slide', 'abhainn' ) }
			controls={ [
				{
					title: __( 'Test', 'abhainn' ),
					icon: image,
				},
			] }
		/>
	</BlockControls>
};

export default CarouselBlockControls;
