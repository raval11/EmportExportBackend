const InquaryModel = require("../model/InquaryModel");
const nodemailer = require("nodemailer");

const EmailSend = async (req, res) => {

    const ownerEmail = process.env.OWNER_EMAIL;
    const {name, email, phone, contry, question} = req.body;

    try{
      const NewInquary = new InquaryModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        contry: req.body.contry,
        question: req.body.question,
    });
    await NewInquary.save();
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: ownerEmail,
          pass: process.env.SECRATE_KEY_EMAIL
        }
      });

      const mailOptions = {
        from: email,
        to: ownerEmail,
        subject: `Inquary Purpose `,
        html: `
              <p>Name: ${name}</p>
              <p>Email: ${email}</p>
              <p>Country: ${contry}</p>
              <p>phone: ${phone}</p>
              <p>Inquiry: ${question}</p>
            `,
      };

    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json({ success: false, message: 'Failed to send email' });
            }else{
                return res.status(200).json({ success: true, message: 'Your Query Has Been Sent Successfully , Inquary Replay In Your Email' });
            }
          })

      }catch(error){
        return res.status(500).json({ success: false, message: error});
      }
};

const AddInquary = async (req, res) => {
    try {
        const AddInquary = new InquaryModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            contry: req.body.contry,
            question: req.body.question,
        });
        await AddInquary.save();
        res.status(200).send({
            success: true,
            message: "Your Query Has Been Sent Successfully , Inquary Replay In Your Email ",
        });
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
};

const ShowInquary = async (req, res) => {
    try {
        const data = await InquaryModel.find();
        res.status(200).send({success: true, data: data});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
};

const DeleteInquary = async(req,res)=>{
    try{
      const data = await InquaryModel.deleteOne({ _id: req.params.id })
      res.status(200).send({success: true, data: data});

    }catch(error){
      res.status(500).send({success: false, message: error.message});
    }
}


module.exports = {
    AddInquary,
    ShowInquary,
    EmailSend,
    DeleteInquary
};
