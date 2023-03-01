const Product = require('./models/Product');

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'You need to login first.')
        res.redirect('/login');
        return;
    }
    return next();
}

module.exports.isRetailer = (req, res, next)=> {
    if(req.user.userType === 'retailer'){
        return next();
    }
    req.flash('error', 'You need to be registered as a Retailer.')
    res.redirect('/products');
}

module.exports.isProductAuthor = async (req, res, next)=>{
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if(product.author && product.author.equals(req.user._id)){
        return next();
    }
    req.flash('error', "You need to be registered as a Retailer first.");
    res.redirect('/products');
}