const VerificationRequest = require('../models/VerificationRequest');
const User = require('../models/User');

exports.createVerificationRequest = async (req, res) => {
  try {
    const request = await VerificationRequest.create(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVerificationRequests = async (req, res) => {
  try {
    const requests = await VerificationRequest.find().populate('tutor');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVerificationStatus = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const request = await VerificationRequest.findByIdAndUpdate(
      req.params.id,
      { status, adminComment },
      { new: true }
    );

    await User.findByIdAndUpdate(request.tutor, { verificationStatus: status, adminComment });

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
