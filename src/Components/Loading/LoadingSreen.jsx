// LoadingScreen.js
import { OrbitProgress } from "react-loading-indicators";

const LoadingScreen = () => {
  return (
    <div style={styles.overlay}>
      <OrbitProgress color="#ffffff" size="medium" text="" textColor="" />
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensure the loading indicator is on top of other content
  },
};

export default LoadingScreen;
