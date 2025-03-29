import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearTareas, TareasService } from '../../data-access/tareas.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tareas-form.component.html',
  styleUrl: './tareas-form.component.css'
})
export default class TareasFormComponent {
  private _formbuilder = inject(FormBuilder);
  private _tareasservice = inject(TareasService);
  private _router = inject(Router);

  cargando = signal(false);

    formulario = this._formbuilder.group({
    Titulo: this._formbuilder.control('', Validators.required),
    Completado: this._formbuilder.control(false, Validators.required)
  })
  async submit(){
    if(this.formulario.invalid) return

    try {
      this.cargando.set(true);
      const{Titulo, Completado} = this.formulario.value;
      const tarea: CrearTareas = {
        titulo: Titulo || '',
        completado: !!  Completado
      };
      await this._tareasservice.crear(tarea)

      toast.success('Tarea creada correctamente.')      
      this._router.navigateByUrl('/tareas')
    } catch (error) {
      toast.success('Ha ocurrido un problema.')
    }
    finally{
      this.cargando.set(false);
    }
    console.log(this.formulario.value)
  }
}
