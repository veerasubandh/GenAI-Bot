const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateStatementPDF = async (statement, user) => {
  const fileName = `statement-${user.customerId}-${statement.month}-${statement.year}.pdf`;
  const filePath = path.join(__dirname, `../../temp/${fileName}`);

  // Ensure /temp exists
  if (!fs.existsSync(path.join(__dirname, "../../temp"))) {
    fs.mkdirSync(path.join(__dirname, "../../temp"));
  }

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      doc.fontSize(22).text("Credit Card Statement", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`Name: ${user.fullName}`);
      doc.text(`Customer ID: ${user.customerId}`);
      doc.text(`Email: ${user.email}`);
      doc.moveDown();

      doc.text(`Statement Period: ${statement.month}/${statement.year}`);
      doc.text(`Total Due: ₹${statement.totalDue}`);
      doc.text(`Minimum Due: ₹${statement.minimumDue}`);
      doc.text(`Due Date: ${new Date(statement.dueDate).toDateString()}`);
      doc.moveDown();

      doc.text("Thank you for using our card. Pay on time to avoid penalties!", {
        align: "center",
        lineGap: 10
      });

      doc.end();

      stream.on("finish", () => resolve({ fileName, filePath }));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateStatementPDF };