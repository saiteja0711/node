const fs = require ('fs');
const path = require ('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id,productprice){
        //Fetch the previous cart
          fs.readFile(p, (err,fileContent) => {
            let cart = {products:[], totalprice:0};
              if(!err){
                cart= JSON.parse(fileContent);
              }
         //Analyze the cart =>Find excisting product
          const existingProductIndex = cart.products.findIndex(prod =>prod.id === id);
          const existingProduct = cart.products[existingProductIndex];
          let updatedProduct;
          //add new product/ increse quantity
          if (existingProduct) {
             updatedProduct = {...existingProduct };
             updatedProduct.qty = updatedProduct.qty + 1;
             cart.products = [...cart.products];
             cart.products[existingProductIndex]= updatedProduct;
            }
            else {
                updatedProduct = {id : id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalprice = cart.totalprice + +productprice;
            fs.writeFile(p,JSON.stringify(cart),(err) =>{
               console.log(err); 
            });
            
          });
        
    
    }
};
