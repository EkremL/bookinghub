export function convertToSerializableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }
  return leanDocument;
}

//!Bu dosyanın amacı, client componenttten server komponente veya tam tersine propslarla veri gönderirken aldığımız "Only plain objects can be passed to Client Components from Server Components." hatasını çözmektir.Bu hata, Server Component'larından Client Component'larına veri aktarırken, toJSON gibi özel metodlara sahip nesnelerin gönderilmesinin engellendiğini söylüyor.toJSON metoduna sahip nesneler, genellikle MongoDB nesneleri gibi veri tabanı dökümanlarıdır ve bunlar özel nesnelerdir. Bunları direkt olarak istemci bileşenlerine (Client Component) geçirmeniz güvenli değildir. Bu hata mesajı, bu tür nesnelerin basit, düz verilere dönüştürülmesini (örneğin string) istiyor. Bunun için de convertToSerializableObject fonksiyonu kullanılabilir. Bu dönüşüm işlemi sonrasında, nesnenin artık sadece basit veri türlerinden (string, number, vb.) oluştuğu için, bu nesne Client Component'larına (istemci bileşenlerine) güvenle geçirilebilir.
