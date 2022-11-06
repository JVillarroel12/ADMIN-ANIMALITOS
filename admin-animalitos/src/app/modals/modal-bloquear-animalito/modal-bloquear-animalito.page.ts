import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-bloquear-animalito',
  templateUrl: './modal-bloquear-animalito.page.html',
  styleUrls: ['./modal-bloquear-animalito.page.scss'],
})
export class ModalBloquearAnimalitoPage implements OnInit {
  @Input('') sorteo;
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
    
  }
  cerrarModal(){
    this.modalController.dismiss();
  }
}
