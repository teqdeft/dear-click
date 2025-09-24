const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Utility: Ensure folder exists
const ensureFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  return folderPath;
};

// FILE FILTERS
// Profile pics → only images
const profileFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only JPG or PNG"), false);
  }
};

// Posts → allow images + videos
const postFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "video/mp4",
    "video/mpeg",
    "video/quicktime", // mov
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, MP4, MPEG, MOV allowed"), false);
  }
};

// STORAGE CONFIGS
const createStorage = (folderName) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = ensureFolder(
        path.join(process.cwd(), "public", "assets", "images", folderName)
      );
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + "-" + file.originalname.replace(/\s+/g, "");
      // store relative path in req for DB
      req.filePath = `/assets/images/${folderName}/${uniqueName}`;
      cb(null, uniqueName);
    },
  });

//  MULTER INSTANCES
// Profile picture upload (only images, 5MB max)
const uploadProfilePic = multer({
  storage: createStorage("profilePicture"),
  fileFilter: profileFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Post media upload (images + videos, 20MB max)
const uploadPostMedia = multer({
  storage: createStorage("posts"),
  fileFilter: postFileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

// Story media upload (images + videos, 20MB max)
const uploadStoryMedia = multer({
  storage: createStorage("stories"), // folder
  fileFilter: postFileFilter, // same filter as posts (allow img + video)
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
});

module.exports = { uploadProfilePic, uploadPostMedia, uploadStoryMedia };
