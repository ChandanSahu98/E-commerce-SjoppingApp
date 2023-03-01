const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const { isLoggedIn } = require('../middleware');

router.post('/products/:productId/review', isLoggedIn, async (req, res)=>{
    try{
        const {productId} = req.params;
        const {rating, comment} = req.body;
        const {username} = req.user;

        //finding the product by id.
        const product = await Product.findById(productId);

        //creating the review in review collection.
        const review = await Review.create({rating, comment, author: username});

        //pushing the product review into Product collection's reviews array with referencing _id.
        product.reviews.push(review);
        await product.save();
        req.flash('success', 'Created your review successfully');
        res.redirect(`/products/${productId}`);
    }
    catch(e){
        req.flash('error', "Something went wrong");
        res.redirect(`/product/${req.params.productId}`);
    }
});

module.exports=router;