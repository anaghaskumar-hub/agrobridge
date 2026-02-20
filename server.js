const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let crops = [];
let orders = [];
let cropIdCounter = 1;

// ADD CROP
app.post('/add-crop', (req, res) => {
    const { farmer, name, weight, price } = req.body;

    const exists = crops.some(c =>
        c.farmer === farmer &&
        c.name === name &&
        c.price === price
    );

    if (exists)
        return res.json({ message: "Duplicate crop not allowed." });

    crops.push({
        id: cropIdCounter++,
        farmer,
        name,
        weight: Number(weight),
        price: Number(price)
    });

    res.json({ message: "Crop added successfully." });
});

// GET CROPS
app.get('/crops', (req, res) => {
    res.json(crops);
});

// DELETE CROP
app.post('/delete-crop/:id', (req, res) => {
    const id = Number(req.params.id);

    crops = crops.filter(c => c.id !== id);
    orders = orders.filter(o => o.cropId !== id);

    res.json({ message: "Deleted" });
});

// PLACE ORDER
app.post('/order', (req, res) => {
    const { cropId, importer, quantity, house, area, street, landmark, pincode, phone } = req.body;

    const crop = crops.find(c => c.id === cropId);

    if (!crop)
        return res.json({ message: "Crop not found" });

    if (crop.weight < quantity)
        return res.json({ message: "Not enough stock available" });

    crop.weight -= quantity;

    orders.push({
        cropId: crop.id,
        crop: crop.name,
        farmer: crop.farmer,
        importer,
        quantity,
        house,
        area,
        street,
        landmark,
        pincode,
        phone,
        status: "Paid",
        rating: null,
        date: new Date()
    });

    res.json({ message: "Order placed successfully." });
});

// GET ORDERS
app.get('/orders', (req, res) => {
    res.json(orders);
});

// DELIVER
app.post('/deliver/:index', (req, res) => {
    orders[req.params.index].status = "Delivered";
    res.json({ message: "Delivered" });
});

// CANCEL
app.post('/cancel/:index', (req, res) => {
    const order = orders[req.params.index];

    const crop = crops.find(c => c.id === order.cropId);
    if (crop) crop.weight += order.quantity;

    orders.splice(req.params.index, 1);
    res.json({ message: "Cancelled" });
});

// RATE
app.post('/rate/:index', (req, res) => {
    orders[req.params.index].rating = req.body.rating;
    res.json({ message: "Rated" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});