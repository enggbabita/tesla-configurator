import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarColor, CarModel } from '../../models/car-models.model';
import { FormsModule } from '@angular/forms';
import { IMAGE_URL } from '../../utils/constants';
import { DataService } from '../../services/data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-car-model-color-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-model-color-config.component.html',
  styleUrl: './car-model-color-config.component.scss',
})
export class CarModelColorConfigComponent implements OnInit, OnDestroy {
  readonly CAR_IMAGE_URL = IMAGE_URL;
  carModels: Array<CarModel> = [];
  carColors: Array<CarColor> = [];
  selectedCarCode: string = 'default';
  selectedCarModel!: CarModel;
  selectedColorCode!: string;

  imageToShow!: string;
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private dataService: DataService,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCarModels();
  }

  getCarModels() {
    this.dataService.getModels()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((models) => {
        this.carModels = models;

        /* retain selection on backward/forward navigation */
        this.retainSelection();
      });
  }

  retainSelection() {
    this.carService.carDetails
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((carDetails) => {

        if (carDetails?.code && carDetails?.color?.code) {
          this.selectedCarCode = carDetails.code;

          const carModel = this.findCarModel(this.carModels, this.selectedCarCode );

          if (carModel) {
            this.selectedCarModel = carModel;
            this.carColors = carModel.colors;
          }
          this.selectedColorCode = carDetails.color.code;

          /* load car image */
          this.loadImageByURL();
        }
      });
  }

  loadImageByURL() {
    this.imageToShow = this.CAR_IMAGE_URL + `${this.selectedCarCode}/${this.selectedColorCode}.jpg`;
  }

  onCarModelChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const selectedCarCode = target.value;

    const carModel = this.findCarModel(this.carModels, selectedCarCode );

    if (carModel) {
      this.selectedCarModel = carModel;
      this.carColors = carModel.colors;
      this.selectedCarCode = carModel.code;
      this.selectedColorCode = carModel.colors[0].code;

      /* update subject */
      this.carService.updateCarModel(
        carModel.code,
        carModel.description,
        carModel.colors[0]
      );
    }

    /* load car image */
    this.loadImageByURL();
  }

  onCarColorChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const selectedCarColorCode = target.value;

    const carColor = this.selectedCarModel?.colors.find((item) => {
      return item.code === selectedCarColorCode;
    });

    if (carColor) {
      this.selectedCarCode = carColor.code;
      this.carService.updateCarColor(carColor);
    }

    /* load car image */
    this.loadImageByURL();
  }

  findCarModel(carModels: CarModel[], carCode: string): CarModel | undefined  {
    return this.carModels.find((item) => {
      return item.code === this.selectedCarCode;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
