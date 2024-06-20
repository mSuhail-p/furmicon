
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


const editOffer = async (req, res) => {
    try {

      let {offerID} = req.query
       let selected= await Offer.findOne({_id:offerID})
       res.render('admin/editOffer',{selected})
        

    } catch (error) {
        console.log('as error when rendering editOffer:', error)
    }
}


const editingOffer = async (req, res) => {
    try {


        const { offername, description, type, percentage, id } = req.body
        console.log(id, 'it is iddd')

        let edited = await Offer.updateOne({_id:id},{$set:{
            offerName:offername,
            description:description,
            offPercentage:percentage,
            type:type
        }})

        console.log(edited)
        res.json({edtiStatus:true})

     

    } catch (error) {
        console.log('as error when rendering editingOffer:', error)
    }
}






module.exports = {
    getOffer,
    addOffer,
    deleteOffer,
    editOffer,
    editingOffer
}








