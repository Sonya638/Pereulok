const express = require('express');
const crypto = require('crypto');
const con = require('./config');
const res = require('express/lib/response');
const app = express();
app.use(express.urlencoded({extended: true}));
app.listen(3000);

app.use(express.static(__dirname + '/public'));

app.get('/user',(req,res)=>{
con.query('SELECT * FROM user', (e,result)=>{
             if(e) res.send('DB ERROR');
             else res.send(JSON.stringify(result));
});
});

app.post('/user',(req,res)=>{
             let user = req.body;
con.query(`INSERT INTO
 user(login,password,balance)
 VALUES('${user.login}','${user.password}',0)`,
 (e,result) => {
              if(e) res.send('DB ERROR');
              else res.send('SUCCESS');
 })
});





app.get('/product',(req,res)=>{
             con.query('SELECT * FROM product', (e,result)=>{
                          if(e) res.send('DB ERROR');
                          else res.send(JSON.stringify(result));
             });
             });
             
app.post('/product',(req,res)=>{
             let product = req.body;
con.query(`INSERT INTO
product(name,price,description,img)
             VALUES('${product.name}','${product.price}','${product.description}','${product.img}')`,
             (e,result) => {
                          if(e) res.send(e);
                          else res.send('SUCCESS');
             })
});





app.post('/login' , (req , res)=>{ 
             let user = req.body; 
         con.query(`SELECT id, login, password FROM user WHERE login = '${user.login}'`, 
             (error, result) => { 
                 if (error)  
                     res.send('DataBase ErroR ' + error); 
                 else 
                 if(result.length > 0){ 
                     if (result[0].password == user.password) { 
                         auth(result[0].id,res); 
                     } 
                     else res.send("Wrong Pass");  
                 } 
                 else res.send("Wrong Login");                 
         }) 
         }); 
          
          
         function auth(id,res) { 
             let token = generateToken(); 
             con.query(`UPDATE user SET token = '${token}' WHERE id = ${id}`,  
             (error, result) =>{ 
                 if(error) res.send(error); 
                 else res.send(token); 
             }); 
         } 
          
         function generateToken() { 
             return crypto.randomBytes(64).toString('hex'); 
         };