import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { idToken } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { catchError, Observable, ObservableInput, tap, throwError } from 'rxjs';
export interface Tareas{
  id:string;
  titulo: string,
  completado: boolean
}

export type CrearTareas = Omit<Tareas, 'id'>;

const path = 'tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
private _firestore = inject(Firestore);

private _coleccion = collection(this._firestore, path)

cargando = signal<boolean>(true)
conseguirTarea = toSignal((collectionData(this._coleccion, {idField: 'id'}) as Observable<Tareas[]>).pipe(
  tap(() =>{
    this.cargando.set(false)
  }),
  catchError((error) => {
    this.cargando.set(false);
    return throwError(() => error)
  })
)
, {initialValue: []})

crear(tarea: CrearTareas){
    return addDoc(this._coleccion, tarea)
  }
}
