const Dish = require("../Model/Dish");

async function postDishes(req, res) {
    try {
        const io = req.app.get("io");
        const {dishName, imageUrl } = req.body;
        let {isPublished} = req.body;

        if(!dishName || !imageUrl) {
            return res.status(400).json({ message: 'Dish name, image URL, and publication status are required' });
        }
        const newDish = await Dish.create({
            dishName,
            imageUrl,
            isPublished
        });

        return res.status(201).json({
            message: "Dish Added Successfully",
            dish: newDish,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "Something went wrong, please try again later."})
    }
}

async function getDishes(req, res) {
    try {
        const dishes = await Dish.find();
        if(!dishes || dishes.length === 0) {
            return res.status(404).json({ message: 'No published dishes found' });
        }
        return res.status(200).json({ dishes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "Something went wrong, please try again later."})
    }
}

async function toggleDishSwitch(req, res) {
    try {

        const {id : dishId} = req.params;

        if(!dishId) {
            return res.status(400).json({ message: 'Dish ID is required' });
        }

        const dishInDb = await Dish.findOne({ _id: dishId});
        if(!dishInDb) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        dishInDb.isPublished = !dishInDb.isPublished;
        await dishInDb.save();

        return res.status(200).json({
            message: "Dish publication status toggled successfully",
            dish: dishInDb,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "Something went wrong, please try again later."})
    }
}

module.exports = {
    postDishes,
    getDishes,
    toggleDishSwitch,
};