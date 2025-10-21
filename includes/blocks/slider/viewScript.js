( () => {
	const sliderBlockChangeSlide = ( block, slide ) => {
		const { current, total } = block.dataset;
		if ( slide < 0 || slide > total || current === slide ) {
			return;
		}

		const slider = block.querySelector( '.slider' );
		const currentSlide = block.querySelector( `div.slider__slide:nth-child(${current})` );
		const newSlide = block.querySelector( `div.slider__slide:nth-child(${slide})` );
		if ( ! slider || ! currentSlide || ! newSlide ) {
			return;
		}

		block.setAttribute( 'data-current', slide );

		slider.scrollTo( {
			behavior: 'smooth',
			left: newSlide.offsetLeft,
		} );

		/**
		 * Update the aria-hidden values.
		 */
		currentSlide.setAttribute( 'aria-hidden', 'true' );
		newSlide.setAttribute( 'aria-hidden', 'false' );

		/**
		 * Update any elements used to point to a specific slide, such as the radio boxes used for the Scroll Markers.
		 */
		const currentTargets = block.querySelectorAll( `[data-action="${current}"]` );
		currentTargets.forEach( ( element ) => {
			if ( element?.type && 'radio' === element.type.toLowerCase() ) {
				element.removeAttribute( 'checked' );
			} else {
				element.classList.remove( 'is-active' );
			}
		} );

		const newTargets = block.querySelectorAll( `[data-action="${slide}"]` );
		newTargets.forEach( ( element ) => {
			if ( element?.type && 'radio' === element.type.toLowerCase() ) {
				element.setAttribute( 'checked', 'checked' );
			} else {
				element.classList.add( 'is-active' );
			}
		} );
	};

	const sliderBlocks = document.querySelectorAll( '.wp-block-abhainn-slider' );
	if ( ! sliderBlocks ) {
		return;
	}

	const hasReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

	sliderBlocks.forEach( ( block ) => {
		const slidesTotal = block.querySelector( '.slider' )?.children?.length ?? 0;
		if ( 0 === slidesTotal ) {
			return;
		}

		let interval = null;

		/**
		 * Don't animate for those who prefer reduced motion.
		 */
		if ( ! hasReducedMotion ) {
			const timer = Math.min( parseInt( block?.dataset?.timer ?? 0, 10 ), 60 );

			if ( timer > 0 ) {
				interval = setInterval( () => {
					const current = parseInt( block?.dataset?.current ?? 1, 10 );

					if ( current === slidesTotal ) {
						sliderBlockChangeSlide( block, 1 );
					} else {
						sliderBlockChangeSlide( block, current + 1 );
					}
				}, timer * 1000 );
			}
		}

		block.addEventListener( 'click', ( { target } ) => {
			const current = parseInt( block?.dataset?.current ?? 1, 10 );

			if ( ! target.dataset.action ) {
				return;
			}

			if ( interval ) {
				clearInterval( interval );
			}

			if ( 'first' === target.dataset.action ) {
				sliderBlockChangeSlide( block, 1 );
			} else if ( 'last' === target.dataset.action ) {
				sliderBlockChangeSlide( block, slidesTotal );
			} else if ( 'next' === target.dataset.action ) {
				sliderBlockChangeSlide( block, current + 1 );
			} else if ( 'previous' === target.dataset.action ) {
				sliderBlockChangeSlide( block, current - 1 );
			} else if ( ! isNaN( parseInt( target.dataset.action, 10 ) ) ) {
				sliderBlockChangeSlide( block, parseInt( target.dataset.action, 10 ) );
			}
		} );
	} );
} )();
