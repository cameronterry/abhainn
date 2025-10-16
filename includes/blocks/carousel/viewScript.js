const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

nextBtn.addEventListener('click', () => {
	currentIndex = (currentIndex + 1) % slides.length;
	carousel.scrollTo({
		left: carousel.clientWidth * currentIndex,
		behavior: 'smooth'
	});
});

prevBtn.addEventListener('click', () => {
	currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	carousel.scrollTo({
		left: carousel.clientWidth * currentIndex,
		behavior: 'smooth'
	});
});
