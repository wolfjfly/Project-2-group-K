const router = require('express').Router();
const { Request } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require("express-session");
const {claimRequest} = require('../../utils/foundDonationSendGrid');


router.post('/makeReq', withAuth, async (req, res) => {
  try {
    const newRequest = await Request.create({
      ...req.body,
      receiver_id: req.session.user_id,
    });

    res.status(200).json(newRequest);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update request as claimed
router.put('/:requestId', withAuth, async (req, res) => {
  try {
    const requestData = await Request.update({
      giver_id: req.session.user_id,

      fulfilled: true

    }, {
      where: {
        id: req.params.requestId,
      },
    });
    
console.log("claim the Request",requestData)
    if (!requestData) {
      res.status(404).json({ message: 'No request with this id!' });
      return;
    }
    claimRequest(1, "tweetybird42", "Help I need somebody! Help, not just anybody!", "a nice bicycle")
    res.status(200).json(requestData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const requestData = await Request.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!requestData) {
      res.status(404).json({ message: 'No request found with this id!' });
      return;
    }

    res.status(200).json(requestData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

