import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //BORRAR => dev/truncate/estaciones
  IP = 'http://3.88.193.1/';
  IP2 = 'http://3.88.193.1/api/';
  baseUrlImg = 'http://ec2-3-88-193-1.compute-1.amazonaws.com/';
  login = this.IP + 'auth/login';  // ! HACER LOGIN
  getTaquillas = this.IP2 + 'estaciones'; // ! OBTENER TAQUILLAS
  getLoteria = this.IP2 + 'loterias';  // ! OBTENER LOTERIAS
  usuarios = this.IP2 + 'admins';  // ! CREAR USUARIOS
  getLoteriasByTaquilla = this.IP2 + 'loterias-estaciones/estacion/'



  // ! OBSERVABLE PARA EL USER
  private user = new BehaviorSubject<{}>({});
  $getUser = this.user.asObservable();
  sendUser(user:any){
    this.user.next(user);
  }
  constructor(
    public toastController: ToastController
  ) { }


  async toast(msg, status) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      color: status,
      duration: 2000,
      cssClass: 'toastCss',
    });
    toast.present();
  }
}
