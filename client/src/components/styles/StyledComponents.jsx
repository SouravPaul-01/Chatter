import { Skeleton, keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { gray } from "../../constants/color";

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

<VisuallyHiddenInput />;

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 3rem;
  padding: 0 3rem;
  border-radius: 1.5rem;
  border: none;
  background-color: ${gray};
`;

export const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmad;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${gray};
  font-size: 1.1rem;
`;

export const CurveButton = styled("button")`
  border: none;
  outline: none;
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  background-color: #7a9bb8;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    background-color: #99b3d1;
  }
`;

const pulseAnimation = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${pulseAnimation} 1.4s ease-in-out infinite`,
  borderRadius: "50%",
  backgroundColor: "rgba(38, 148, 171, 0.7)",
  boxShadow: "none",
  backdropFilter: "none",
  margin: 0,
  padding: 0,
  minWidth: "unset",
  minHeight: "unset",
  "&:hover": {
    boxShadow: "none",
  },
}));
