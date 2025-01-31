"use server";
//server actions larda use server kullanıyoruz
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";
async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  //access all values from amenities and images
  const amenities = formData.getAll("amenities"); //buradaki stringler, formdaki name propertysine karşılık gelmektedir
  const images = formData.getAll("images").filter((image) => image.name !== "");
  // .map((image) => image.name); //before cloudinary

  const propertyData = {
    owner: userId, //get current user from session
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    // images, before cloudinary
    rates: {
      daily: formData.get("rates.daily"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  // console.log(propertyData);
  //!cloudinary
  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert the image data to base64
    const imageBase64 = imageData.toString("base64");

    // Make request to upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "bookinghub",
      }
    );

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  //! save to database
  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout"); //önbelleği temizler ve sayfayı günceller. "layout" parametresi, ilgili layout seviyesinde revalidate işlemini uygulamak için kullanılır.
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
