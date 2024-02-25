import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CarService } from './services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JsonPipe, RouterOutlet, RouterModule],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular';
  currentStep = 1;
  allowStep2: boolean = false;
  allowStep3: boolean = false;
  carSubscription!: Subscription;

  constructor(private router: Router, private carService: CarService) {

  }

  ngOnInit(): void {
    this.carSubscription = this.carService.carDetails.subscribe((carDetails) => {
      if (carDetails?.code && carDetails?.color?.code) {
        this.allowStep2 = true;

        if(carDetails.configOptions.config.id > -1){
          this.allowStep3 = true;
        }else{
          this.allowStep3 = false;
        }
      }else{
        this.allowStep2 = false;
      }

    });
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }
}
