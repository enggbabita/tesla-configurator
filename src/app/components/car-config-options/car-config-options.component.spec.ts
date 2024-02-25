import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarConfigOptionsComponent } from './car-config-options.component';

describe('CarConfigOptionsComponent', () => {
  let component: CarConfigOptionsComponent;
  let fixture: ComponentFixture<CarConfigOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarConfigOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarConfigOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
