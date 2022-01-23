// 현재 날짜 표시
const today = new Date().toISOString().slice(0, 10); // 예) 2020-07-24
const date = document.querySelector('.shop-list__date');
date.setAttribute('datetime', today);
date.textContent = today.replace(/-/g, '. '); // 예) 2020. 07. 24

// 아이템 리스트 추가
const inputItem = document.querySelector('.shop-list__input--item');
const inputPrice = document.querySelector('.shop-list__input--price');
const items = document.querySelector('.shop-list__items');
const totalPrice = document.querySelector('.shop-list__total-price');
const totalPriceSpan = document.querySelector('.shop-list__total-price > span');
const checkAll = document.querySelector('.shop-list__check-all');
const guidance = document.querySelector('.shop-list__guidance');
const form = document.querySelector('.shop-list_form');

form.addEventListener('submit', e => {
  e.preventDefault();
  onAdd();
});

function onAdd() {
  const itemValue = inputItem.value;
  const priceValue = inputPrice.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자는 삭제
  
  // input 텍스트 초기화
  inputItem.value = '';
  inputPrice.value = '';
  inputItem.focus();

  // 입력받은 값이 공백인 경우
  if (itemValue === '' || priceValue === '') {
    return;
  }

  // 아이템 리스트를 element로 만든다
  createListElem(itemValue, priceValue);

  // 총 금액란 표시
  items.classList.add('border');
  totalPrice.classList.add('show');

  checkAll.classList.add('show');

  // 안내 문구 비표시
  guidance.classList.add('hidden');

  // 총 금액을 계산하여 표시한다
  totalPriceSpan.textContent = `${Number(totalPriceSpan.textContent) + Number(priceValue)}`;
}

function createListElem(item, price) {
  const n = {};

  // Node를 생성하고 className을 추가
  n.li = createNodeAndClass('li', 'shop-list__item');
  n.itemName = createNodeAndClass('span', 'item__name');
  n.itemPrice = createNodeAndClass('span', 'item__price');
  n.iconCheck = createNodeAndClass('i', 'item__icon item__icon--check far fa-check-circle')
  n.iconRemove = createNodeAndClass('i', 'item__icon item__icon--remove far fa-trash-alt');

  // 입력된 값을 표시
  n.itemName.textContent = item;
  n.itemPrice.textContent = `${price}원`;

  // Node 연결
  n.li.appendChild(n.itemName); n.li.appendChild(n.itemPrice);
  n.li.appendChild(n.iconCheck); n.li.appendChild(n.iconRemove);
  items.appendChild(n.li);

  n.li.scrollIntoView({behavior: 'smooth', block: 'center'});

  // iconCheck 이벤트 설정
  n.iconCheck.addEventListener('click', () => {
    onIconCheck(n);
  });

  // iconRemove 이벤트 설정
  n.iconRemove.addEventListener('click', () => {
    onIconRemove(n, price);
  })
}

// Node를 생성하고 className을 추가
function createNodeAndClass(tagName, className) {
  const elem = document.createElement(tagName);
  elem.setAttribute('class', className);
  return elem;
}

// iconCheck 이벤트 함수
function onIconCheck(n) {
  n.itemName.classList.toggle('checked');
  n.iconCheck.classList.toggle('checked');
}

// iconRemove 이벤트 함수
function onIconRemove(n, price) {
  items.removeChild(n.li);
  totalPriceSpan.textContent = `${Number(totalPriceSpan.textContent) - Number(price)}`;

  // 아이템이 모두 삭제된 경우
  if (!items.childElementCount) {
    // 총 금액란 비표시
    items.classList.remove('border');
    totalPrice.classList.remove('show');

    checkAll.classList.remove('show');

    // 안내 문구 표시
    guidance.classList.remove('hidden');
  }
}

// checkAll 이벤트 설정
checkAll.addEventListener('click', () => {
  const itemNames = [...document.querySelectorAll('.item__name')];
  const iconChecks = [...document.querySelectorAll('.item__icon.item__icon--check.far.fa-check-circle')];

  itemNames.forEach(itemName => itemName.classList.add('checked'));
  iconChecks.forEach(iconCheck => iconCheck.classList.add('checked'));
});