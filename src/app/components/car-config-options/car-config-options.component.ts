import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import {
  CarModelConfigOption,
  ModelConfig,
} from '../../models/car-model-config-option.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarDetails } from '../../models/car-details.model';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-car-config-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-config-options.component.html',
  styleUrl: './car-config-options.component.scss',
})
export class CarConfigOptionsComponent implements OnInit, OnDestroy {
  configOptions: CarModelConfigOption = {
    configs: [],
    towHitch: false,
    yoke: false,
  };

  selectedConfig: ModelConfig = {
    id: -1,
    price: 0,
    speed: 0,
    range: 0,
    description: ''
  };
  carDetails!: CarDetails;
  imageUrl!: string;

  onDestroy$: Subject<void> = new Subject();

  constructor(private carService: CarService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.carService.carDetails
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((carDetails) => {
        this.carDetails = carDetails;

        if (this.carDetails?.code) {
          this.imageUrl = carDetails.imageUrl;

          this.getCarConfigOptions();
        } else {
          this.router.navigate(['/step1']);
        }
      });
  }

  getCarConfigOptions() {
    this.dataService.getCarConfig(this.carDetails.code)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((configOptions) => {
        this.configOptions = configOptions;

        if (this.carDetails.configOptions.config.id > -1) {
          this.retainSelection();
        }
      });
  }

  retainSelection() {
    this.selectedConfig = this.carDetails.configOptions.config;
    this.configOptions.towHitch = this.carDetails.configOptions.towHitch;
    this.configOptions.yoke = this.carDetails.configOptions.yoke;
  }

  updateTowHitch() {
    this.configOptions.towHitch = !this.configOptions.towHitch;
    this.carService.updateCarConfigOptions(
      this.selectedConfig,
      this.configOptions.towHitch,
      this.configOptions.yoke
    );
  }

  updateYoke() {
    this.configOptions.yoke = !this.configOptions.yoke;
    this.carService.updateCarConfigOptions(
      this.selectedConfig,
      this.configOptions.towHitch,
      this.configOptions.yoke
    );
  }

  onConfigChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const configId = parseInt(target.value);

    const filteredConfig = this.configOptions.configs.find((item) => {
      return item.id === configId;
    });
    if (filteredConfig) {
      this.selectedConfig = filteredConfig;
      this.carService.updateCarConfigOptions(
        this.selectedConfig,
        this.configOptions.towHitch,
        this.configOptions.yoke
      );
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
