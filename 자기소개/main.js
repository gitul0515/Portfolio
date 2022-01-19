// navBar의 toggle-btn을 클릭하면 navbar__menu가 보여짐
const navbarToggle = document.querySelector('.navbar__toggle-btn');
const navbarMenu = document.querySelector('.navbar__menu');

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('show');
})

// 스크롤이 내려가면 navBar의 배경색을 green로 변경
const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;

if (scrollY > navBarHeight) {
  navBar.classList.add('bg-green');
} else {
  navBar.classList.remove('bg-green');
}

document.addEventListener('scroll', () => {
  if (scrollY > navBarHeight) {
    navBar.classList.add('bg-green');
  } else {
    navBar.classList.remove('bg-green');
  }
})

// navbar__menu를 클릭하면 해당 위치로 스크롤 이동
navbarMenu.addEventListener('click', event => {
  const target = event.target;
  const link = target.dataset.link;
  if (!link) return;
  
  scrollToElem(link);

  // 메뉴 버튼 스타일 처리
  const prevMenu = document.querySelector('.navbar__menu__items.active');
  prevMenu.classList.remove('active');
  target.classList.add('active');

  // 열려 있는 navbarMenu를 안 보이게 함
  navbarMenu.classList.remove('show');
})

// home__contact을 클릭하면 contact 섹션으로 스크롤 이동
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
  scrollToElem('#contact');
})

function scrollToElem(selector) {
  const element = document.querySelector(selector);
  element.scrollIntoView({behavior: 'smooth'});
}

// 스크롤이 내려가면 home 섹션이 투명해짐
const homeHeight = document.querySelector('#home').getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  const homeOpacity = document.querySelector('.home__container');
  homeOpacity.style.opacity = `${1 - scrollY / homeHeight}`;
})

// 버튼을 클릭하면 스크롤이 맨 위로 올라감
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

// 카테고리로 분류하여 프로젝트를 보여주기
const projectBtns = document.querySelector('.projects__categories');
const projectContainer = document.querySelector('.projects__work');
const projects = [...document.querySelectorAll('.project')];

projectBtns.addEventListener('click', e => {
  const target = e.target;
  const filter = target.dataset.filter;
  if (!filter) return;

  // 버튼 처리
  const prevButton = document.querySelector('.category__btn.active');
  prevButton.classList.remove('active');
  target.classList.add('active');
  
  // 프로젝트 필터링
  projectContainer.classList.add('fade-out');
  setTimeout(() => {
    projects.forEach(project => {
      if(filter === '*' || filter === project.dataset.filter) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    })
    projectContainer.classList.remove('fade-out');
  }, 300);
})

// 스크롤하면 navbar__menu가 변화
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver을 이용해서 모든 섹션들을 관찰한다. 
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#projects',
  '#testimonials',
  '#contact'
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
let selectedNavItem = navItems[0];

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      let selectedIndex;
      if (entry.boundingClientRect.y < 0) {
        selectedIndex = index + 1;
      } else {
        selectedIndex = index - 1;
      }
      selectedNavItem.classList.remove('active');
      selectedNavItem = navItems[selectedIndex];
      selectedNavItem.classList.add('active');
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

