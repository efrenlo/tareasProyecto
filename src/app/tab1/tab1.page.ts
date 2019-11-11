import { Component } from '@angular/core';
import { TareservicesService} from '../services/tareservices.service';
import { AuthservicesService} from '../services/authservices.service';
import { Tarea, TareaConsul } from '../models/tarea';
import {AngularFireAuth} from '@angular/fire/auth';

import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import {Router} from '@angular/router';
//importar librerias




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public myForm: FormGroup;
  public tarea: Tarea;
  public Tarea2: TareaConsul[];
  constructor(private service: TareservicesService,  private fb: FormBuilder, private auth: AuthservicesService,
    private router: Router, private afAuth: AngularFireAuth) {

    this.service.getTareas().subscribe(data => {
      this.Tarea2 = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as TareaConsul;

      })
    });
  }

    ngOnInit() {
      this.myForm = this.fb.group({
        titulo:["", Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(150)])],
        descripcion:["", Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(150)])],
        active:[false],
        uid: [""]
      });
    }

    onLogout(){
      console.log('Logout');
      this.afAuth.auth.signOut();
      this.router.navigateByUrl('/login')
    }

    create(){
      this.tarea={
        titulo: this.myForm.controls.titulo.value,
        descripcion: this.myForm.controls.descripcion.value,
        active: false,
        uid: this.auth.uid
  
  
      }
      this.service.createStudent(this.tarea)
    }
    
    //console.log(this.service.uid);
  

  

  
  

}
