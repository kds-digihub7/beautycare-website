// pages/api/upload.js
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formidable = (await import("formidable")).default;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable parse error:", err);
        return res.status(500).json({ error: "File parsing failed" });
      }

      try {
        let uploadedUrls = [];

        const fileArray = Array.isArray(files.file) ? files.file : [files.file];

        for (const f of fileArray) {
          const result = await cloudinary.v2.uploader.upload(f.filepath, {
            resource_type: "auto",
            folder: "ko-beauty",
          });
          uploadedUrls.push(result.secure_url);
        }

        return res.status(200).json({ urls: uploadedUrls });
      } catch (uploadError) {
        console.error("Upload error:", uploadError);
        return res.status(500).json({ error: "Upload failed", details: uploadError.message });
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
