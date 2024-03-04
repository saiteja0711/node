const Sib = require('sib-api-v3-sdk');

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        //console.log(req.body)
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = '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'

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
            htmlContent: `<a href="www.google.com">search</a>`
        });

        // Send success response
        return res.status(200).json({ message: 'Link to reset password sent', success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to send reset password email', success: false });
    }
};
