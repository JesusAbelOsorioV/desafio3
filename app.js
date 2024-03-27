const express = require('express')

const app = express();
const ProductManager = require('./ProductManagar');
const { error } = require('console');
const productManager = new ProductManager('./Products.json');

app.use(express.urlencoded({ extended: true}));

app.get('/products', async (req, res)=>{
    const limit = parseInt(req.query.limit);
    const product = await productManager.getProducts();

    if(!isNaN(limit) && limit > 0){
        const limitedProducts = product.slice(0, limit);
        res.send(limitedProducts);
    }else{
        res.send(product);
    }
});

app.get('/products/:pid', async (req, res)=>{
    const {pid} = req.params;
    const productId = await productManager.getProductsById(pid);
    
    if (!productId) {
        res.send({ error: `Producto con el id:${pid} no existe`});
    }else{
        res.send(productId);
    }
});

app.listen(8080, () =>{
    console.log('Servidor Corriendo en el puerto 8080.');
});