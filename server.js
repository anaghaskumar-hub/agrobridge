const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let crops = [];
let orders = [];

// Add crop
app.post('/add-crop', (req, res) => {
    const { farmer, name, weight, price } = req.body;

    const exists = crops.some(crop =>
        crop.farmer === farmer &&
        crop.name === name &&
        crop.price === price
    );

    if (exists) {
        return res.json({ message: "Duplicate crop not allowed." });
    }

    crops.push({ farmer, name, weight, price });

    res.json({ message: "Crop added successfully." });
});

// Get crops
app.get('/crops', (req, res) => {
    res.json(crops);
});

// Delete crop + related orders
app.post('/delete-crop/:index', (req, res) => {
    const index = req.params.index;
    const deletedCrop = crops[index].name;

    crops.splice(index, 1);
    orders = orders.filter(order => order.crop !== deletedCrop);

    res.json({ message: "Crop and related orders deleted." });
});

// Place order
app.post('/order', (req, res) => {
    const order = {
        crop: req.body.crop,
        importer: req.body.importer,
        address: req.body.address,
        phone: req.body.phone,
        status: "Paid",
        rating: null,
        date: new Date()
    };

    orders.push(order);
    res.json({ message: "Order placed successfully." });
});

// Get orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Deliver
app.post('/deliver/:index', (req, res) => {
    orders[req.params.index].status = "Delivered";
    res.json({ message: "Delivered." });
});

// Cancel
app.post('/cancel/:index', (req, res) => {
    orders.splice(req.params.index, 1);
    res.json({ message: "Cancelled." });
});

// Rate
app.post('/rate/:index', (req, res) => {
    orders[req.params.index].rating = req.body.rating;
    res.json({ message: "Rated." });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});