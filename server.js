const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let crops = [];
let orders = [];
let cropIdCounter = 1;

/* ---------------- ADD CROP ---------------- */
app.post('/add-crop', (req, res) => {
    const { farmer, name, weight, price } = req.body;

    if (!farmer || !name || !weight || !price)
        return res.json({ message: "All crop fields required" });

    if (isNaN(weight) || isNaN(price))
        return res.json({ message: "Weight and price must be numbers" });

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

/* ---------------- GET CROPS ---------------- */
app.get('/crops', (req, res) => {
    res.json(crops);
});

/* ---------------- DELETE CROP ---------------- */
app.post('/delete-crop/:id', (req, res) => {
    const id = Number(req.params.id);
    crops = crops.filter(c => c.id !== id);
    orders = orders.filter(o => o.cropId !== id);
    res.json({ message: "Deleted" });
});

/* ---------------- CHECKOUT ---------------- */
app.post('/checkout', (req, res) => {

    const { importer, cart, address } = req.body;

    if (!cart || cart.length === 0)
        return res.json({ message: "Cart empty" });

    if (!address.house || !address.area || !address.state || !address.district)
        return res.json({ message: "Complete address required" });

    if (!/^\d{6}$/.test(address.pincode))
        return res.json({ message: "Pincode must be 6 digits" });

    if (!/^\d{10}$/.test(address.phone))
        return res.json({ message: "Phone must be 10 digits" });

    let totalAmount = 0;

    for (let item of cart) {

        const crop = crops.find(c => c.id === item.cropId);
        if (!crop)
            return res.json({ message: "Crop not found" });

        if (crop.weight < item.quantity)
            return res.json({ message: "Insufficient stock for " + crop.name });

        crop.weight -= item.quantity;

        totalAmount += item.quantity * crop.price;

        orders.push({
            cropId: crop.id,
            crop: crop.name,
            farmer: crop.farmer,
            importer,
            quantity: item.quantity,
            price: crop.price,
            status: "Order Placed",
            tracking: "Preparing",
            rating: null,
            address,
            date: new Date()
        });
    }

    const gst = totalAmount * 0.05;
    const delivery = 50;
    const grandTotal = totalAmount + gst + delivery;

    res.json({
        message: "Payment Successful",
        grandTotal
    });
});

/* ---------------- GET ORDERS ---------------- */
app.get('/orders', (req, res) => {
    res.json(orders);
});

/* ---------------- UPDATE TRACKING ---------------- */
app.post('/update-status/:index', (req, res) => {
    orders[req.params.index].tracking = req.body.status;
    res.json({ message: "Status Updated" });
});

/* ---------------- RATE ---------------- */
app.post('/rate/:index', (req, res) => {
    orders[req.params.index].rating = req.body.rating;
    res.json({ message: "Rated" });
});

/* ---------------- REVENUE ---------------- */
app.get('/revenue/:farmer', (req, res) => {

    const farmerOrders = orders.filter(o => o.farmer === req.params.farmer);

    let revenue = 0;
    farmerOrders.forEach(o => revenue += o.quantity * o.price);

    res.json({
        totalOrders: farmerOrders.length,
        revenue
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});