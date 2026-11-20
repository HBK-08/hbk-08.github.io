const directory = document.querySelector('#directory');
const dirContent = document.querySelector('#dir-content');
const themeControl = document.querySelector('#theme');
const courseTree = document.querySelector('#course-tree');
const courseLinks = Array.from(courseTree.querySelectorAll('li a'));
const overview = document.querySelector('#course-overview');
const menu = document.querySelector('#course-menu');
const catalogs = {
  research: { name: 'Research', label: '科研笔记', style: 'research', empty: '研究目录', detail: '尚未添加科研笔记。' },
  projects: { name: 'Projects', label: '项目记录', style: 'project', empty: '项目目录', detail: '尚未添加项目。' }
};

menu.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true'));
});

function renderCoursePage(course) {
  document.querySelector('#course-title').textContent = course ? course.textContent : '课程目录';
  overview.hidden = Boolean(course);
  document.querySelector('#course-lessons').hidden = !course;
  courseTree.querySelector('[aria-current]')?.removeAttribute('aria-current');
  const active = course || courseTree.querySelector('.overview-link');
  active.setAttribute('aria-current', 'page');
  menu.setAttribute('aria-expanded', 'false');
}

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
  dirContent.replaceChildren(panel);
}

function navigate() {
  if (location.hash === '#reading') history.replaceState(history.state, '', '#courses');
  const route = location.hash.slice(1);
  const catalog = Object.hasOwn(catalogs, route);
  const course = courseLinks.find(link => link.hash === location.hash);
  const coursePage = route === 'courses' || Boolean(course);
  const home = !catalog && !coursePage;
  document.querySelector('#home').hidden = !home;
  directory.hidden = !catalog;
  document.querySelector('#course-pages').hidden = !coursePage;
  if (catalog) renderCatalog(route);
  if (coursePage) renderCoursePage(course);
  const activeRoute = course ? 'courses' : route;
  document.querySelectorAll('.mast nav a').forEach(link => {
    const active = link.hash === '#' + activeRoute;
    if (active) link.setAttribute('aria-current', activeRoute === route ? 'page' : 'location');
    else link.removeAttribute('aria-current');
  });
  const title = coursePage ? document.querySelector('#course-title').textContent : (catalog ? catalogs[route].name : 'Water & Rain');
  document.title = title + ' · Mingye’s Website';
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
