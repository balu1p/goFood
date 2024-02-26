const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        const responseData = {
            foods: global.foods,
            categories: global.categories
        };
        
        res.send(responseData);
    } catch (error) {
        console.error(error.message);
        res.send("Server error");
    }
})

module.exports = router;
