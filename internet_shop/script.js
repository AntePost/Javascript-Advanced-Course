class ItemsList {
  constructor() {
    this.items = [];
  }

  getItems() {
    this.items = [
      { name: 'Shirt', price: 150 },
      { name: 'Socks', price: 50 },
      { name: 'Jacket', price: 350 },
      { name: 'Shoes', price: 250 },
    ];

    this.items = this.items.map((item, i) => new Item(item.name, item.price, i));
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

  }

  addElem() {
    // Добавляет товар в корзину
  }

  removeElem() {
    // Удаляет товар из корзины
  }

  clearCart() {
    // Очищает корзину
  }

  getCartContent() {
    // Возвращает список товаров в корзине
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
items.getItems();

document.querySelector('.featuredFlexContainer').innerHTML = items.render();
console.log(items.calcTotal());
