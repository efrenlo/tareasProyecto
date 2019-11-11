import { Injectable } from '@angular/core';

//importar librerias
import {AngularFirestore} from "@angular/fire/firestore"
import {Tarea} from "../models/tarea"//cuandi guardemos cosas
import {TareaConsul} from "../models/tarea"//cuandi guardemos cosas

@Injectable({
  providedIn: 'root'
})
export class TareservicesService {

  constructor(private firestore: AngularFirestore) { }
  createStudent(tarea: Tarea){
    return this.firestore.collection('tareas').add(tarea);
  }

  deleteTarea(id){
    this.firestore.doc('tareas/'+id).delete();
  }
  getTareas(){
    return this.firestore.collection('tareas').snapshotChanges();
  }

  updateStudent(tarea: Tarea, id: string){
    this.firestore.doc('tareas/'+id).update(tarea);
  }
}
