const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};
  
const bodyRefChange = document.querySelector('body');
const switchRef = document.querySelector('#theme-switch-toggle');
  

function defaultTheme() {
  
    const defaultTheme = localStorage["Theme"];
   
    if (defaultTheme === Theme.DARK) {
            bodyRefChange.classList.add(Theme.DARK);
            switchRef.checked = true;
    }
}
defaultTheme()
  
// Зміна з світлої на темну тему
  
bodyRefChange.addEventListener('change', onChengeTheme);
  
function onChengeTheme(event) {
    if (event.target.checked) {
        bodyRefChange.classList.remove(Theme.LIGHT);
        bodyRefChange.classList.add(Theme.DARK);
  
        localStorage.setItem('Theme', Theme.DARK);
    }
    else {
        bodyRefChange.classList.remove(Theme.DARK);
        bodyRefChange.classList.add(Theme.LIGHT);
  
        localStorage.setItem('Theme', Theme.LIGHT);
    }
}
