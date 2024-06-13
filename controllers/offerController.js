
const Offer = require('../model/OfferModel')
const Product = require('../model/product')
const Category = require('../model/category')

const getOffer = async (req, res) => {
    try {

        let offer = await Offer.find({})
        console.log(offer)

        res.render('admin/offer', { offer })


    } catch (error) {
        console.log(error)
    }
}


const addOffer = async (req, res) => {
    try {
        const { offername, description, type, percentage } = req.body

        const addOffer = new Offer({
            offerName: offername,
            description: description,
            offPercentage: percentage,
            type: type
        })

        offerSaved = await addOffer.save()
        console.log(offerSaved)
        res.json({ status: true })



    } catch (error) {
        console.log('as error when rendering addoffer:', error)
    }
}



const deleteOffer = async (req, res) => {
    try {
        console.log('it is delete offer')
        const { offerId } = req.params
        let findOffer = await Offer.findOne({ _id: offerId })
        console.log(findOffer, 'it is findoffer')
        if (findOffer.type == 'product') {
            await Product.updateMany(
                { offer: offerId },
                { $unset: { offer: "" } }
            )

        } else {
            await Category.updateMany(
                { offer: offerId },
                { $unset: { offer: "" } }
            )
        }
        let deleteOffer = await Offer.deleteOne({ _id: offerId })

        res.json({ delete: true })

    } catch (error) {
        console.log('as error when rendering deleteOffer:', error)
    }
}





module.exports = {
    getOffer,
    addOffer,
    deleteOffer
}








