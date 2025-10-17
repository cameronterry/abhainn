( () => {
	const carouselBlockChangeSlide = ( block, slide ) => {
		const { current, total } = block.dataset;
		if ( slide < 0 || slide > total || current === slide ) {
			return;
		}

		const carousel = block.querySelector( '.carousel' );
		const currentSlide = block.querySelector( `div.carousel__slide:nth-child(${current})` );
		const newSlide = block.querySelector( `div.carousel__slide:nth-child(${slide})` );
		if ( ! carousel || ! currentSlide || ! newSlide ) {
			return;
		}

		block.setAttribute( 'data-current', slide );

		carousel.scrollTo( {
			behavior: 'smooth',
			left: newSlide.offsetLeft,
		} );

		/**
		 * Update the aria-hidden values.
		 */
		currentSlide.setAttribute( 'aria-hidden', 'true' );
		newSlide.setAttribute( 'aria-hidden', 'false' );
	};

	const carouselBlocks = document.querySelectorAll( '.wp-block-abhainn-carousel' );
	if ( ! carouselBlocks ) {
		return;
	}

	carouselBlocks.forEach( ( block ) => {
		const slidesTotal = block.querySelector( '.carousel' )?.children?.length ?? 0;
		if ( 0 === slidesTotal ) {
			return;
		}

		block.addEventListener( 'click', ( { target } ) => {
			const current = parseInt( block?.dataset?.current ?? 1, 10 );

			if ( ! target.dataset.action ) {
				return;
			}

			if ( 'first' === target.dataset.action ) {
				carouselBlockChangeSlide( block, 1 );
			} else if ( 'last' === target.dataset.action ) {
				carouselBlockChangeSlide( block, slidesTotal );
			} else if ( 'next' === target.dataset.action ) {
				carouselBlockChangeSlide( block, current + 1 );
			} else if ( 'previous' === target.dataset.action ) {
				carouselBlockChangeSlide( block, current - 1 );
			} else if ( ! isNaN( parseInt( target.dataset.action, 10 ) ) ) {
				carouselBlockChangeSlide( block, parseInt( target.dataset.action, 10 ) );
			}
		} );
	} );
} )();
