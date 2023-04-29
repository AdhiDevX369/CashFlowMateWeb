const toggleButton = document.querySelector('.toggle-button');
const sidebar = document.querySelector('.sidebar');
const showbar = document.querySelector('.showbar');
const hidebar = document.querySelector('.hidebar');

toggleButton.addEventListener('click', function() {
  sidebar.classList.toggle('open');
  showbar.classList.toggle('hide');
    hidebar.classList.toggle('show');

});
