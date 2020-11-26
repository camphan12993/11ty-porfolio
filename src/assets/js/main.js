var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

function toggleDarkMode() {
  var isDark = document.querySelector('body').classList.contains('theme-dark');
  updateStatus(isDark);
}

function updateStatus(isDark) {
  var icon = document.querySelector('#toggleBtn ion-icon');
  if(isDark) {
    document.querySelector('body').classList.remove('theme-dark');
    icon.setAttribute('name', 'moon-outline');
    localStorage.setItem('mode', 'light');
  } else {
    document.querySelector('body').classList.add('theme-dark');
    icon.setAttribute('name', 'sunny-outline');
    localStorage.setItem('mode', 'dark');
  }
}

window.onload = function(e) {
  updateStatus(localStorage.getItem('mode') === 'light');
  setTimeout(function(){
		document.getElementById('loading').classList.add('fade-out');
	}, 2000);
}