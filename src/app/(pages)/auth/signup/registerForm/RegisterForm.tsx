
"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useForm } from 'react-hook-form'
import { registerSchema, RegisterSchemaDataType } from '../schema/register.schema'
import apiServices from '../../../../../../services/api'


// react-hook-form ==> collect data
// zod  ==> Validation
// UI   ==> UI

export default function RegisterForm() {


const {handleSubmit, control} = useForm<RegisterSchemaDataType>({
    resolver:zodResolver(registerSchema),
    defaultValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:""
    }
})


// register   ==> ref
//control     ==> state, value


// controller
function handleRegister (data: RegisterSchemaDataType)
{
    // calling api
    apiServices.signUp(data.name, data.email, data.password, data.rePassword, data.phone)

}

  return (
    <div>

    <Card className="w-full sm:max-w-md">
        <CardHeader>
            <CardTitle> Join us Now</CardTitle>
        </CardHeader>

        <CardContent>
                <form onSubmit={handleSubmit(handleRegister)}>

                    <FieldGroup>

                        {/* name */}
                        <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your Name "
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                        />


                        {/* email */}

                        <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter valid Email"
                                autoComplete="off"
                                type='email'
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                        />

                        {/* password */}
                        <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>
                            <Input
                                {...field}
                                id="password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter Strong Password"
                                autoComplete="off"
                                type='password'
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                        />
                    
                        {/* repassword */}
                        <Controller
                        name="rePassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="rePassword">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter password again"
                                autoComplete="off"
                                type='password'
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                        />


                        {/* Mobile Number */}
                        <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="phone">
                                Phone Number
                            </FieldLabel>
                            <Input
                                {...field}
                                id="phone"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter phone number"
                                autoComplete="off"
                                type='tel'
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                        />



                    </FieldGroup>
                </form>
        </CardContent>

        <CardFooter>
            <Field orientation="horizontal">
                <Button type="submit" form="submit">
                    Register
                </Button>
            </Field>
        </CardFooter>
    </Card>
    
    </div>
  )
}
