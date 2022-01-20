// 현재 날짜 표시
const today = new Date().toISOString().slice(0, 10); // 예) 2020-07-24
const date = document.querySelector('.shop-list__date');
date.setAttribute('datetime', today);
date.textContent = today.replace(/-/g, '. '); // 예) 2020. 07. 24

// check 아이콘
// const checks = [...document.querySelectorAll('.item__icon--check')];
// checks.forEach(check => {
//   const itemName = check.parentNode.firstElementChild;
//   check.addEventListener('click', () => {
//     itemName.classList.toggle('checked');
//     check.classList.toggle('checked');
//   })
// })

// 리스트 추가
const itemInput = document.querySelector('.shop-list__input--item');
const priceInput = document.querySelector('.shop-list__input--price');
const btn = document.querySelector('.shop-list__btn');

btn.addEventListener('click', () => {
  const itemValue = itemInput.value;
  const priceValue = priceInput.value;

  // 값이 공백인 경우
  if (itemValue === '' || priceValue === '') return;

  // 리스트로 추가
  addList(itemValue, priceValue);

  // 초기화
  itemInput.value = '';
  priceInput.value = '';

  const items = document.querySelector('.shop-list__items');
  items.style.borderBottom = '1px solid var(--color-grey)';

  const totalPrice = document.querySelector('.shop-list__total-price');
  totalPrice.style.visibility = 'visible';
})

function addList(item, price) {
  // 노드 생성
  const li = document.createElement('li');
  li.setAttribute('class', 'shop-list__item');
  const itemName = document.createElement('span');
  itemName.setAttribute('class', 'item__name');
  itemName.textContent = item;
  const itemPrice = document.createElement('span');
  itemPrice.setAttribute('class', 'item__price');
  itemPrice.textContent = `${price}원`;
  const iconCheck = document.createElement('i');
  iconCheck.setAttribute('class', 'item__icon item__icon--check far fa-check-circle');
  const iconRemove = document.createElement('i');
  iconRemove.setAttribute('class', 'item__icon item__icon--remove far fa-trash-alt');

  // 노드 연결
  li.appendChild(itemName);
  li.appendChild(itemPrice);
  li.appendChild(iconCheck);
  li.appendChild(iconRemove);

  const ul = document.querySelector('.shop-list__items');
  ul.appendChild(li);
}


// 리스트 삭제
