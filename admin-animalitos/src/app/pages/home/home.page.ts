import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewBloquearAnimalitosComponent } from 'src/app/components/view-bloquear-animalitos/view-bloquear-animalitos.component';
import { ViewEstacionesComponent } from 'src/app/components/view-estaciones/view-estaciones.component';
import { ViewSorteosComponent } from 'src/app/components/view-sorteos/view-sorteos.component';
import { ViewTopesComponent } from 'src/app/components/view-topes/view-topes.component';
import { ViewUsuariosComponent } from 'src/app/components/view-usuarios/view-usuarios.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  componentSelected;
  nombreUsuario: '';
  usuario: any;
  permisoUsuario = false;
  constructor(
    public http: HttpClient,
    public router: Router,
    public apiService: ApiService
  ) {}
  ngOnInit(){
    
  }
  ionViewWillEnter(){
    this.getUser();

  if(this.usuario.user_id != undefined){
      this.nombreUsuario = this.usuario['admin'].nombre;
      this.apiService.toast("Bienvenido " + this.nombreUsuario, "success");
      if(this.usuario['rol'] == 0){
        this.permisoUsuario = true;
      }
    
  }else{
    this.router.navigate(['/login']);
  }
  }
  getUser(){
    this.apiService.$getUser.subscribe(res=>{
      this.usuario = res;
    });

  }
  assignComponent(_component?) {
    console.log("holaaaa");
    
    switch (_component) {
      case 'viewEstaciones':
        this.componentSelected = ViewEstacionesComponent;
      break;
      case 'viewSorteos':
        this.componentSelected = ViewSorteosComponent;
      break;
      case 'viewBloquearAnimalitos':
        this.componentSelected = ViewBloquearAnimalitosComponent;
      break;
      case 'viewUsuarios':
        this.componentSelected = ViewUsuariosComponent;
      break;
      case 'viewUsuarios':
        this.componentSelected = ViewUsuariosComponent;
      break;
      case 'viewTopes':
        this.componentSelected = ViewTopesComponent;
      break;
    }
  }
  logout(){
    this.router.navigate(['/login'])
  }
}
