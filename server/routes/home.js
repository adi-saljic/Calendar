var express = require('express');
var router = express.Router();
const pool = require('../db/Pool')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");


let query = {
    termini :function (req,res,next){
            pool.query(`select * from termini `, (err, result) => {
                if(err){
                    console.log(err);
                }else{
                    req.termini = result.rows;
                    next();
                }
            });
    },
    terminiId :function (req,res,next){
        pool.query(`select * from termini where id = $1`,[req.params.id], (err, result) => {
            if(err){
                console.log(" ERROR ERROR  ", err);
            }else{
                req.termin = result.rows;
                next();
            }
        });
},
}

const createToken = (email) => {
    return jwt.sign({email},"adminSecret",{
      expiresIn: 2 * 60 * 60
    })
  }

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the email service you prefer
    auth: {
      user: 'adi.saljic.as@gmail.com', // Your email address
      pass: 'evjf peiv fjth naqj' // Your email password or application-specific password
    }
  });

  const auth = (req,res,next) => {
    const token = req.cookies?.adm;
    console.log("Token auth ", req.cookies)
    if(token){
      jwt.verify(token,"adminSecret",(err,decodedToken) => {
        if(err){
          console.log(err.message);
          res.sendStatus(403)
        } else{
          next();
        }
      });
    }else{
        res.sendStatus(403)
    }
  }

router.get('/', query.termini,function(req,res,next){
    res.json({termini:req.termini})
})



router.post('/admin/logged', function (req,res){
    console.log(req.body)
    pool.query('select * from admin', (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            admin = result.rows[0];
            console.log(admin);
            if(req.body.email === admin.email &&  bcrypt.compareSync(req.body.password, admin.password)){
                req.session.user = result;
                res.sendStatus(200);
                if (res.headersSent) {
                    console.log('Cookie has been set');
                    // If you see this message, it means the cookie has been successfully set.
                } else {
                    console.log('Cookie was not set');
                    // If you see this message, it means there was an issue setting the cookie.
                }
                //res.sendStatus(200);

            }else {
                res.sendStatus(403);
            }

            }
        
    })
  });

  router.get('/admin' ,query.termini,function(req,res,next){
    if(req.session.user){
        res.json({termini:req.termini})
    }
    else{
        res.sendStatus(403);
    }
    
})
  


router.post('/spasi',function(req,res,next){
    console.log(req.body)
    let data = req.body;
    pool.query(`INSERT INTO termini (datum, vrijeme, ime, prezime, broj_telefona, email, komentar,vrsta_pregleda)
                VALUES ($1, $2, $3, $4, $5, $6, $7,$8); `,[data.date, data.hour, data.name, data.lastname, data.phone, data.email, data.comments,data.selectedOption] ,(err, result) => {
        if(err){
            console.log(err);
        }else{

            const mailOptions = {
                from: 'adi.saljic.as@gmail.com',
                to: 'adi.saljic.as@gmail.com', // Replace with your email address
                subject: 'REZERVACIJA',
                text: `Ime i prezime: ${data.name} ${data.lastname}\n Broj telefona: ${data.phone}\nEmail: ${data.email}\nDatum i vrijeme: ${data.date} ${data.hour}\nVrsta pregleda: ${data.selectedOption} \nKomentar:\n${data.comments}`,
                priority: 'high'
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                  res.status(500).send('Email could not be sent.');
                } else {
                  console.log('Email sent: ' + info.response);
                  res.status(200).send('Email sent successfully.');
                }
              });

            res.sendStatus(200);
        }
    });
    
})
router.get('/admin/:id', query.terminiId,function(req,res,next){
    console.log(req.params.id)
    res.json({termin:req.termin[0]})
})

router.post('/update/:id', function(req,res,next){
    let id = req.params.id;
    pool.query(`select * from termini where id = $1`,[id], (err, result) => {
        if(err){
            console.log(" ERROR ERROR  ", err);
        }else{
            let data = {
                name : req.body.name === '' ? result.rows[0].ime : req.body.name,
                lastname : req.body.lastname === '' ? result.rows[0].prezime : req.body.lastname,
                phone : req.body.phone === '' ? result.rows[0].broj_telefona : req.body.phone,
                email : req.body.email === '' ? result.rows[0].email : req.body.email,
                comments : req.body.comments === '' ? result.rows[0].komentar : req.body.comments,
                selectedOption : req.body.selectedOption === '' ? result.rows[0].vrsta_pregleda : req.body.selectedOption,
            }
                pool.query(`UPDATE termini SET  ime = $1, prezime = $2, broj_telefona = $3, email = $4, komentar = $5 ,vrsta_pregleda = $6
                            WHERE id = $7 `,[ data.name, data.lastname, data.phone, data.email, data.comments,data.selectedOption,id] ,(err, result) => {
                    if(err){
                        console.log(err);
                    }else{
                        res.sendStatus(200);
                    }
                });
                
        }
    });
    
    
})


  
// router.get('/dodan',function (req,res){
//     console.log(bcrypt.hashSync('admin',5));
//     pool.query(`insert into admin(email,password) values ('admin', $1)`,[bcrypt.hashSync('admin',5)],(err,result)=>{
//     if(err){
//       console.log(err);
//     }
//     else{
//       res.sendStatus(200);
//     }
//   })
// })

module.exports = router;