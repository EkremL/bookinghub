"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required!");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;
  if (isBookmarked) {
    //!IF already bookmarked, remove it
    user.bookmarks.pull(propertyId);
    message = "Property removed from bookmarks!";
    isBookmarked = false;
  } else {
    //!if not bookmarked, add it
    user.bookmarks.push(propertyId);
    message = "Property successfully bookmarked!";
    isBookmarked = true;
  }
  // console.log(message);

  await user.save();
  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
}

export default bookmarkProperty;
