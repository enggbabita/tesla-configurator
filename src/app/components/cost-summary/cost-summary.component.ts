import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarDetails } from '../../models/car-details.model';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cost-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-summary.component.html',
  styleUrl: './cost-summary.component.scss',
})
export class CostSummaryComponent implements OnInit, OnDestroy {
  carDetails!: CarDetails;
  readonly optionCost = 1000;
  totalCost: number = 0;
  imageUrl!: string;
  carSubscription!: Subscription;

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit(): void {
    this.carSubscription = this.carService.carDetails.subscribe((carDetails) => {
      this.carDetails = carDetails;

      if (carDetails.configOptions.config.id > -1) {
        this.imageUrl = carDetails.imageUrl;
        this.totalCost = this.calculateTotalCost();
      } else {
        this.router.navigate(['/step1']);
      }
    });
  }

  calculateTotalCost() {
    const carModelPrice = this.carDetails.configOptions.config.price;
    const colorPrice = this.carDetails.color.price;
    const towHitchPrice = this.carDetails.configOptions.towHitch ? this.optionCost : 0;
    const yokePrice = this.carDetails.configOptions.yoke ? this.optionCost : 0;

    return carModelPrice + colorPrice + towHitchPrice + yokePrice;
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }
}
