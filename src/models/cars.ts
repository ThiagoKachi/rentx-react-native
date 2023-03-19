export interface ICar {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory[];
  photos: CarPhotos[];
}

export interface CarPhotos {
  id: string;
  photo: string;
}

export interface Accessory {
  id: string;
  type: string;
  name: string;
}

export interface Rent {
  period: string;
  price: number;
}
