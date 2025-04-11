import { FormGroup } from "@angular/forms";

<<<<<<< HEAD

export const seRequiere = (campo: 'email' | 'contrasenia' | 'confirmarContrasenia', form: any) => {
=======
export const seRequiere = (campo: 'email' | 'contrasenia' | 'confirmarcontrasenia', form: FormGroup) => {
>>>>>>> 5c7ba17cdefaba8b9b43a91b2a9d2fcda68ea2be
    const control = form.get(campo);

    return control && control.touched && control.hasError('required');
};

export const errorMail = (form: FormGroup) => {
    const control = form.get('email')
    return control && control.touched && control.hasError('email')
}