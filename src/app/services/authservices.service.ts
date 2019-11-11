import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {promise} from 'protractor';
import {AngularFireAuth} from '@angular/fire/auth';

import {AngularFirestore} from '@angular/fire/firestore';
import { unescapeIdentifier } from '@angular/compiler';
import {User} from "../models/user"//cuandi guardemos cosas
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  public uid: string;

  constructor(private router: Router, private afAuth: AngularFireAuth, private db:AngularFirestore) { }

  

  async onLogin(user:User) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    } catch (error) {
      console.log('error en login', error);
    }
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/login'])
    })
  }

  loginGoogleUser(){
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    
  }

  register(email:string, password:string, name:string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res =>{
        //console.log(res.user.uid);
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          name: name,
          uid: uid
        })
        resolve(res)
      }).catch(err=>reject(err))
    })
   
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }

}
