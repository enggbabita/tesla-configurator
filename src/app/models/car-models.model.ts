
export interface CarModel{
    code: string;
    description: string;
    colors: Array<CarColor>;
}

export interface CarColor{
    code: string;
    description: string;
    price: number;
}