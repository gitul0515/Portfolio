// 스크롤 이동 시, navBar의 배경색을 transparent 또는 green로 변경
const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;

changeNavBarColor();
document.addEventListener('scroll', () => {
  changeNavBarColor();
})

function changeNavBarColor() {
  if (scrollY > navBarHeight) {
    navBar.classList.add('bg-green');
  } else {
    navBar.classList.remove('bg-green');
  }
}

// navbar의 menu 클릭 시 해당 섹션으로 스크롤 이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', event => {
  const { target } = event;
  const { link: section } = target.dataset;
  if (!section) return;
  
  scrollIntoView(section); // 함수 오버로딩

  navbarMenu.classList.remove('show');
})

// navBar의 toggle 버튼 클릭 이벤트
const navbarToggle = document.querySelector('.navbar__toggle-btn');
navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('show');
});

// contact 버튼 클릭 시 contact 섹션으로 스크롤 이동
const contact = document.querySelector('.home__contact');
contact.addEventListener('click', () => {
  scrollIntoView('#contact');
})

function scrollIntoView(selector) {
  const destination = document.querySelector(selector);
  destination.scrollIntoView({behavior: 'smooth'});
}

// 스크롤을 내리면 home 섹션이 투명해진다
// (배경 이미지는 투명해지지 않음)
const homeHeight = document.querySelector('#home').getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  document.querySelector('.home__container')
  .style.opacity = `${1 - scrollY / homeHeight}`;
})

// backToTop 버튼 클릭 시 맨위로 스크롤 이동
const backToTop = document.querySelector('#back-to-top');
document.addEventListener('scroll', () => {
  if (scrollY > homeHeight / 2) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
})
backToTop.addEventListener('click', () => {
  scrollTo({top: 0, behavior: 'smooth'});
})

// 카테고리에 맞게 프로젝트를 필터링
const projectContainer = document.querySelector('.projects__work');
const projects = [...document.querySelectorAll('.project')];
const projectBtns = document.querySelector('.projects__categories');
let selectedBtn = document.querySelector('.category__btn.active');

projectBtns.addEventListener('click', event => {
  const { target } = event;
  const { category } = target.dataset;
  if (!category) return;

  selectedBtn.classList.remove('active');
  selectedBtn = target;
  selectedBtn.classList.add('active');
  
  projectContainer.classList.add('fade-out');
  setTimeout(() => {
    projects.forEach(project => filterProjects(project, category));
    projectContainer.classList.remove('fade-out');
  }, 300);
})

function filterProjects(project, category) {
  if(category === '*' || category === project.dataset.category) {
    project.classList.remove('invisible');
  } else {
    project.classList.add('invisible');
  }
}

// 스크롤 이동 시, 각 섹션에 맞는 navbarMenu를 포커싱
const sections = [...document.querySelectorAll('section')];
const navbarMenuItems = [...navbarMenu.children];
let selectedMenu = navbarMenuItems[0];

function changeSelectedMenu(newMenu) {
  selectedMenu.classList.remove('active');
  selectedMenu = newMenu;
  selectedMenu.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const i = sections.indexOf(entry.target);

      if (entry.boundingClientRect.y < 0) { // 스크롤을 밑으로 내린 경우
        changeSelectedMenu(navbarMenuItems[i + 1]);
      } else { // 스크롤을 위로 올린 경우
        changeSelectedMenu(navbarMenuItems[i - 1]);
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

document.addEventListener('scroll', () => {
  // 문서의 시작점
  if (scrollY === 0) {
    changeSelectedMenu(navbarMenuItems[0]);
  } 

  // 문서의 맨끝
  if (Math.round(scrollY) >= document.body.scrollHeight - document.documentElement.clientHeight) {
    changeSelectedMenu(navbarMenuItems[navbarMenuItems.length - 1]);
  }
})
