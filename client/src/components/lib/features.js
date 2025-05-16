import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtention = url.split(".").pop();
  if (
    fileExtention === "mp4" ||
    fileExtention === "webm" ||
    fileExtention === "ogg"
  ) {
    return "video";
  }
  if (fileExtention === "mp3" || fileExtention === "wav") {
    return "audio";
  }
  if (
    fileExtention === "png" ||
    fileExtention === "jpg" ||
    fileExtention === "jpeg" ||
    fileExtention === "gif"
  ) {
    return "image";
  }
  return "file";
};
const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

//? Added to get last 7 days data of chart for admin dashboard.
const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("ddd");
    last7Days.unshift(dayName);
  }
  return last7Days;
};

export { fileFormat, transformImage, getLast7Days };
