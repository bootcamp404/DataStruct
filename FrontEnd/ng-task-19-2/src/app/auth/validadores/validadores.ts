import { FormGroup } from "@angular/forms";


export const seRequiere = (campo: 'email' | 'contrasenya' | 'confirmarContrasenya', form: any) => {
    const control = form.get(campo);

    return control && control.touched && control.hasError('required');
};

export const errorMail = (form: FormGroup) => {
    const control = form.get('email')
    return control && control.touched && control.hasError('email')
}