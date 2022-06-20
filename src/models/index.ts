export interface WeatherNode {
  weather: Array<Weather>;
  main: Main;
  dt_txt: string;
}

interface Main {
  temp: number;
  feels_like: number;
}

interface Weather {
  id: number;
  main: 'Clear' | 'Clouds' | 'Rain' | 'Snow';
  description: string;
  icon: string;
}
