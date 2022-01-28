var activeIndex = 1;
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

var icon = document.querySelector('#toggleBtn ion-icon');

setTimeout(function () {
  document.getElementById('loading').classList.add('fade-out');
}, 2000);

function setActiveTab(index) {
  const tabs = document.querySelector('#project-nav').children;
  for (var i = 0; i < tabs.length; i++) {
    const contents = document.querySelectorAll('.project-nav-content');
    if (i + 1 == index) {
      tabs[i].classList.add('active');
      contents[i].classList.remove('hidden');
    } else {
      tabs[i].classList.remove('active');
      contents[i].classList.add('hidden');
    }
  }
}
