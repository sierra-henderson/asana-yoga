require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select "productId",
              "name",
              "price",
              "image",
    "shortDescription"
  from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const sql = `
  select *
    from "products"
    where "productId" = $1
  `;
  const id = [req.params.productId];
  db.query(sql, id)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        next(new ClientError(`Cannot find product with "productId" ${id}`, 404));
      } else {
        res.json(product);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (req.session.cartId) {
    const sql = `
      select "c"."cartItemId",
              "c"."price",
              "p"."productId",
              "p"."image",
              "p"."name",
              "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
        where "c"."cartId" = $1
    `;
    db.query(sql, [req.session.cartId])
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  } else {
    res.json([]);
  }
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  const productIdInt = parseInt(productId);
  if (!Number.isInteger(productIdInt) || productIdInt <= 0) {
    next(new ClientError('productId must be a positive number', 400));
    return;
  }
  const sql = `
  select "price",
      "productId"
    from "products"
    where "productId" = $1
  `;
  db.query(sql, [productId])
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        throw new ClientError(`Cannot find product with "productId" ${productId}`, 404);
      } else {
        if (!req.session.cartId) {
          const sql = `
          insert into "carts" ("cartId", "createdAt")
              values (default, default)
            returning "cartId"
        `;
          return db.query(sql)
            .then(newResult => {
              return { cartId: newResult.rows[0].cartId, price: result.rows[0].price, productId: result.rows[0].productId };
            });
        } else {
          return { cartId: req.session.cartId, price: result.rows[0].price, productId: result.rows[0].productId };
        }
      }
    })
    .then(otherResult => {
      req.session.cartId = otherResult.cartId;
      const params = [req.session.cartId, otherResult.productId, otherResult.price];
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
        returning "cartItemId"
      `;
      return db.query(sql, params)
        .then(result => {
          return { cartItemId: result.rows[0].cartItemId };
        });
    })
    .then(result => {
      const sql = `
        select "c"."cartItemId",
                    "c"."price",
                "p"."productId",
                    "p"."image",
                     "p"."name",
          "p"."shortDescription"
            from "cartItems" as "c"
            join "products" as "p" using ("productId")
          where "c"."cartItemId" = $1
      `;
      return db.query(sql, [result.cartItemId])
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    next(new ClientError('there is no cart connected to this order', 400));

  } else {
    if (req.body.name && req.body.creditCard && req.body.shippingAddress) {
      const sql = `
      insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
      values ($1, $2, $3, $4)
      returning "creditCard", "name", "shippingAddress", "orderId", "createdAt"
      `;
      const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
      return db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
          delete req.session.cartId;
        });
    }
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
