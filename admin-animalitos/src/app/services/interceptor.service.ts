import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    public router: Router,
    public apiService: ApiService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>{
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh");

    console.log("PASANDO POR EL INTERCEPTOR");
    if(!token){
      return next.handle(req);
    }

    const headers = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
      
    });

    return next.handle(headers);
  }
}
