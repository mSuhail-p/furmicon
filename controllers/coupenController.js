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
        let {coupenId} = req.params
        
        let deleteCoupen = await Coupen.deleteOne({_id:coupenId})
        res.json({deleteCoupen:true})


    } catch (error) {
        console.log("error rendering deleteCoupen  :", error)
    }
}



module.exports = {

    getCoupen,
    addCoupen,
    accessCoupen,
    deleteCoupen
}