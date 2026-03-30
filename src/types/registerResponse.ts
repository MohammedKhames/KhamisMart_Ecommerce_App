

export type RegisterResponse ={
    message: "success" | "email already exists",
    user:{
        id: string;
        name: string;
        email: string;
        password: string;
        rePassword: string;
        phone: string;
        role: string;
    },
    token: string   
    
}