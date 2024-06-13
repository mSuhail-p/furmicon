
const Wallet = require('../model/walletModel')




const getWallet = async (req, res) => {
    try {
        const {user_id} = req.session
        const userWallet  = await Wallet.findOne({userId:user_id})
        res.render('user/wallet',{userWallet})


    } catch (error) {
        console.log('error rendering getWallet:', error)
    }
}










module.exports = {
    getWallet
}