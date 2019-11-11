import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../../models/user';
import { AuthservicesService} from '../../services/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  user: User = new User();

  
  public email: string;
  public password: string;
  constructor(private auth: AuthservicesService, private router: Router) { }

  ngOnInit() {
  }

  async onLogin() {
    const user = await this.auth.onLogin(this.user);
    if (user) {
      console.log('successfully logged user');
      this.auth.uid = user.user.uid;
      console.log(user.user.uid);
      this.router.navigateByUrl('/tabs/tab1');
    } 
      
    }

    onLoginGoogle(): void {

      this.auth.loginGoogleUser()
        .then((res) => {
          this.auth.uid = res.user.uid;
          this.onLoginRedirect();
        }).catch(err => console.log('err', err.message));
  
  
    }

    onLoginRedirect(): void {
      this.router.navigate(['/tabs/tab1']);
    }
    

  }

 

  


