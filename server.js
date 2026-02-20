const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let crops=[];
let orders=[];

app.post('/add-crop',(req,res)=>{
    const {farmer,name,weight,price}=req.body;

    const exists=crops.some(c=>c.farmer===farmer && c.name===name && c.price===price);
    if(exists) return res.json({message:"Duplicate crop not allowed."});

    crops.push({farmer,name,weight,price});
    res.json({message:"Crop added successfully."});
});

app.get('/crops',(req,res)=>res.json(crops));

app.post('/delete-crop/:index',(req,res)=>{
    const index=req.params.index;
    const deleted=crops[index].name;
    crops.splice(index,1);
    orders=orders.filter(o=>o.crop!==deleted);
    res.json({message:"Deleted"});
});

app.post('/order',(req,res)=>{
    const order={
        crop:req.body.crop,
        importer:req.body.importer,
        quantity:req.body.quantity,
        house:req.body.house,
        area:req.body.area,
        street:req.body.street,
        landmark:req.body.landmark,
        pincode:req.body.pincode,
        phone:req.body.phone,
        status:"Paid",
        rating:null,
        date:new Date()
    };
    orders.push(order);
    res.json({message:"Order placed successfully."});
});

app.get('/orders',(req,res)=>res.json(orders));

app.post('/deliver/:index',(req,res)=>{
    orders[req.params.index].status="Delivered";
    res.json({message:"Delivered"});
});

app.post('/cancel/:index',(req,res)=>{
    orders.splice(req.params.index,1);
    res.json({message:"Cancelled"});
});

app.post('/rate/:index',(req,res)=>{
    orders[req.params.index].rating=req.body.rating;
    res.json({message:"Rated"});
});

app.listen(3000, () => {

    console.log("Server running at http://localhost:3000");
});