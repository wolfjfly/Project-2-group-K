const router = require("express").Router();
const { Request, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    // Get all requests and JOIN with user data
    const requestData = await Request.findAll({
      where: {
        fulfilled: null
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const requests = requestData.map((request) => request.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('reqList', {
      requests,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/thanks", withAuth, async (req, res) => {
  try {
    res.render("thanks")
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/request/:id", withAuth, async (req, res) => {
  try {
    const requestData = await Request.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const request = requestData.get({ plain: true });

    res.render("oneReq", {
      ...request,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Request }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/requests/makeReq", withAuth, async (req, res) => {
  try {
    res.render("makeReq", {logged_in: req.session.logged_in})
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/signUp', async (req, res) => {
  try {
    res.render('signUp')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('signIn')
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
