import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalBuscarTaquillaPage } from 'src/app/modals/modal-buscar-taquilla/modal-buscar-taquilla.page';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-topes',
  templateUrl: './view-topes.component.html',
  styleUrls: ['./view-topes.component.scss'],
})
export class ViewTopesComponent implements OnInit {
  mostrarInfo = false;
  taquilla: any;
  loteriasTaquillas: any;
  loteriasTaquillasAux: any;
  formTopes: FormGroup;
  constructor(
    public modalController: ModalController,
    public http: HttpClient,
    public apiService: ApiService,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formTopes = this.formBuilder.group({
      selectLoteria: ['', Validators.required],
      cantMin: [0, Validators.required],
      cantMax: [0, Validators.required]
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
      this.mostrarInfo = true;
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
      let arrayAux = [];
      this.loteriasTaquillas.forEach(element => {
         element.nameAux = element['loteria'].descripcion;
        arrayAux.push(element);

      });
      let loteriaTodas = {
        nameAux: 'TODAS',
        loteria_id: 'T'
      }
      arrayAux.push(loteriaTodas);
      this.loteriasTaquillasAux = arrayAux;

      loading.dismiss();
    },(error) =>{
      loading.dismiss();
      this.apiService.toast("Ha ocurrido obteniendo las loterias de la estacion", "danger");
      console.log("ERROR =>", error.error);
      
    });
  }

  async asignarTope(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();

    let arrayAux = [];
    let form = this.formTopes.value;

    if(form.selectLoteria == 'T'){
      this.loteriasTaquillas.forEach(element => {
        let tope = {
          loteria_id: element.loteria_id,
          minxanimals: form.cantMin,
          maxxanimals: form.cantMax
        }
        arrayAux.push(tope);
      });
    }else{
      let tope = {
        loteria_id: form.selectLoteria,
        minxanimals: form.cantMin,
        maxxanimals: form.cantMax
      }
      arrayAux.push(tope);
    }

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
