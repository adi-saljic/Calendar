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



const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the email service you prefer
    auth: {
      user: 'adi.saljic.as@gmail.com', // Your email address
      pass: 'lpnk luhq lagj gial' // Your email password or application-specific password
    }
  });

const createToken = (id) => {
    return jwt.sign({id}, "3n0g@J2sh3K0nj@B!j3l0g2!", {
        expiresIn: 8 * 60 * 60
    })
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
                const token = createToken(req.body.admin);
                res.cookie('jwt', token,{ httpOnly: true, maxAge: 8*60*60*1000 })
                res.sendStatus(200);


            }else {
                res.sendStatus(403);
            }

            }
        
    })
  });

  router.post('/admin/logout', function (req,res){
        res.cookie('jwt', '' , {maxAge : 1});
        res.sendStatus(200);

  });

  router.get('/admin' ,query.termini,function(req,res,next){
    if(req.cookies.jwt){
        res.json({termini:req.termini})
    }
    else{
        res.sendStatus(403);
    }
    
})
  


router.post('/spasi',function(req,res,next){
    console.log(req.body)
    let data = req.body;
    pool.query(`INSERT INTO termini (datum, vrijeme, ime, prezime, broj_telefona, email, komentar,vrsta_pregleda, zakljucen)
                VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9); `,[data.date, data.hour, data.name, data.lastname, data.phone, data.email, data.comments,data.selectedOption, data.zakljucen] ,(err, result) => {
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
                pool.query(`UPDATE termini SET  ime = $1, prezime = $2, broj_telefona = $3, email = $4, komentar = $5 ,vrsta_pregleda = $6, zakljucen = 'Da'
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


router.post('/admin/delete/:id', function(req,res,next){
    let id = req.params.id;
    const str = `delete from termini where id =` + id + `;`
    console.log(str);
    
    pool.query(str, (err, result) => {
        if(err){
            console.log(" ERROR ERROR  ", err);
        }else{
            res.sendStatus(200);
                
        }
    });
    
    
})


router.post('/message',function(req,res,next){
    let data = req.body;
    pool.query(`INSERT INTO poruke (datum, ime, prezime, broj_telefona, email, poruka)
                VALUES ($1, $2, $3, $4, $5, $6); `,[new Date(),data.name, data.lastname, data.phone, data.email, data.comments] ,(err, result) => {
        if(err){
            console.log(err);
        }else{

            const mailOptions = {
                from: 'adi.saljic.as@gmail.com',
                to: 'adi.saljic.as@gmail.com', // Replace with your email address
                subject: 'KONTAKT PORUKA',
                text: `Ime i prezime: ${data.name} ${data.lastname}\n Broj telefona: ${data.phone}\nEmail: ${data.email}\nPoruka:\n${data.comments}`,
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

router.post('/search',function(req,res,next){
    let data = req.body.searchValue.split(' ').filter(str => str !== '');
    let queryString =  `select * from termini where `
    if(data.length === 1){
        queryString += ` lower(ime) = lower('` +data[0] +`') or lower(prezime) = lower('` + data[0] +`')`;
    }
    else {
        queryString += ` (lower(ime) = lower('` +data[0] +`') and lower(prezime) = lower('` + data[1] +`')) or (lower(ime) = lower('` +data[1] +`') and lower(prezime) = lower('` + data[0] +`'))`;
    }

    pool.query(queryString, (err, result) => {
        if(err){
            console.log(" ERROR ERROR  ", err);
        }else{
            console.log(result.rows)
            res.json({searchOutput: result.rows})
                
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