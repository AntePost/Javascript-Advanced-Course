function sendRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();

    xhr.onreadystatechange = () => {
      if(xhr.readyState === xhr.DONE) {
        resolve(JSON.parse(xhr.responseText));
      }
    }
  })
}

class ItemsList {
  constructor() {
    this.items = [];
  }

  getItems() {
    return new Promise((resolve, reject) => {
      sendRequest('GET', 'http://localhost:3000/items.json').then(response => {
        this.items = response.map((item, i) => new Item(item.name, item.price, i));
        resolve();
      });
    })

  }

  calcTotal() {
    return this.items.reduce((acc, cur) => acc + cur.price, 0);
  }

  render() {
    const itemsHtml = this.items.map(item => item.render());

    return itemsHtml.join('');
  }
}

class Item {
  constructor(name, price, index) {
    this.price = price;
    this.name = name;
    this.picNum = index + 1;
  }

  render() {
    return `
            <div class="featuredFlexChild">
              <img src="img/product${this.picNum}.jpg" alt="product${this.picNum}">
              <div class="featuredProductHover">
                <button type="button" name="button">
                  <span>Add to Cart</span>
                </button>
              </div>
              <div class="featuredProductText">
                <h3 class="featuredProductName">${this.name}</h3>
                <h3 class="featuredProductPrice">$${this.price}</h3>
                <h6>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </h6>
              </div>
            </div>
           `;
  }
}

class Cart {
  constructor() {
    this.elems = [];
  }

  addElem(elem) {
    this.elems.push(elem);
  }

  removeElem(elem) {
    this.elems = this.elems.filter(el => el !== elem);
  }

  clearCart() {
    // Очищает корзину
  }

  getCartContent() {
    return this.elems;
  }

  render() {
    // Отрисовывает корзину
  }
}

class CartElem {
  constructor() {

  }

  changeQuantity() {
    // Изменяет количество элемента корзины
  }

  render() {
    // Отрисовывает элемент корзины
  }
}

const items = new ItemsList;
items.getItems().then(() => {
  document.querySelector('.featuredFlexContainer').innerHTML = items.render();
});
