const router = require('express').Router();
const { Request, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
    try {
        const requestData = await Request.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        const requests = requestData.map((request) => request.get({ plain:true }));

        res.render ('reqList', {
            requests,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/request/:id", async (req,res) => {
    try {
        const requestData = await Request.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        const request = requestData.get({ plain:true });

        res.render("oneReq", {
            ...request,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/profile", withAuth, async (req,res) => {
    try {
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

router.get("/requests/makeReq", async (req,res) => {
    try {
        res.render("makeReq")
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/signUp', async (req,res) => {
    try {
        res.render('signUp')
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', async (req,res) => {
    try {
        res.render('signIn')
    } catch (err) {
        res.render(500).json(err);
    }
});

module.exports = router;
