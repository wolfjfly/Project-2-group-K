const router = require('express').Router();
const { Request } = require('../../models');
const withAuth = require('../../utils/auth');
const foundEmail = require('../../utils/foundDonationSendGrid');

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


router.put('/:requestId', async (req, res) => {
  try {
    const requestData = await Request.update({
      giver_id: req.session.user_id,
      fulfilled: true
    }, {
      where: {
        id: req.params.requestId,
      },
    });
    
    if (!requestData) {
      res.status(404).json({ message: 'No request with this id!' });
      return;
    }
    res.status(200).json(requestData);
    // foundEmail()

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const requestData = await Request.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!requestData) {
            res.status(400).json({ message: 'No request found with this id!' });
            return;
        }

        res.status(200).json(requestData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;