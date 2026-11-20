const directory = document.querySelector('#directory');
const dirContent = document.querySelector('#dir-content');
const themeControl = document.querySelector('#theme');
const topicPages = document.querySelectorAll('[data-directory]');
const topicLinks = new Map();
for (const page of topicPages) {
  for (const link of page.querySelectorAll('nav a, [data-topic-link]')) topicLinks.set(link.hash, link);
  const menu = page.querySelector('.directory-menu');
  menu.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true'));
  });
}
const catalogs = {
  projects: { name: 'Projects', label: '项目记录', style: 'project', empty: '项目目录', detail: '尚未添加项目。' }
};

function renderTopicPage(page, link) {
  const overview = link.classList.contains('overview-link');
  const route = link.hash.slice(1);
  let hasContent = false;
  for (const body of page.querySelectorAll('[data-topic-body]')) {
    body.hidden = body.dataset.topicBody !== route;
    if (!body.hidden) hasContent = true;
  }
  page.querySelector('h1').textContent = link.textContent;
  page.querySelector('.directory-overview').hidden = !overview;
  page.querySelector('.directory-detail').hidden = overview || hasContent;
  page.querySelector('nav [aria-current]')?.removeAttribute('aria-current');
  const parent = link.closest('[data-topic-body]');
  const sidebarLink = parent ? topicLinks.get('#' + parent.dataset.topicBody) : link;
  sidebarLink.setAttribute('aria-current', parent ? 'location' : 'page');
  page.querySelector('.directory-menu').setAttribute('aria-expanded', 'false');
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
  const topicLink = topicLinks.get(location.hash);
  const topicPage = topicLink?.closest('[data-directory]');
  const home = !catalog && !topicPage;
  document.querySelector('#home').hidden = !home;
  directory.hidden = !catalog;
  for (const page of topicPages) page.hidden = page !== topicPage;
  if (catalog) renderCatalog(route);
  if (topicPage) renderTopicPage(topicPage, topicLink);
  const activeRoute = topicPage?.dataset.directory || route;
  document.querySelectorAll('.mast nav a').forEach(link => {
    const active = link.hash === '#' + activeRoute;
    if (active) link.setAttribute('aria-current', activeRoute === route ? 'page' : 'location');
    else link.removeAttribute('aria-current');
  });
  const title = topicLink?.textContent || (catalog ? catalogs[route].name : 'Water & Rain');
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
