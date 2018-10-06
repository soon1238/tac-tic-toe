const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const pusherAuth = new Pusher({
    appId: '615946',
    key: 'e31eef0acf7f58091bd0',
    secret: '5278a248ec7028d464ac',
  });

router.get('/', (req, res) => {
    res.send('My API');
});
router.post('/pusher/auth', (req, res) => {
    console.log('POST to /pusher/auth');
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});
module.exports = router;