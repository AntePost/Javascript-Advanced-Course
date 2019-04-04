const app = new Vue({
  el: '#app',
  data: {
    items: [],
    seachQuery: '',
    cart: [],
  },
  mounted() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(items => {
        items.forEach((item, i) => {
          item.picSrc = `img/product${i + 1}.jpg`;
        });
        this.items = items;
      });
  },
  computed: {
    filteredItems() {
      const regEx = new RegExp(this.seachQuery, 'i');
      return this.items.filter(item => regEx.test(item.name));
    },
    cartTotal() {
      return this.cart.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
    }
  },
  methods: {
    handleBuyClick(item) {
      const el = this.cart.find(el => el.name === item.name);
      if (el !== undefined) {
        el.quantity++;
      } else {
        const cartItem = {
          name: item.name,
          price: item.price,
          quantity: 1,
        };
        this.cart.push(cartItem);
      }
    },
  },
});
