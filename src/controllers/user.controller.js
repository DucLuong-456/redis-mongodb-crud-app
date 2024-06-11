const User = require('../models/user.model');

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            return res.json(users)
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    createUser: async (req, res) => {
        const user = new User({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
        });
        try {
            await user.save();
            return res.json(user)

        } catch (err) {
            res.status(500).send(err);
        }
    },
    deleteUser: async(req, res)=>{
        const user = await User.findOne({_id: req.params.id})
        if(!user) return res.status(400).json({msg: "Không tìm thấy user!"});
        await User.findOneAndDelete({_id: req.params.id})
        return res.json(user)
    },
    updateUser: async(req, res)=>{
        const user = await User.findOne({_id: req.params.id})
        if(!user) return res.status(400).json({msg: "Không tìm thấy user!"});
        await User.findOneAndUpdate({_id: req.params.id},req.body)
        return res.json(user)
    }
    
}

module.exports = userController