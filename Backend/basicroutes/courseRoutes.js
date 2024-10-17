const express = require('express');
const router = express.Router();

const courseModel = require('../model/courseData');
router.use(express.json());
router.use(express.urlencoded({extended:true}));

// Default root route
router.get('/', async (req, res) => {
    try {
        const data = await courseModel.find(); // Fetch all courses from the database
        res.status(200).json(data); // Send the data as a JSON response
    } catch (error) {
        res.status(500).send('Error retrieving data'); // Send an error response if fetching fails
    }
});


router.get('/:id', async (req, res) => {
    try {
        const id=req.params.id;
        const data = await courseModel.findById(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send('Data not found');
    }
})

//post operation
router.post('/addCourse',async(req,res)=>{
    try {
        var item=req.body;
        const data1 = await courseModel(item);
        const saveddata = await data1.save();
        res.status(200).send('Post Successfull');
    } catch (error) {
        res.status(404).send(error);
    }
})


// anothersimpleway
// router.post('/', async (req, res) => {
//     try {
//         const data = await courseModel.create(req.body);
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// })



//Update Operation
router.put('/edit/:id', async (req, res) => {
        try {
            const id=req.params.id;
            const data = await courseModel.findByIdAndUpdate(id,req.body);
            res.status(200).send("Update Successfull");
        } catch (error) {
            res.status(404).send(error);
        }
    })

    //Delete Operation
router.delete('/delete/:id', async (req, res) => {
    try {
        const id=req.params.id;
        const data = await courseModel.findByIdAndDelete(id,req.body);
        res.status(200).send("Delete Successfull");
    } catch (error) {
        res.status(404).send(error);
    }
})




module.exports = router;