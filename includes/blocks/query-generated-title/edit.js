/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	HeadingLevelDropdown,
	useBlockProps,
} from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Edit component.
 *
 * {@link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/}
 *
 * @param {object}   props                  The block props.
 * @param {object}   props.attributes       Block attributes.
 * @param {string}   props.attributes.title Custom title to be displayed.
 * @param {string}   props.className        Class name for the block.
 * @param {object}   props.context          Context provided by higher blocks.
 * @param {Function} props.setAttributes    Sets the value for block attributes.
 * @returns {Function} Render the edit screen
 */
const QueryGeneratedTitleEdit = ( {
	attributes,
	context,
	setAttributes,
} ) => {
	const { level } = attributes;
	const {
		query: {
			postType,
			taxQuery,
		},
	} = context;
	const TagName = level === 0 ? 'p' : `h${ level }`;

	const blockProps = useBlockProps();

	const terms = useSelect( ( select ) => {
		const { getEntityRecords } = select( coreStore );

		const titles = [];
		Object.keys( taxQuery ).forEach( ( taxonomy ) => {
			const terms = getEntityRecords( 'taxonomy', taxonomy, {
				include: taxQuery[taxonomy],
			} );
			Array.isArray( terms ) && terms.forEach( ( { link, name } ) => titles.push( {
				link,
				name,
			} ) );
		} );

		return titles;
	} );

	return <>
		<BlockControls>
			<HeadingLevelDropdown
				onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) }
				value={ level }
			/>
		</BlockControls>
		<TagName { ...blockProps }>
			{ terms.map( ( { name } ) => name ).join( ', ' ) }
		</TagName>
	</>;
};
export default QueryGeneratedTitleEdit;
