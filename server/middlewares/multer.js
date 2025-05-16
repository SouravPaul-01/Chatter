import multer from "multer";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
  storage: multer.memoryStorage(),
});

const singleAvatar = multerUpload.single("avatar");

const attachmentsMulter = multerUpload.array("files", 5);

export { singleAvatar, attachmentsMulter };
