import React from "react";
import { Helmet } from "react-helmet-async";
const Title = ({
  title = "Chatter",
  description = "Canvas integrated chat application",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
