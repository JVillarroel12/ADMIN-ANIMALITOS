import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.scss'],
})
export class ViewUsuariosComponent implements OnInit {
  formUsuario: FormGroup;
  mostrarComisionDistribuidor = false;
  search: '';
  usuarios: any;
  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public http: HttpClient,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getUsuarios();
    this.formUsuario = this.formBuilder.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      cedula: ['', Validators.required],
      clave: ['', Validators.required],
      selectRol: ['', Validators.required],
      comision:[0],
      pcje_d_ventas:[false],
      descripcion: ['',],
      telefono: ['', Validators.required]
    })
  }

  async getUsuarios(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();
    this.http.get(this.apiService.usuarios).subscribe(res=>{
      console.log("RES =>", res);
      this.usuarios = res;
      this.usuarios.forEach(element => {
        element.userAux = element['user'].user
         if(element.user.rol == 0){
          element.rolAux = 'BANQUERO';
         }else{
          element.rolAux = 'DISTRIBUIDOR';
         } 
      });
      loading.dismiss();
    },(error)=>{
      console.log("EEOR =>", error.error);
      loading.dismiss();
      
    })
  }

  seleccionarRol(_event){
    console.log("ELIGIENDO =>", _event.detail.value);
    if(_event.detail.value == '1'){
      this.mostrarComisionDistribuidor = true;
    }else{
      this.mostrarComisionDistribuidor = false;
    }
  }
  async crearUsuario(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();
    let form = this.formUsuario.value;

    if(form.selectRol == '0'){
      form.comision = 0;
    }
    let usuario = {
      nombre: form.nombre,
      usuario: form.usuario,
      ci: form.cedula,
      password: form.clave,
      rol: Number(form.selectRol),
      pcje_distrbuidor: form.comision,
      pcje_d_ventas: form.pcje_d_ventas,
      descripcion: form.descripcion,
      telefono: form.telefono
    }

    console.log("DATA CREAR USUARIO =>", usuario);
   
    this.http.post(this.apiService.usuarios, usuario).subscribe(res=>{
      console.log("RES =>", res);
      this.apiService.toast("Usuario creado con exito", "success");
      this.formUsuario.reset();
      this.getUsuarios();
      loading.dismiss();
    },(error)=>{
      console.log("ERROR =>", error.error);
      this.apiService.toast(error.error.msg, "danger");
      loading.dismiss();

    })
    
  }
}
