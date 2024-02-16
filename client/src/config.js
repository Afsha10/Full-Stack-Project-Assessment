export const baseUrl = (() => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://video-storage.onrender.com";
    case "aws":
      return "http://ec2-18-201-166-46.eu-west-1.compute.amazonaws.com:5000";
    default:
      return "http://localhost:5000";
  }
})();
