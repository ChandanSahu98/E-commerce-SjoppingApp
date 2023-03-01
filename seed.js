const mongoose = require("mongoose");
const Product = require("./models/Product");
mongoose
  .connect("mongodb://127.0.0.1:27017/shopping-app-DB")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const products = [
  {
    name: "Nike airforces",
    img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    price: 300,
    desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
  },
  {
    name: "Nike Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: 100,
    desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
  },
  {
    name: "Air Jordan 1",
    img: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    price: 150,
    desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
  },
  {
    name: "Puma shoes",
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    price: 250,
    desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
  },
  {
    name: "Converse retro",
    img: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80",
    price: 250,
    desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
  },
  {
    name: "Vans Old Skool",
    img: "https://images.unsplash.com/photo-1654147801991-a9fa8594e900?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
    price: 350,
    desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
  },
  {
    name: "Converse All Star",
    img: "https://images.unsplash.com/photo-1556048219-bb6978360b84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    price: 350,
    desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
  },
  {
    name: "Airforces 1",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80",
    price: 350,
    desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
  },
];

async function seedProducts() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("products seeded");
}
seedProducts();
