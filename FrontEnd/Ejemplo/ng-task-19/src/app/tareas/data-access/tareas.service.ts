import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
<<<<<<< HEAD
import { Observable } from 'rxjs';

=======
import { Observable, ObservableInput } from 'rxjs';
>>>>>>> 44ca24bb9d8f43383fc13995dbb15e664917b4a0
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
