const { json } = require('express');
const functions = require('../Utils/functions');
const express= require('express'),
router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: false}))


router.get(`/`, (req,res) =>{
    req.send(`Welcome to my api : .....`)
})

router.get('/totalSupply', async (req,res) => {
    const z = await functions.getTotal();
    res.send(`total supply is : ${z}`)
   
});

router.get(`/allownce?`, async(req,res) =>{;
    const owner= req.query.owner;
    const spender= req.query.spender;
    const result= await functions.allowance(owner,spender);
    res.send(`totall allownce : ${result}`);

})

router.get('/balanceOf?', async (req,res) =>{
    const add= req.query.add;
    const balance = await functions.balanceOf(add);
    res.send(`balance of : ${JSON.stringify(balance)}`)
    
});


router.post('/transfer',async (req,res) =>{
    const obj=req.body;
    var add=JSON.stringify(obj[0].address);
    add=add.replace(/"/g,'');
    const r= await functions.transferfunds(add,obj[0].value);
    const s= JSON.stringify(r);
    // console.log(r);
    res.send(` s responce : ${s}`);
});


router.post('/approve', async(req,res) =>{
     const obj= req.body;
     var add= JSON.stringify(obj[0].address);
     add=add.replace(/"/g,'');
     const b= await functions.approve(add,obj[0].value);
     res.send(`Approve Success transcation detail: ${JSON.stringify(b)}`);
})

router.post('/transferFrom', async(req,res) =>{
    const obj= req.body;
    var owner= JSON.stringify(obj[0].owner);
    owner=owner.replace(/"/g,'');
    var to=JSON.stringify(obj[0].to);
    to=to.replace(/"/g,'');
    const r = await functions.transferFrom(owner,to,obj[0].value);
    res.send(`Responce : ${JSON.stringify(r)}`);
})

module.exports=router;