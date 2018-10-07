const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

var PusherAuth = new Pusher({
    appId: '615946',
  key: 'e31eef0acf7f58091bd0',
  secret: '5278a248ec7028d464ac',
  cluster: 'ap1'
  });

router.get('/', (req, res) => {
    res.send('My API');
});
router.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = PusherAuth.authenticate(socketId, channel);
    res.send(auth);

  });
module.exports = router;