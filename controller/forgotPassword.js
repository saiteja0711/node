const Sib = require('sib-api-v3-sdk');
const uuid= require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const forgotPasswordRequests = require('../models/forgotPasswordRequests');
require('dotenv').config();


exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(req.body)
        const user = await User.findOne({where :{email}})
        if(user)
        {
            const id = uuid.v4();
            let forgotpasswordrequests= await forgotPasswordRequests.create({
                id:id,
                isactive:true,
                userId: user.id
            })
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey =process.env.SENDINBLUE_API_KEY;
        

        const apiInstance = new Sib.TransactionalEmailsApi();

        const sender={
            email:'saitejaracharla17@gmail.com'
        }
        // Send transactional email
        await apiInstance.sendTransacEmail({
            sender ,
            to:[{email:email}],
            subject: "Reset your password",
            textContent: "Click here to reset your password",
            htmlContent: `<html>
            <h1>Click the link below to reset your Password</h1>
            <a href='http://3.107.41.242:3000/password/resetpassword/${id}'>Reset your Password</a>
            </html>`
        });
    }
    else{
        throw new Error('user doesnt exist');
    }

        // Send success response
        return res.status(200).json({ message: 'Link to reset password sent', success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to send reset password email', success: false });
    }
};

exports.resetpassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const forgotpasswordrequests = await forgotPasswordRequests.findOne({ where: { id } });

        if (forgotpasswordrequests && forgotpasswordrequests.isactive) {
            await forgotpasswordrequests.update({ isactive: false });

            // Send the password reset form to the user
            res.status(200).send(`
                <html>
                <body>
                <form id='form' action="http://3.107.41.242:3000/password/updatepassword/${id}" method="post">
                    <label for="newpassword">Enter New Password</label>
                    <input name="newpassword" type="password" required></input>
                    <button type="submit">Reset Password</button>
                </form>
                </body>
                </html>
            `);
        } else {
            res.status(404).send('Password reset request not found or already used.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
 exports.updatepassword = async(req , res , next) =>{
    try{
        const {newpassword} = req.body;
        console.log(req.body);
        const resetpasswordid = req.params.id;
        let forgotpasswordrequests = await forgotPasswordRequests.findOne({where:{id:resetpasswordid}});
        let user = await User.findOne({where:{id : forgotpasswordrequests.userId}});
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(newpassword,saltRounds);
        await user.update({password:hashedPassword});
        console.log("Succesfully updated")
        return res.status(201).json({ message: 'Successfully updated the new password', success: true });
    }
    catch (err){
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error', success: false });
    }
    }
 