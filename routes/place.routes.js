const router = require("express").Router();
const Place = require("../models/Place.model")



// lista de places
router.get("/places", (req, res, next) => {


    Place.find()
        .then(allPlaces => res.render("places/places", {allPlaces}) )

});


// crear place
router.get("/places/create", (req, res, next) => {

    res.render("places/places-create")

})

router.post("/places/create", (req, res, next) => {

    const { name, type } = req.body

    Place.create({ name, type })
        .then(createPlace => res.redirect("/places"))
        .catch(err => console.log(err))


})






// Place details
router.get("/places/details/:id", (req, res, next) => {

    const { id } = req.params

    Place.findById(id)
        .then(place => res.render("places/places-details", {place}))
        .catch(err => console.log(err))

})









// Editar place
router.get("/places/details/edit/:id", (req, res) => {

    const { id } = req.params
    
    Place.findById(id)
        .then(place => res.render("places/places-edit", {place}))
        .catch(err => console.log(err))

})

router.post("/places/details/edit/:id", (req, res) => {

    const { id } = req.params
    const { name, type } = req.body

    Place.findByIdAndUpdate(id, { name, type }, { new: true })
        .then((place) => res.redirect(`/places/details/${place._id}`))
        .catch(err => console.log(err))

})
















module.exports = router;

