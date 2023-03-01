const express = require("express");
const { isLoggedIn, isRetailer, isProductAuthor} = require("../middleware");
const router = express.Router();
const Product = require("../models/Product");


//Home routes
router.get("/products", async (req, res) => {
  const products = await Product.find({});
  const message = req.flash('success');
  res.render("products/index", { products, message});
});

router.get("/products/new", isLoggedIn, isRetailer, (req, res) => {
  res.render("products/new");
});

//Create a new Product
router.post("/products", isLoggedIn, isRetailer, async (req, res) => {
  try{
    const { name, price, img, desc } = req.body;
  
    //grab the current loggedin user as retailer/consumer 
    const author = req.user._id;

    req.flash('success', 'New Product Created Successfully')
    await Product.create({ name, price, img, author, desc});
    res.redirect("/products");
  }
  catch(e){
    req.flash('error', "Something went wrong");
    res.redirect('/product/new');
  }

});

//Edit Products
router.get('/products/:productId/edit', isLoggedIn, isRetailer, isProductAuthor, async (req, res)=>{
  try{
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.render('./products/edit', {product});
  }
  catch(e){
    req.flash('error', "Something went wrong");
    res.redirect('/products');
  }
})

//Updating the product
router.patch('/products/:productId', isLoggedIn, isRetailer, isProductAuthor, async (req, res)=>{
  try{
    const {productId} = req.params;
    const {name, img, desc, price} = req.body;
    const { author } = req.user._id;
    await Product.findByIdAndUpdate(productId, {name, img, desc, price, author});
    req.flash('success', 'Product Updated Successfully');
    res.redirect(`/products/${productId}`)
  }
  catch(e){
    req.flash('error', "Something went wrong");
    res.redirect('/products');
  }
})

//Deleting the product
router.delete('/products/:productId', isLoggedIn, isRetailer, isProductAuthor, async (req, res)=>{
  try{
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.redirect('/products');
  }
  catch(e){
    req.flash('error', "Something went wrong");
    res.redirect('/products');
  }
});

//Show prodcuts page by fetching id from params
router.get("/products/:productId", async (req, res) => {
  try{
    const { productId } = req.params;
    const product = await Product.findById(productId).populate('reviews');
    const message = req.flash('success');
    res.render("./products/show", {product, message});
  }
  catch(e){
    req.flash('error', "Something went wrong");
    res.redirect('/products');
  }
});


module.exports = router;
