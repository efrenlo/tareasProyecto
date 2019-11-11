import { Component, OnInit } from '@angular/core';
import { AuthservicesService} from '../services/authservices.service';
import { TareservicesService} from '../services/tareservices.service';
import { TareaConsul } from '../models/tarea';
import { User2 } from '../models/user';
import{  Router } from "@angular/router"
import {ToastController} from "@ionic/angular";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {
  public tarea: TareaConsul[];
  public user: User2[];

  constructor(private service: TareservicesService, private auth: AuthservicesService
    ,private router: Router, private toast: ToastController) {
    this.service.getTareas().subscribe(data => {
      this.tarea = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as TareaConsul;

      })
    });
    console.log(this.auth.uid );

    
  }

   //eliminar
   delete(id:string){
    this.service.deleteTarea(id);
    this.presentToast();
    this.router.navigate(['/tabs/tab1']);

  }
  //toast
  async presentToast(){
    const t = await this.toast.create({
      message: 'Tarea eliminada',
      duration: 3000
    });
    t.present();
  }

  update(tarea:TareaConsul, active:boolean){
    tarea.active = active;
    this.service.updateStudent(tarea, tarea.id);
  }
  




}
