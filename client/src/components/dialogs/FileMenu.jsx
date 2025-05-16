import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  VideoFile as VideoFileIcon,
  UploadFile as UploadFileIcon,
  ColorLens as ColorLensIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorEl, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  const selectImage = () => imageRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  // const fileChangeHandler = async (e, key) => {
  //   const files = Array.from(e.target.files);

  //   if (files.length === 0) return;
  //   if (files.length > 10)
  //     return toast.error(`You can upload a maximum of 10 ${key} at a time.`);
  //   console.log(files);

  //   dispatch(setUploadingLoader(true));

  //   const toastId = toast.loading(`Uploading ${files.length} ${key}...`);
  //   closeFileMenu();
  //   try {
  //     //fetching here
  //     const myForm = new FormData();

  //     myForm.append("chatId", chatId);

  //     files.forEach((file) => myForm.append("files", file));

  //     const res = await sendAttachments(myForm);

  //     if (res.data)
  //       toast.success(`${key} uploaded successfully`, { id: toastId });
  //     else toast.error(`Failed to upload ${key}`, { id: toastId });
  //   } catch (error) {
  //     toast.error(error, { id: toastId });
  //     console.log(error);
  //   } finally {
  //     dispatch(setUploadingLoader(false));
  //   }
  // };

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);

    // Validate file sizes
    const maxSize = 5 * 1024 * 1024; // 5MB
    const invalidFiles = files.filter(file => file.size > maxSize);
    if (invalidFiles.length > 0) {
      return toast.error(`Some files exceed the 5MB size limit`);
    }

    dispatch(setUploadingLoader(true));
    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();

    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const response = await sendAttachments(myForm).unwrap();
      toast.success(`${key} sent successfully`, { id: toastId });
      console.log("Upload response:", response);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error?.data?.message || `Failed to send ${key}`, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={isFileMenu} onClose={closeFileMenu}>
      <div
        style={{
          width: "10rem",
        }}
      >
        {/* Image */}
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "1rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg, image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          {/* Audio */}
          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "1rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav, audio/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>
          {/* Video */}
          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "1rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/ogg, video/webm"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>
          {/* File */}
          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "1rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*/*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>

          {/* Canvas */}
          <MenuItem>
            <Tooltip title="Canvas">
              <ColorLensIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "1rem" }}>Canvas</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
