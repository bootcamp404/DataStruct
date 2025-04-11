import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tareas, CrearTareas, TareasService } from '../../data-access/tareas.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tareas-form.component.html',
  styleUrl: './tareas-form.component.scss',
  providers: [TareasService],
})
export default class TaskFormComponent{
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TareasService);
  private _router = inject(Router);

  cargando = signal(false);

  idTarea = input.required<string>();

  form = this._formBuilder.group({
    titulo: this._formBuilder.control('', Validators.required),
    completado: this._formBuilder.control(false, Validators.required),
  });

  constructor() {
    effect(() => {
      const id = this.idTarea();
      if (id) {
        this.conseguirTarea(id);
      }
    });
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      this.cargando.set(true);
      const { titulo, completado } = this.form.value;
      const tarea: CrearTareas = {
        titulo: titulo || '',
        completado: !!completado,
      };

      const id = this.idTarea();

      if (id) {
        await this._taskService.actualizar(tarea, id);
      } else {
        await this._taskService.crear(tarea);
      }

      toast.success(`Tarea ${id ? 'actualizada' : 'creada'}  correctamente.`);
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.success('Ocurrió un problema.');
    } finally {
      this.cargando.set(false);
    }
  }

  async conseguirTarea(id: string) {
    const taskSnapshot = await this._taskService.conseguirTarea(id);

    if(!taskSnapshot.exists()) return;

    const tarea = taskSnapshot.data() as Tareas;

    this.form.patchValue(tarea);
  }
}
