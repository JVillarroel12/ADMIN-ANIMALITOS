import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ModalBloquearAnimalitoPage } from 'src/app/modals/modal-bloquear-animalito/modal-bloquear-animalito.page';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-bloquear-animalitos',
  templateUrl: './view-bloquear-animalitos.component.html',
  styleUrls: ['./view-bloquear-animalitos.component.scss'],
})
export class ViewBloquearAnimalitosComponent implements OnInit {
  searchEstacion = false;
  loterias: any;

  constructor(
    public apiService: ApiService,
    public http: HttpClient,
    public toastController: ToastController,
    public modalController: ModalController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }
  
  async getLoterias(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();
    this.http.get(this.apiService.getLoteria).subscribe(res =>{
     console.log("RES =>", res);
     this.loterias = res;
     this.loterias.forEach(element => {
        element.mostrarLoterias = false;
     });
     loading.dismiss(); 
    },(error)=>{
      console.log("ERROR =>", error.error);
      loading.dismiss();
    })
  }
  mostrarLoterias(_data){
    _data.mostrarLoterias = !_data.mostrarLoterias;   
  }
  contentBloqueo(_mode){
    if(_mode == 'Estacion'){
      this.searchEstacion = true;
    }else{
    this.getLoterias();

      this.searchEstacion = false;
    }
  }
  async modalBloquearAnimalitos(_animalitos,_sorteo){
    const modal = await this.modalController.create({
      component: ModalBloquearAnimalitoPage,
      cssClass: 'modalBloquearAnimalitos',
      componentProps: {
        sorteo: _sorteo,
        animalitos: _animalitos
      }
    });
    modal.present();
  }
}
