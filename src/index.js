import express from 'express';
import { config } from './config/config.js';
import { productsRouter, cartsRouter } from './routers/routers.js';

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.server.routes.products, productsRouter);
app.use(config.server.routes.carts, cartsRouter);

app.get('/info', (req, res) => {
  res.send({ status: 'success', port: config.server.PORT });
});

app.use(function (req, res) {
  res.status(404);
  res.json({
    error: 404,
    description: `Ruta: ${req.url} | method ${req.method} no implementada`,
  });
});

const server = app.listen(config.server.PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});
server.on('error', (error) => {
  console.error(`Server error: ${error}`);
});
