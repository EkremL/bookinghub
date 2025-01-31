"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required!");
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found!");
  }
  //verify ownership of the property
  if (property.owner.toString() !== userId) {
    throw new Error("You are not authorized to delete this property!");
  }

  //!delete from cloudinary
  //!Extract public ID from image URLs (in cloudinary url)
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  //!Delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      //!"bookinghub" cloudinarydaki folder name
      await cloudinary.uploader.destroy("bookinghub/" + publicId);
    }
  }

  //!delete from db
  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
