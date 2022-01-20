// 현재 날짜 표시
const today = new Date().toISOString().slice(0, 10); // 예) 2020-07-24
const date = document.querySelector('.shop-list__date');
date.setAttribute('datetime', today);
date.textContent = today.replace(/-/g, '. '); // 예) 2020. 07. 24

// 아이템 리스트 추가
const inputItem = document.querySelector('.shop-list__input--item');
const inputPrice = document.querySelector('.shop-list__input--price');
const btn = document.querySelector('.shop-list__btn');

btn.addEventListener('click', addItemList);
inputPrice.addEventListener('keyup', e => {
  let key = e.key || e.keyCode;
  if (key === 'Enter' || key === 13) {
    return addItemList();
  }
})

function addItemList() {
  const itemValue = inputItem.value;
  const priceValue = inputPrice.value.replace(/[^0-9]/g, ''); // 숫자만 입력

  // input 텍스트 초기화
  inputItem.value = '';
  inputPrice.value = '';

  // 입력받은 값이 공백인 경우
  if (itemValue === '' || priceValue === '') return;

  // 아이템 리스트를 element로 만든다
  createListElem(itemValue, priceValue);

  // 총 금액란 표시
  const items = document.querySelector('.shop-list__items');
  items.classList.add('border');
  let totalPrice = document.querySelector('.shop-list__total-price');
  totalPrice.classList.add('show');

  // 안내 문구 비표시
  const guidance = document.querySelector('.shop-list__guidance');
  guidance.classList.add('hidden');

  // 총 금액을 누적하여 더함
  totalPrice = document.querySelector('.shop-list__total-price > span');
  totalPrice.textContent = `${Number(totalPrice.textContent) + Number(priceValue)}`;
}

function createListElem(item, price) {
  const n = {};

  // element를 생성하고 className을 추가
  n.li = createElemAndClass('li', 'shop-list__item');
  n.itemName = createElemAndClass('span', 'item__name');
  n.itemPrice = createElemAndClass('span', 'item__price');
  n.iconCheck = createElemAndClass('i', 'item__icon item__icon--check far fa-check-circle')
  n.iconRemove = createElemAndClass('i', 'item__icon item__icon--remove far fa-trash-alt');

  // 입력받은 item, price를 삽입
  n.itemName.textContent = item;
  n.itemPrice.textContent = `${price}원`;

  // element를 연결
  n.li.appendChild(n.itemName); n.li.appendChild(n.itemPrice);
  n.li.appendChild(n.iconCheck); n.li.appendChild(n.iconRemove);
  const ul = document.querySelector('.shop-list__items');
  ul.appendChild(n.li);

  // ---------- 함수 분할 필요 ---------------

  // click 아이콘 이벤트 설정
  n.iconCheck.addEventListener('click', () => {
    n.itemName.classList.toggle('checked');
    n.iconCheck.classList.toggle('checked');
  })

  // remove 아이콘 이벤트 설정
  const totalPrice = document.querySelector('.shop-list__total-price span');
  n.iconRemove.addEventListener('click', () => {
    ul.removeChild(n.li);
    totalPrice.textContent = `${Number(totalPrice.textContent) - Number(price)}`;

    // 아이템이 모두 삭제된 경우
    if (!ul.childElementCount) {
      // 총 금액란 비표시
      const items = document.querySelector('.shop-list__items');
      items.classList.remove('border');
      const totalPrice = document.querySelector('.shop-list__total-price');
      totalPrice.classList.remove('show');

      // 안내 문구 표시
      const guidance = document.querySelector('.shop-list__guidance');
      guidance.classList.remove('hidden');
    }
  })
}

// element를 생성하고 className을 추가
function createElemAndClass(tagName, className) {
  const elem = document.createElement(tagName);
  elem.setAttribute('class', className);
  return elem;
}
