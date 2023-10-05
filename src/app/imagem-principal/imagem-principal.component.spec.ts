import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemPrincipalComponent } from './imagem-principal.component';

describe('ImagemPrincipalComponent', () => {
  let component: ImagemPrincipalComponent;
  let fixture: ComponentFixture<ImagemPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagemPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagemPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
