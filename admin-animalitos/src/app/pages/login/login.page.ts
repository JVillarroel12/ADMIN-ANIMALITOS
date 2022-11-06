import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController,
    public http: HttpClient,
    public toastController: ToastController,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  pressonLogin(_event){
    if(_event == 13){
      this.onLogin();
    }
  }
  async onLogin(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();
    let login = {
      user: this.formLogin.value.user,
      id: "1",
      password: this.formLogin.value.password,
      tipo: 1
    }
    
    this.http.post(this.apiService.login, login).subscribe(res=>{
      console.log("RES LOGIN =>", res);
      this.apiService.sendUser(res);
      localStorage.setItem("token", res['token']);
      this.router.navigate(['/home']);

      loading.dismiss();
    },(error)=>{
      console.log("error =>", error.error);
      this.apiService.toast(error.error.msg,"danger")
      loading.dismiss();
    })
  }


}
