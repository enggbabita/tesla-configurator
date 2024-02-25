import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelColorConfigComponent } from './car-model-color-config.component';

describe('CarModelColorConfigComponent', () => {
  let component: CarModelColorConfigComponent;
  let fixture: ComponentFixture<CarModelColorConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModelColorConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarModelColorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
