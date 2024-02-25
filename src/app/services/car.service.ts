import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarColor } from '../models/car-models.model';
import {
  ModelConfig,
} from '../models/car-model-config-option.model';
import { CarDetails } from '../models/car-details.model';
import { IMAGE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  carDetails = new BehaviorSubject<CarDetails>({
    code: '',
    description: '',
    color: {
      code: '',
      description: '',
      price: 0,
    },
    imageUrl:'',
    configOptions: {
      config: {
        id: -1,
        price: 0,
        speed: 0,
        range: 0,
        description: '',
      },
      towHitch: false,
      yoke: false,
    },
  });

  updateCarModel(code: string, description: string, color: CarColor) {
    const currentValue = this.carDetails.getValue();

    currentValue.code = code;
    currentValue.description = description;
    currentValue.color = color;
    currentValue.imageUrl = IMAGE_URL + `${code}/${color.code}.jpg`;
    currentValue.configOptions = {
      config: {
        id: -1,
        price: 0,
        speed: 0,
        range: 0,
        description: '',
      },
      towHitch: false,
      yoke: false,
    }

    this.carDetails.next(currentValue);
  }

  updateCarColor(carColor: CarColor) {
    const currentValue = this.carDetails.getValue();
    currentValue.color = carColor;
    currentValue.imageUrl = IMAGE_URL + `${currentValue.code}/${currentValue.color.code}.jpg`;

    this.carDetails.next(currentValue);
  }

  updateCarConfigOptions(
    modelConfig: ModelConfig,
    towHitch: boolean,
    yoke: boolean
  ) {
    let currentValue = this.carDetails.getValue();
    currentValue.configOptions = {
      towHitch: towHitch,
      yoke: yoke,
      config: modelConfig,
    };

    this.carDetails.next(currentValue);
  }  
}
