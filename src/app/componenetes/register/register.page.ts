import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthservicesService} from '../../services/authservices.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public email: string;
  public password: string;
  public name: string;

  constructor(private auth: AuthservicesService, private router: Router) { }


  ngOnInit() {
  }

  OnSubmitRegister(){
    this.auth.register(this.email, this.password, this.name).then(auth=>{
      this.router.navigate(['/login']);
      console.log(auth)
    }).catch(err=> console.log(err))

  }

}
