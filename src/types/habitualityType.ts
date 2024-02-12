export interface Action {
  name: string;
  action: (item: any) => void;
  icon: string;
  class: string;
}

export interface HabitualityMap {
  id: number;
  "Data e hora": string;
  Localização: string;
  Evento: string;
  Arma: string;
  date_time: string;
  location: {
    name: string;
  };
  event: {
    name: string;
  };
  weapon: {
    type: {
      name: string;
    };
    model: {
      name: string;
    };
    caliber: {
      name: string;
    };
    number_sigma: string;
  };
}

export interface HabitualityDisplay {
  id: number;
  "Data e hora": string;
  Localização: string;
  Evento: string;
  Arma: string;
}
