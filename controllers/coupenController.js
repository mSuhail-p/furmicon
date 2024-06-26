const Coupen = require('../model/coupenModel')


const getCoupen = async (req, res) => {
    try {
        let coupens = await Coupen.find({})
        res.render('admin/coupen', { coupens })
    } catch (error) {
        console.log('error rendering getCoupen page:', error)
    }
}



const addCoupen = async (req, res) => {
    try {
        console.log("req.body")
        console.log(req.body)
        const { coupenname, coupenCode, discount, expiryDate, minpurchaseamount } = req.body
        let addingCoupen = new Coupen({
            coupenName: coupenname,
            coupenCode: coupenCode,
            discountPercentage: discount,
            activationDate: new Date(),
            expiryDate: expiryDate,
            cryteriaAmount: minpurchaseamount

        })
        await addingCoupen.save()
        res.json({ status: true })


    } catch (error) {
        console.log('error rendering addCoupen page:', error)
    }
}

const accessCoupen = async (req, res) => {
    try {

        let coupenCode = req.query.coupencode

        let matchingCode = await Coupen.find({ coupenCode: coupenCode })
        if (matchingCode.length > 0) {
            console.log(matchingCode, 'kdskflsd')
            res.json({ matchingCode })

        } else {
            res.json({ status: false })
        }



    } catch (error) {
        console.log('error rendering addCoupen page:', error)
    }
}

let deleteCoupen = async (req, res) => {
    try {
        let { coupenId } = req.params

        let deleteCoupen = await Coupen.deleteOne({ _id: coupenId })
        res.json({ deleteCoupen: true })


    } catch (error) {
        console.log("error rendering deleteCoupen  :", error)
    }
}

let getEditCoupen = async (req, res) => {

    try {

        const {coupenId} = req.query
        let existCoupen = await Coupen.findOne({_id:coupenId})
        console.log(existCoupen)
        res.render('admin/editCoupen',{existCoupen})



    } catch (error) {
        console.log('error rendering get edit coupen:', error)
    }
}


let editCoupen = async (req, res) => {

    try {
        console.log('it is edit coupen')
        console.log(req.body)
        const { coupenName, couponCode, discount, expiryDate,  minPurchaseAmount ,coupenId } = req.body

        console.log( coupenName, couponCode, discount, expiryDate,  minPurchaseAmount ,coupenId)


        let updateCoupen = await Coupen.updateOne({_id:coupenId},{$set:{
            coupenName:coupenName,
            coupenCode:couponCode,
            discountPercentage:discount,
            expiryDate:expiryDate,
            cryteriaAmount:minPurchaseAmount
        }}) 

        console.log(updateCoupen)
        res.json({coupenUpdate:true})
        


    } catch (error) {
        console.log('error rendering edit coupen:', error)
    }
}



module.exports = {

    getCoupen,
    addCoupen,
    accessCoupen,
    deleteCoupen,
    getEditCoupen,
    editCoupen
}