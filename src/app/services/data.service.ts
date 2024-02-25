import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModelConfigOption } from '../models/car-model-config-option.model';
import { CarModel } from '../models/car-models.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getModels(): Observable<Array<CarModel>> {
    return this.httpClient.get<Array<CarModel>>('/models');
  }

  getCarConfig(modelCode: string): Observable<CarModelConfigOption> {
    return this.httpClient.get<CarModelConfigOption>(`/options/${modelCode}`);
  }
}
