import yup from 'yup';

const userSchema = yup.object({
    name: yup.string().required("El nombre es requerido"),
    email: yup.string().required("El email es requerido").email("El email no es válido"),
    password: yup.string().required("La contraseña es requerida")
}).noUnknown()

const loginSchema = yup.object({
    email: yup.string().required("El email es requerido").email("El email no es válido"),
    password: yup.string().required("La contraseña es requerida")
})


export {
    userSchema,
    loginSchema
}