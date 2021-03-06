import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../pages/login/login';
import {Storage} from '@ionic/storage';
import { NavController, NavParams, AlertController} from 'ionic-angular';

import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string){
    this.name = name;
    this.email = email;
  }
}


@Injectable()
export class Auth {
  currentUser: User;
  local: any;
  public mainUrl: string = "http://metabolicapp.azurewebsites.net/patient/";

  constructor(private http: Http, private alertCtrl: AlertController) {
    this.local = new Storage(['localstorage']);
  }

  public login(credentials){

    // let link = 'http://13.81.70.148:8000/patient/login/';
    // let values = JSON.stringify({username: credentials.username,
    //                               password: credentials.password});

    
    if(credentials.username === null || credentials.password === null){
      return Observable.throw("Please insert email and password.")
    }else{
      //return this.http.post

      return Observable.create(observer => {
        let access = (credentials.password === "pass", credentials.email ="email")
        this.currentUser = new User('Kiran/Yihang', 'Admin@gmail.com')
        observer.next(access);
        observer.complete();
      })
    }
  }

  public register(credentials){
    if (credentials.email === null || credentials.password === null || credentials.fname === null ||
        credentials.lname === null || credentials.DateOfBirth === null || credentials.NHS === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      })
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public dateChange(date){
    let day = date.slice(8, 10);
    let month = date.slice(5, 7);
    let year = date.slice(0, 4);

    let monthStr;

    switch(month){
      case "01":
        monthStr = "January";
        break;
      case "02":
        monthStr = "February";
        break;
      case "03":
        monthStr = "March";
        break;
      case "04":
        monthStr = "April";
        break;
      case "05":
        monthStr = "May";
        break;
      case "06":
        monthStr = "June";
        break;
      case "07":
        monthStr = "July";
        break;
      case "08":
        monthStr = "August";
        break;
      case "09":
        monthStr = "September";
        break;
      case "10":
        monthStr = "October";
        break;
      case "11":
        monthStr = "November";
        break;
      case "12":
        monthStr = "December";
        break;
    }

    return String(monthStr + " " + day + " " + year);
  }

  public logout(){
    return Observable.create(observer => {

      let link = this.mainUrl +  'logout/';

      this.http.get(link).map(res => res.json()).subscribe(
        (data) => {

            if(data.success == true){

              this.local.clear();

              this.currentUser = null;
              observer.next(true);
              observer.complete();

            }else{
              let alert = this.alertCtrl.create({
                title: 'Failed',
                subTitle: "Logout Failed",
                buttons: ['OK']
              });
              alert.present(prompt);
            }
        },
        err => {
            let alert = this.alertCtrl.create({
                title: 'Failed',
                subTitle: err,
                buttons: ['OK']
              });
              alert.present(prompt);
        })
    })
  }

}
