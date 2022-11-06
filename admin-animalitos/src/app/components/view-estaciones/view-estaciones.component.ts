import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-estaciones',
  templateUrl: './view-estaciones.component.html',
  styleUrls: ['./view-estaciones.component.scss'],
})
export class ViewEstacionesComponent implements OnInit {
  taquillas: any;
  search = '';
  formTaquilla: FormGroup;
  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getTaquillas();

    this.formTaquilla = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      usuario: ['', Validators.required],
      descripcion: ['', Validators.required],
      clave: ['', Validators.required],
      comision: ['', Validators.required],
      pcje_v_ventas:[true,],
      activo: [true,],
    })
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

  async crearTaquilla(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();
    let form = this.formTaquilla.value
    let data = {
      direccion: form.direccion,
      ci: form.cedula,
      nombre: form.nombre,
      telefono: form.telefono,
      usuario: form.usuario,
      password: form.clave,
      pcje_vendedor: form.comision,
      pcje_v_ventas: form.pcje_v_ventas,
      activo: form.activo,
      descripcion: form.descripcion,
      vencimiento:1667325352741
    }
    console.log("DATA A ENVIAR =>", data);
    
    this.http.post(this.apiService.getTaquillas, data).subscribe(res=>{
      console.log("RES =>", res);
      this.apiService.toast("Taquilla creada con exito", "success");
      this.formTaquilla.reset();
      this.getTaquillas();
      loading.dismiss();
    },(error)=>{
      console.log("ERROR =>", error.error);
      this.apiService.toast("Ha ocurrido un error creando la taquilla", "danger")
      loading.dismiss();
    })
  }



}
