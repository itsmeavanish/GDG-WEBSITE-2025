const Certificate = require("../models/CertificateSchema.js");

const getCertificateBySerial = async (req, res) => {
  try {
    const { serial } = req.params;
    console.log(serial);
    
    const cert = await Certificate.findOne({ serialNumber: serial });

    if (!cert || !cert.verified) {
      return res.status(404).json({ message: "Certificate not found or not verified." });
    }

    return res.status(200).json({
      serialNumber: cert.serialNumber,
      name: cert.name,
      event: cert.event,
      certificateUrl: cert.certificateUrl,
      verified: cert.verified,
    });
  } catch (err) {
    console.error("Error fetching certificate:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getCertificateBySerial,
};
