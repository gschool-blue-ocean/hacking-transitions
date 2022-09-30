/**********  API Utility Functions **********/
export const checkApiMethod = ({ method }, string) => method === string;
export const notFound404 = (res) =>
  res.status(404).setHeader("Content-type", "text/plain").send("404 Not Found");
/**********  END API Utility Functions **********/

/********** Update Base Url For API request **********/
export const server =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "deployed website url";
/********** END Update Base Url For API request **********/
