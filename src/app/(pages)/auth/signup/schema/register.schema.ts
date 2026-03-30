

import * as zod from "zod"


export const registerSchema = zod.object({
  name: zod
    .string()
    .nonempty("this field is required")
    .min(2, "min 2 char")
    .max(10, "max 10 chars"),

  email: zod.string().nonempty("this field is required").email("invalid email"),

  password: zod
    .string()
    .nonempty("this field is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      `Has minimum 8 characters in length. Adjust it by modifying {8,}
        At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
        At least one lowercase English letter. You can remove this condition by removing (?=.*?[a-z])
        At least one digit. You can remove this condition by removing (?=.*?[0-9])
        At least one special character, You can remove this condition by removing (?=.*?[#?!@$%^&*-])`
    ),

  rePassword: zod.string().nonempty("this field is required"),

  phone: zod
    .string()
    .nonempty("this field is required")
    .regex(/^01[0125]\d{8}$/, "invalid phone number"),
})
.refine((data) => data.password === data.rePassword, {
  error: "repassword and password doesn't match",
  path: ["rePassword"],
});



export type RegisterSchemaDataType = zod.infer<typeof registerSchema>