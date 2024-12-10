import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(to bottom, #87ceeb, #ffffff);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

export const Header = styled.div`
  margin-bottom: 20px;
  h1 {
    font-size: 1.8rem;
    color: #333;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

export const SearchBar = styled.div`
  margin-bottom: 20px;
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const Status = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const WeatherInfo = styled.div`
  text-align: center;
`;

export const CurrentWeather = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Icon = styled.div`
  img {
    width: 80px;
    height: 80px;
  }
`;

export const Temperature = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 10px 0;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  text-transform: capitalize;
  color: #555;
`;

export const Location = styled.h3`
  margin: 10px 0;
  font-size: 1.5rem;
  color: #666;
`;

export const AdditionalInfo = styled.div`
  margin-top: 10px;
  p {
    font-size: 1rem;
    margin: 5px 0;
  }
`;
export interface ForecastItem {
  dt: number; 
  dt_txt: string; 
  main: {
    temp: number; 
    humidity: number; 
  };
  weather: Array<{
    icon: string; 
    description: string; 
  }>;
  wind: { 
    speed: number; 
  };
}
