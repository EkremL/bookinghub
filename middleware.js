//!for protect route
export { default } from "next-auth/middleware";

export const config = {
  //!korumak istediğimiz routeler
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
