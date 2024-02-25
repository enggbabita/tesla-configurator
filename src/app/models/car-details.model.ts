import {
  ModelConfig,
} from './car-model-config-option.model';
import { CarColor } from './car-models.model';

export interface CarDetails {
  code: string;
  description: string;
  color: CarColor;
  imageUrl: string;
  configOptions: {
    towHitch: boolean;
    yoke: boolean;
    config: ModelConfig;
  };
}
