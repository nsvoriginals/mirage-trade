import prisma from '../config/prisma.config'


export async function login(email:string,password:string){
         const user = await prisma.user.findUnique({
            where:{
                email,
                password
            }
         })
         if(!user) throw new Error("User Not found");

         return {message:"Login Successful",user}
}



export async function register(email:string,username:string,password:string){
         const user = await prisma.user.findUnique({
            where:{
                email,
                password
            }
         })
         if(user) throw new Error("User Already found found");
         const newUser =await prisma.user.create({
            data:{
                email,
                username,
                password
            }
         })
         return {message:"Registration Successful",newUser}
}


export async function me(email:string){
         const user = await prisma.user.findUnique({
            where:{
                email,
                
            }
         })
         if(!user) throw new Error("User Not found ");
         
         return {message:"Fetch Successful",user}
}