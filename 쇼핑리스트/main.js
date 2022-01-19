// 현재 날짜 표시
const today = new Date().toISOString().slice(0, 10); // 예) 2020-07-24
const date = document.querySelector('.shop-list__date');
date.setAttribute('datetime', today);
date.textContent = today.replace(/-/g, '. '); // 예) 2020. 07. 24

// check 아이콘 효과
const checks = [...document.querySelectorAll('.item__icon--check')];
checks.forEach(check => {
  const itemName = check.parentNode.firstElementChild;
  check.addEventListener('click', () => {
    itemName.classList.toggle('checked');
    check.classList.toggle('checked');
  })
})


