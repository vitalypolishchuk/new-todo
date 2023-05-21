import "./CloseButton.scss";

const sizes: { [key: string]: { height: string; width: string } } = {
  sm: {
    height: "2px",
    width: "17px",
  },
  md: {
    height: "2px",
    width: "25px",
  },
  lg: {
    height: "2px",
    width: "40px",
  },
};

const CloseButton = ({ size }: { size: string }) => {
  console.log(size);
  return <span className="close-button" style={sizes[size]}></span>;
};

export default CloseButton;
