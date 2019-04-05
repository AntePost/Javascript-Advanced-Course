Vue.component('search', {
  template: `<input type="text" placeholder="Search" @input="$emit('input', $event.target.value)">`,
});

Vue.component('cart', {
  props: ['cart', 'cart_total'],
  template: `
              <div class="cartWrapper">
                <h3>Cart</h3>
                <div class="cart" v-if="cart.length">
                  <p v-for="cartItem in cart">There is {{ cartItem.quantity }} item of {{ cartItem.name }} in the cart with the price of {{ cartItem.price * cartItem.quantity }}</p>
                  <p>The sum total of items in the cart - {{ cart_total }}</p>
                </div>
                <span v-if="!cart.length">The cart is empty</span>
              </div>
            `
});

Vue.component('error', {
  props: ['response_code'],
  template: `<p>There was an error with code {{ response_code }}`,
});

const app = new Vue({
  el: '#app',
  data: {
    items: [],
    searchQuery: '',
    cart: [],
    responseCode: null,
  },
  mounted() {
    fetch('http://localhost:3000/products')
      .then(response => {
        this.responseCode = response.status;
        return response.json();
      })
      .then(items => {
        this.items = items.map((item, i) => {
          item.picSrc = `img/product${i + 1}.jpg`;
          return item;
        });
      });
  },
  computed: {
    filteredItems() {
      const regEx = new RegExp(this.searchQuery, 'i');
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
