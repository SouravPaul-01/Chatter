import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <motion.div
      initial={{ opacity: 0, x: sameSender ? "100%" : "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: sameSender ? "100%" : "-100%" }}
      transition={{ duration: 0.2 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        width: "fit-content",
        maxWidth: "50%",
        wordBreak: "break-all",
        marginBottom: "0.5rem",
        marginTop: "0.5rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!sameSender && (
        <Typography variant="caption" color={lightBlue}>
          {sender?.name}
        </Typography>
      )}
      <Typography variant="body1">{content}</Typography>
      {/* Attachments */}
      {attachments?.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "black" }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}
      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
