import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalBuscarTaquillaPage } from 'src/app/modals/modal-buscar-taquilla/modal-buscar-taquilla.page';
import { LoginPage } from 'src/app/pages/login/login.page';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-sorteos',
  templateUrl: './view-sorteos.component.html',
  styleUrls: ['./view-sorteos.component.scss'],
})
export class ViewSorteosComponent implements OnInit {
  search = '';
  mostrarSorteos = false;
  taquilla:any;
  loterias:any;
  formAgregarLoterias:FormGroup;
  loteriasTaquillas: any;
  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    public http: HttpClient,
    public apiService: ApiService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formAgregarLoterias = this.formBuilder.group({
      checkLoteria: [false]
    });
    this.getLoterias();
  }
  async getLoterias(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();
    this.http.get(this.apiService.getLoteria).subscribe(res =>{
     console.log("LOTERIAS =>", res);
     this.loterias = res;
     this.loterias.forEach(element => {
        element.activarLoterias = false;
        element.minxanimals = 0;
        element.maxxanimals = 0;
     });
     loading.dismiss(); 
    },(error)=>{
      console.log("ERROR =>", error.error);
      this.apiService.toast("Ha ocurrido obteniendo las loterias", "danger");
      loading.dismiss();
    })
  }
  async modalBuscarTaquilla(){
    const modal = await this.modalController.create({
      component: ModalBuscarTaquillaPage,
      cssClass: 'modalBuscarTaquilla'
    })
    modal.present();

    const taquilla = await modal.onDidDismiss();

    if(taquilla['data'] != undefined){
      this.taquilla = taquilla['data'].taquilla;
      console.log("TAQUILLA SELECCIONADA =>", this.taquilla);
      this.getLoteriasByEstacion(this.taquilla['estacion_id'] )
      this.mostrarSorteos = true;
    }
  }
  async getLoteriasByEstacion(_taquillaIp){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();

    this.http.get(this.apiService.getLoteriasByTaquilla +_taquillaIp).subscribe(res=>{
      console.log("LOTERIA ASIGNADAS =>", res);
      this.loteriasTaquillas = res;
      this.loteriasTaquillas.forEach(element => {
         element.nameAux = element['loteria'].descripcion 
      });
      loading.dismiss();
    },(error) =>{
      loading.dismiss();
      this.apiService.toast("Ha ocurrido obteniendo las loterias de la estacion", "danger");
      console.log("ERROR =>", error.error);
      
    });
  }
  async activarLoterias(_event, _data){

    let checked = _event.detail.checked;
    _data.activarLoterias = checked;
  }
  async asignarLoterias(){
    let arrayAux = [];

    this.loterias.forEach(loteria => {
        if(loteria.activarLoterias == true ){

          const buscador = this.loteriasTaquillas.find((element)=>{
            return element.loteria_id == loteria.loteria_id; 
          });
          if(buscador == undefined){
            arrayAux.push(loteria);
          }
          else{
            this.apiService.toast("Una de las loterias seleccionadas ya esta asignada", "danger");
          }
        }
    });
    if(arrayAux.length != 0){
      const loading = await this.loadingController.create({
        message: 'Cargando...'
  
      })
      loading.present();
  
      console.log("ARRAY A ENVIAR =>", arrayAux);
      
      this.http.post(this.apiService.getLoteriasByTaquilla + this.taquilla['estacion_id'], arrayAux).subscribe(res=>{
        console.log("RES =>", res);
        this.getLoteriasByEstacion(this.taquilla['estacion_id']);
        loading.dismiss();
  
      },(error)=>{
        console.log("ERROR =>", error.error);
        loading.dismiss();
  
        this.apiService.toast("Ha ocurrido un error asignando las loterias", "danger");
      })
    }

  }
}
