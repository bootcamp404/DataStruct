import { AfterViewInit, Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tareas, CrearTareas, TareasService } from '../../data-access/tareas.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  providers: [TareasService],
})
export default class TaskFormComponent implements AfterViewInit{
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TareasService);
  private _router = inject(Router);

  loading = signal(false);

  idTarea = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
  });
  ngAfterViewInit() {
    effect(()=> {
      console.log(this.idTarea());
    })
  }
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
      this.loading.set(true);
      const { title, completed } = this.form.value;
      const tarea: CrearTareas = {
        titulo: title || '',
        completado: !!completed,
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
      toast.success('Ocurrio un problema.');
    } finally {
      this.loading.set(false);
    }
  }

  async conseguirTarea(id: string) {
    const taskSnapshot = await this._taskService.conseguirTarea(id);

    if (!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue(task);
  }
}
