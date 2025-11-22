const express = require('express');
const { toggleDishSwitch, getDishes, postDishes } = require('../Controller/DishController');
const router = express.Router();

router.post('/post', postDishes);
router.get('/get', getDishes);
router.put('/switch/:id', toggleDishSwitch);

module.exports = router;