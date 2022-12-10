const router = require('express').Router();
const { Request } = require('../../models');
const withAuth = require('../../utils/auth');



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

// update request as claimed
// router.put('/api/requests/:requestId/giver/:userId', async (req, res) => {
//   try {
//     const requestData = await Request.update({
//       request_title: req.body.request_title
//     }, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     res.status(200).json(tagData);
//     if (!userData) {
//       res.status(404).json({ message: 'No request with this id!' });
//       return;
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

