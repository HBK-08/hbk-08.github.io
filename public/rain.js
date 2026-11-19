const directory = document.querySelector('#directory');
const dirContent = document.querySelector('#dir-content');
const themeControl = document.querySelector('#theme');
const catalogs = {
  courses: { name: 'Courses', label: '课程笔记', style: 'course', empty: '课程目录', detail: '尚未添加课程。' },
  research: { name: 'Research', label: '科研笔记', style: 'research', empty: '研究目录', detail: '尚未添加科研笔记。' },
  projects: { name: 'Projects', label: '项目记录', style: 'project', empty: '项目目录', detail: '尚未添加项目。' }
};

function renderCatalog(id) {
  const catalog = catalogs[id];
  document.querySelector('#dir-title').textContent = catalog.name;
  document.querySelector('#dir-kicker').textContent = catalog.label;
  const panel = document.createElement('div');
  panel.className = 'panel ' + catalog.style;
  const title = document.createElement('h2');
  title.textContent = catalog.empty;
  const message = document.createElement('p');
  message.textContent = catalog.detail;
  const motif = document.createElement('i');
  motif.setAttribute('aria-hidden', 'true');
  motif.className = 'motif';
  panel.append(title, message, motif);
  if (id === 'courses') {
    const readingLink = document.createElement('a');
    readingLink.className = 'text-link';
    readingLink.href = '#reading';
    readingLink.textContent = '预览阅读布局';
    panel.append(readingLink);
  }
  dirContent.replaceChildren(panel);
}

function navigate() {
  const route = location.hash.slice(1);
  const catalog = Object.hasOwn(catalogs, route);
  const home = !catalog && route !== 'reading';
  document.querySelector('#home').hidden = !home;
  directory.hidden = !catalog;
  document.querySelector('#reading').hidden = route !== 'reading';
  if (catalog) renderCatalog(route);
  document.querySelectorAll('nav a').forEach(link => {
    const active = link.hash === '#' + (home ? 'home' : route === 'reading' ? 'courses' : route);
    if (active) link.setAttribute('aria-current', route === 'reading' ? 'location' : 'page');
    else link.removeAttribute('aria-current');
  });
  document.title = (catalog ? catalogs[route].name : home ? 'Water & Rain' : 'Reading') + ' · Mingye’s Website';
  if (route === 'collections') document.querySelector('#collections').scrollIntoView();
  else window.scrollTo(0, 0);
}
window.addEventListener('hashchange', navigate);
navigate();

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeControl.firstElementChild.textContent = theme === 'light' ? '☾' : '☀';
  const label = theme === 'light' ? '切换到深色主题' : '切换到浅色主题';
  themeControl.setAttribute('aria-label', label);
  themeControl.title = label;
}
let initialTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
try { initialTheme = localStorage.getItem('mingye-rain-theme') || initialTheme; } catch {}
setTheme(initialTheme);
themeControl.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
  try { localStorage.setItem('mingye-rain-theme', nextTheme); } catch {}
});
