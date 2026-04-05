

export type SignInResponse ={
    message: "success" | "Incorrect email or password",
    user:{
        _id: string,
        name: string,
        email: string,
        role: string
    },
    token: string
}