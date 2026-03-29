import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import apiServices from "../../../../../services/api"


const handler = NextAuth({

  providers: [
  CredentialsProvider({
    
   
    name: 'credentials',

    
    credentials: {
      email: { label: "Email", type: "email", placeholder: "mail@example.com" },
      password: { label: "Password", type: "password" , }
    },




    async authorize(credentials) {
      

        const response = await apiServices.signIn(credentials?.email ?? "",credentials?.password ?? "")

         if(response.message == "success"){
            const user = {
                id:response.user.email ,
                name:response.user.name ,
                email:response.user.email ,
                role:response.user.role ,
                token:response.token ,
            }
            return user;

        }else{
             return null
            }
     
    }
  })
],
pages:{
    signIn:"/auth/signin"
},

callbacks:{
  

    async session({session,token}){
        if(token && session.user){
            session.user.role = token.role as string;
            session.user.token = token.token as string;
        }
        return session;
    } ,
    
      async jwt({token,user}){
        if(user){
            token.token = user.token;
            token.role = user.role;
        }
        return token;
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }