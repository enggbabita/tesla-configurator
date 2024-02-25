export interface CarModelConfigOption{
    configs: Array<ModelConfig>;
    towHitch: boolean;
    yoke: boolean;
}

export interface ModelConfig{
    id: number;
    price: number;
    speed: number;
    range: number;
    description: string;
}