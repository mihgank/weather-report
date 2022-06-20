export interface WeatherNode {
  weather: Array<Weather>;
  main: Main;
}

interface Main {
  temp: number;
  feels_like: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
