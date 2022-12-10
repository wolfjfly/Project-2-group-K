const router = require('express').Router();
const { Request } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/makeReq', async (req, res) => {
  try {
    res.render('makeReq')
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newRequest = await Request.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRequest);
  } catch (err) {
    res.status(400).json(err);
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

