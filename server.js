const express = require('express');

const app = express();



app.get('/nonce', async(req, res)=>{
    const { publicAddress } = req.query;
    if(!publicAddress) {
        return res.status(403).send({ success: false, message: 'Required publicAddress'});
    }
    // check for existence of Public address in User.Model
    // generate a random nonce and save to user and return to fronend.
})

app.post('/login', async(req, res)=> {
    // get signature, publickey
    // fetch user.
    // create message.
    // verify signature
    // create a JWT.
    // return to the User.
})

app.get('/activity', async(req, res)=> {
    // verify jwt and decode publiaddress
    // fetch activity for the address
    // return
})

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
