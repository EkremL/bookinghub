import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

// const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 2 } }) => { //!NEXT 14 DE DESTRUCTURE ILE, NEXT 15 DE İSE ALTTAKİ GİBİ AWAIT SEARCHPARAMS KULLANIYORUZ!

const PropertiesPage = async ({ searchParams }) => {
  await connectDB();

  const params = await searchParams;

  let page = parseInt(params?.page ?? "1", 9);
  let pageSize = 9;
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties fount!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
