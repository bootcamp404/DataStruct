import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable, ObservableInput } from 'rxjs';
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

conseguirTareas = toSignal(collectionData(this._coleccion) as Observable<Tareas[]>)
crear(tarea: CrearTareas){
    return addDoc(this._coleccion, tarea)
  }
}
