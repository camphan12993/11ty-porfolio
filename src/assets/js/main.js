var swiper = new Swiper('.swiper-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

function toggleDarkMode() {
	var isDark = document.querySelector('body').classList.contains('theme-dark');
	var icon = document.querySelector('#toggleBtn ion-icon');
	if (isDark) {
		document.querySelector('body').classList.remove('theme-dark');
		icon.setAttribute('name', 'moon-outline');
		localStorage.setItem('mode', 'light');
	} else {
		document.querySelector('body').classList.add('theme-dark');
		icon.setAttribute('name', 'sunny-outline');
		localStorage.setItem('mode', 'dark');
	}
}

window.onload = function (e) {
	var icon = document.querySelector('#toggleBtn ion-icon');
	if (localStorage.getItem('mode') === 'dark') {
		document.querySelector('body').classList.add('theme-dark');
		icon.setAttribute('name', 'sunny-outline');
	}
	setTimeout(function () {
		document.getElementById('loading').classList.add('fade-out');
	}, 2000);
};
