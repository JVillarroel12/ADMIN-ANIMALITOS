import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-buscar-taquilla',
  templateUrl: './modal-buscar-taquilla.page.html',
  styleUrls: ['./modal-buscar-taquilla.page.scss'],
})
export class ModalBuscarTaquillaPage implements OnInit {
  search = '';
  taquillas: any;
  constructor(
    public http: HttpClient,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.getTaquillas();
  }

  async getTaquillas(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();

    this.http.get(this.apiService.getTaquillas).subscribe(res=>{
      console.log("TAQUILLAS =>", res);
      this.taquillas = res;
      loading.dismiss();
    },(error)=>{
      console.log("ERROR =>", error.error);
      loading.dismiss();
    })
  }

  seleccionarTaquilla(_data){
    this.modalController.dismiss({
      taquilla: _data
    })
  }
  cerrarModal(){
    this.modalController.dismiss();
  }
}
