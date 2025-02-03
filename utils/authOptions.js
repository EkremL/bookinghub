import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful sign in
    async signIn({ profile }) {
      //1. Connect to the database
      try {
        await connectDB();

        // Kullanıcı email ile kontrol edilir
        let user = await User.findOne({ email: profile.email });

        if (!user) {
          // Kullanıcı adını ayarla (Eğer 20 karakterden uzunsa kes)
          let username =
            profile.name.length > 20 ? profile.name.slice(0, 20) : profile.name;

          // Kullanıcı adı veritabanında varsa farklı bir username oluştur
          let existingUser = await User.findOne({ username });
          while (existingUser) {
            username = `${profile.name.slice(0, 15)}_${Math.floor(
              Math.random() * 1000
            )}`;
            existingUser = await User.findOne({ username });
          }

          // Yeni kullanıcı oluştur
          user = await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return `/api/auth/error?error=${encodeURIComponent(error.message)}`;
      }
    },
    //!Session Callback function that modifies the session object
    async session({ session }) {
      //1. Get the user from the database
      const user = await User.findOne({ email: session.user.email });
      //2. Assign user id from the session
      session.user.id = user._id.toString();
      //3. Return the session object
      return session;
    },
  },
};
