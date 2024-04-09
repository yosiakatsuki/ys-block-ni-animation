document.addEventListener('DOMContentLoaded', () => {
	const option = {
		root: null,
		rootMargin: `0px 0px -50px 0px`,
		threshold: 0
	}

	const callback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('ysbna-do-animation');
			}
		});
	}

	const observer = new IntersectionObserver(callback, option);
	const targets = document.querySelectorAll('[class*="ysbna-animation-type"]');
	targets.forEach((target) => {
		observer.observe(target);
	});
});
