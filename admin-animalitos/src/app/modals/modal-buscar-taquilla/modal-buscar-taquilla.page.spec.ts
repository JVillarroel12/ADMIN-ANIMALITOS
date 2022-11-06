import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalBuscarTaquillaPage } from './modal-buscar-taquilla.page';

describe('ModalBuscarTaquillaPage', () => {
  let component: ModalBuscarTaquillaPage;
  let fixture: ComponentFixture<ModalBuscarTaquillaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBuscarTaquillaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBuscarTaquillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
