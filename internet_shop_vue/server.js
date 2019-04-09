const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/products', (req, res, next) => {
  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
  });
});

app.get('/cart', (req, res, next) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
  });
});

app.put('/cart', (req, res, next) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let cart = JSON.parse(data);
    cart = [];
    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
      res.send(cart);
    });
  });
});

app.post('/cart', (req, res, next) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const cart = JSON.parse(data);
    cart.push(req.body);
    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
      res.send(req.body);
    });
  });

  next();
});

app.post('/cart', (req, res, next) => {
  fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const stats = JSON.parse(data);
    const newEnrty = {
      type: 'add',
      name: req.body.name,
      date: new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    stats.push(newEnrty);

    fs.writeFile('./db/stats.json', JSON.stringify(stats), () => {
      console.log('Stats updated');
    });
  });
});

app.patch('/cart/:id', (req, res, next) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let cart = JSON.parse(data);

    req.modifiedItem = cart.find(el => el.id == req.params.id);

    cart = cart.map(el => {
      if (el.id == req.params.id) {
        el.quantity = req.body.quantity;
      }
      return el;
    })

    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
      res.send(cart.find(el => el.id == req.params.id));
    });
  });

  next();
});

app.patch('/cart/:id', (req, res, next) => {
  fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const stats = JSON.parse(data);
    const newEnrty = {
      type: 'change quantity',
      name: req.modifiedItem.name,
      date: new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    stats.push(newEnrty);

    fs.writeFile('./db/stats.json', JSON.stringify(stats), () => {
      console.log('Stats updated');
    });
  });
});

app.delete('/cart/:id', (req, res, next) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let cart = JSON.parse(data);

    req.removedItem = cart.find(el => el.id == req.params.id);
    cart = cart.filter(el => el.id != req.params.id);

    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
      res.status(204).send();
    });
  });

  next();
});

app.delete('/cart/:id', (req, res, next) => {
  fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const stats = JSON.parse(data);
    const newEnrty = {
      type: 'remove',
      name: req.removedItem.name,
      date: new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    stats.push(newEnrty);

    fs.writeFile('./db/stats.json', JSON.stringify(stats), () => {
      console.log('Stats updated');
    });
  });
});

app.listen(3000, () => console.log('Server has started'));
