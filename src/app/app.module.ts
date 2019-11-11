import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos de angular fire
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularFireModule} from "@angular/fire";

import { AngularFireDatabaseModule} from "@angular/fire/database";
//servicio para conectarme con la base de datos en tiempo real, inserciones y econsultas
import {AngularFirestore} from "@angular/fire/firestore";

//arvhivo de configuracion de firebase
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // enlazar firebase se dice que configuracion va a usar en laza la aplicacion con firebase
    AngularFireDatabaseModule,
    AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
