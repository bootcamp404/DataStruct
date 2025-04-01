import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { idToken } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, query, where, getDoc } from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthStateService } from '../../compartido/data-access/auth-state.service';
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
private _authState = inject(AuthStateService);
private _coleccion = collection(this._firestore, path);
private _query = query(
  this._coleccion,
  where('userId', '==', this._authState.usuarioActual?.uid)
);

cargando = signal<boolean>(true)

conseguirTareas = toSignal((collectionData(this._query, {idField: 'id'}) as Observable<Tareas[]>).pipe(
  tap(() =>{
    this.cargando.set(false)
  }),
  catchError((error) => {
    this.cargando.set(false);
    return throwError(() => error)
  })
)
, {initialValue: []})

constructor(){
  this._authState.usuarioActual
}
conseguirTarea(id: string) {
  const docRef = doc(this._coleccion, id);
  return getDoc(docRef);
}
crear(tarea: CrearTareas){
    return addDoc(this._coleccion, {
      ...tarea,
      idUsuario: this._authState.usuarioActual?.uid
    })
  }
actualizar(tarea: CrearTareas, id:string) {
    const docRef = doc(this._coleccion, id);
      return updateDoc(docRef, {
        ...tarea,
        userId: this._authState.usuarioActual?.uid,
      });
    }
}
