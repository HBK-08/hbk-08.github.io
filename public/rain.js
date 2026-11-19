const directory = document.querySelector('#directory');
const dirContent = document.querySelector('#dir-content');
const themeControl = document.querySelector('#theme');
const courses = new Map([
  ['courses/computer-network', '计算机网络'],
  ['courses/nlp', '自然语言处理'],
  ['courses/cv', '计算机视觉导论'],
  ['courses/ai-practice', '人工智能前沿实践'],
  ['courses/xi-thought', '习近平新时代中国特色社会主义思想概论']
]);
const catalogs = {
  courses: { name: 'Courses', label: '2026 秋冬学期' },
  research: { name: 'Research', label: '科研笔记', style: 'research', empty: '研究目录', detail: '尚未添加科研笔记。' },
  projects: { name: 'Projects', label: '项目记录', style: 'project', empty: '项目目录', detail: '尚未添加项目。' }
};

function linkTo(route, text) {
  const link = document.createElement('a');
  link.href = '#' + route;
  link.textContent = text;
  return link;
}

function renderCourses() {
  const section = document.createElement('div');
  section.className = 'course-index';
  const heading = document.createElement('h2');
  heading.textContent = '课程目录';
  const list = document.createElement('ul');
  for (const [route, name] of courses) {
    const row = document.createElement('li');
    row.append(linkTo(route, name));
    list.append(row);
  }
  section.append(heading, list);
  dirContent.replaceChildren(section);
}

function renderCourse(name) {
  document.querySelector('#dir-title').textContent = name;
  document.querySelector('#dir-kicker').replaceChildren(linkTo('courses', '课程目录'), ' / 2026 秋冬学期');
  const section = document.createElement('div');
  section.className = 'course-index';
  const heading = document.createElement('h2');
  heading.textContent = '讲次目录';
  const empty = document.createElement('p');
  empty.className = 'muted';
  empty.textContent = '尚未添加讲次。';
  section.append(heading, empty);
  dirContent.replaceChildren(section);
}

function renderCatalog(id) {
  const catalog = catalogs[id];
  document.querySelector('#dir-title').textContent = catalog.name;
  document.querySelector('#dir-kicker').textContent = catalog.label;
  if (id === 'courses') {
    renderCourses();
    return;
  }
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
  const course = courses.get(route);
  const home = !catalog && !course;
  document.querySelector('#home').hidden = !home;
  directory.hidden = home;
  directory.classList.toggle('course-detail', Boolean(course));
  if (catalog) renderCatalog(route);
  if (course) renderCourse(course);
  const activeRoute = course ? 'courses' : route;
  document.querySelectorAll('nav a').forEach(link => {
    const active = link.hash === '#' + activeRoute;
    if (active) link.setAttribute('aria-current', activeRoute === route ? 'page' : 'location');
    else link.removeAttribute('aria-current');
  });
  document.title = (course || (catalog ? catalogs[route].name : 'Water & Rain')) + ' · Mingye’s Website';
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
