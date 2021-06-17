const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

//for a single user to find their own info/admin to access single user info
// attach requireToken
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//get user info for admin (attach requireToken and isAdmin to check for auth)
router.get('/admin', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      billingAddressName,
      billingAddressStreet,
      billingAddressCity,
      billingAddressState,
      billingAddressZip,
    } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      billingAddressName,
      billingAddressStreet,
      billingAddressCity,
      billingAddressState,
      billingAddressZip,
    });
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

//create put route for updating user by id
//user should be able to update own profile
//admine should be able to edit any profile
//destructure req.body
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      billingAddressName,
      billingAddressStreet,
      billingAddressCity,
      billingAddressState,
      billingAddressZip,
    } = req.body;
    const updatedUser = await User.update({
      firstName,
      lastName,
      email,
      password,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      billingAddressName,
      billingAddressStreet,
      billingAddressCity,
      billingAddressState,
      billingAddressZip,
    });
    res.status(201).send(updatedUser);
  } catch (error) {
    next(error);
  }
});
