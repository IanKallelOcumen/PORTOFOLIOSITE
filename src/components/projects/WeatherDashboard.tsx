import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { Search, MapPin, Cloud, Wind, Droplets, Eye, Gauge, Sun, CloudRain, CloudSnow, CloudDrizzle, Zap, Moon, Star, Heart, TrendingUp, TrendingDown, Thermometer, AlertTriangle, Clock, Sunrise, Sunset, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from '../Footer';

interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  precipitation: number;
}

interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  uvIndex: number;
  airQuality: number;
  sunrise: string;
  sunset: string;
  hourly: HourlyForecast[];
  forecast: {
    day: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    condition: string;
    precipitation: number;
  }[];
  alerts?: {
    type: string;
    description: string;
  }[];
}

const mockWeatherData: Record<string, WeatherData> = {
  london: {
    city: 'London',
    country: 'UK',
    temp: 18,
    feelsLike: 16,
    condition: 'Cloudy',
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NW',
    visibility: 10,
    pressure: 1013,
    uvIndex: 3,
    airQuality: 85,
    sunrise: '06:45',
    sunset: '20:15',
    hourly: [
      { time: '12:00', temp: 17, condition: 'Cloudy', precipitation: 10 },
      { time: '15:00', temp: 19, condition: 'Sunny', precipitation: 0 },
      { time: '18:00', temp: 18, condition: 'Cloudy', precipitation: 5 },
      { time: '21:00', temp: 15, condition: 'Cloudy', precipitation: 20 },
      { time: '00:00', temp: 13, condition: 'Rainy', precipitation: 60 }
    ],
    forecast: [
      { day: 'Mon', temp: 19, tempMin: 14, tempMax: 21, condition: 'Sunny', precipitation: 5 },
      { day: 'Tue', temp: 17, tempMin: 13, tempMax: 19, condition: 'Rainy', precipitation: 80 },
      { day: 'Wed', temp: 20, tempMin: 15, tempMax: 22, condition: 'Cloudy', precipitation: 20 },
      { day: 'Thu', temp: 21, tempMin: 16, tempMax: 23, condition: 'Sunny', precipitation: 0 },
      { day: 'Fri', temp: 18, tempMin: 14, tempMax: 20, condition: 'Cloudy', precipitation: 30 },
      { day: 'Sat', temp: 19, tempMin: 15, tempMax: 21, condition: 'Sunny', precipitation: 10 },
      { day: 'Sun', temp: 20, tempMin: 16, tempMax: 22, condition: 'Sunny', precipitation: 5 }
    ]
  },
  tokyo: {
    city: 'Tokyo',
    country: 'Japan',
    temp: 24,
    feelsLike: 26,
    condition: 'Sunny',
    humidity: 70,
    windSpeed: 8,
    windDirection: 'E',
    visibility: 15,
    pressure: 1015,
    uvIndex: 8,
    airQuality: 60,
    sunrise: '05:30',
    sunset: '18:45',
    hourly: [
      { time: '12:00', temp: 23, condition: 'Sunny', precipitation: 0 },
      { time: '15:00', temp: 26, condition: 'Sunny', precipitation: 0 },
      { time: '18:00', temp: 24, condition: 'Cloudy', precipitation: 10 },
      { time: '21:00', temp: 21, condition: 'Cloudy', precipitation: 15 },
      { time: '00:00', temp: 19, condition: 'Cloudy', precipitation: 20 }
    ],
    forecast: [
      { day: 'Mon', temp: 25, tempMin: 20, tempMax: 27, condition: 'Sunny', precipitation: 0 },
      { day: 'Tue', temp: 26, tempMin: 21, tempMax: 28, condition: 'Sunny', precipitation: 5 },
      { day: 'Wed', temp: 23, tempMin: 19, tempMax: 25, condition: 'Rainy', precipitation: 70 },
      { day: 'Thu', temp: 22, tempMin: 18, tempMax: 24, condition: 'Cloudy', precipitation: 40 },
      { day: 'Fri', temp: 24, tempMin: 20, tempMax: 26, condition: 'Sunny', precipitation: 10 },
      { day: 'Sat', temp: 25, tempMin: 21, tempMax: 27, condition: 'Sunny', precipitation: 0 },
      { day: 'Sun', temp: 26, tempMin: 22, tempMax: 28, condition: 'Sunny', precipitation: 5 }
    ],
    alerts: [
      { type: 'Heat Advisory', description: 'High UV index expected. Take precautions when outdoors.' }
    ]
  },
  'new york': {
    city: 'New York',
    country: 'USA',
    temp: 22,
    feelsLike: 23,
    condition: 'Rainy',
    humidity: 80,
    windSpeed: 15,
    windDirection: 'SW',
    visibility: 8,
    pressure: 1010,
    uvIndex: 4,
    airQuality: 75,
    sunrise: '06:15',
    sunset: '20:00',
    hourly: [
      { time: '12:00', temp: 20, condition: 'Rainy', precipitation: 70 },
      { time: '15:00', temp: 22, condition: 'Rainy', precipitation: 60 },
      { time: '18:00', temp: 21, condition: 'Cloudy', precipitation: 30 },
      { time: '21:00', temp: 19, condition: 'Cloudy', precipitation: 20 },
      { time: '00:00', temp: 17, condition: 'Cloudy', precipitation: 10 }
    ],
    forecast: [
      { day: 'Mon', temp: 21, tempMin: 17, tempMax: 23, condition: 'Rainy', precipitation: 75 },
      { day: 'Tue', temp: 23, tempMin: 19, tempMax: 25, condition: 'Cloudy', precipitation: 35 },
      { day: 'Wed', temp: 25, tempMin: 21, tempMax: 27, condition: 'Sunny', precipitation: 10 },
      { day: 'Thu', temp: 24, tempMin: 20, tempMax: 26, condition: 'Sunny', precipitation: 5 },
      { day: 'Fri', temp: 22, tempMin: 18, tempMax: 24, condition: 'Cloudy', precipitation: 40 },
      { day: 'Sat', temp: 23, tempMin: 19, tempMax: 25, condition: 'Sunny', precipitation: 15 },
      { day: 'Sun', temp: 24, tempMin: 20, tempMax: 26, condition: 'Sunny', precipitation: 10 }
    ]
  },
  paris: {
    city: 'Paris',
    country: 'France',
    temp: 20,
    feelsLike: 19,
    condition: 'Cloudy',
    humidity: 60,
    windSpeed: 10,
    windDirection: 'N',
    visibility: 12,
    pressure: 1012,
    uvIndex: 5,
    airQuality: 90,
    sunrise: '06:30',
    sunset: '21:00',
    hourly: [
      { time: '12:00', temp: 19, condition: 'Cloudy', precipitation: 15 },
      { time: '15:00', temp: 21, condition: 'Sunny', precipitation: 5 },
      { time: '18:00', temp: 20, condition: 'Cloudy', precipitation: 10 },
      { time: '21:00', temp: 17, condition: 'Cloudy', precipitation: 20 },
      { time: '00:00', temp: 15, condition: 'Cloudy', precipitation: 25 }
    ],
    forecast: [
      { day: 'Mon', temp: 21, tempMin: 16, tempMax: 23, condition: 'Sunny', precipitation: 10 },
      { day: 'Tue', temp: 19, tempMin: 14, tempMax: 21, condition: 'Cloudy', precipitation: 30 },
      { day: 'Wed', temp: 22, tempMin: 17, tempMax: 24, condition: 'Sunny', precipitation: 5 },
      { day: 'Thu', temp: 20, tempMin: 15, tempMax: 22, condition: 'Rainy', precipitation: 65 },
      { day: 'Fri', temp: 21, tempMin: 16, tempMax: 23, condition: 'Cloudy', precipitation: 35 },
      { day: 'Sat', temp: 23, tempMin: 18, tempMax: 25, condition: 'Sunny', precipitation: 10 },
      { day: 'Sun', temp: 22, tempMin: 17, tempMax: 24, condition: 'Sunny', precipitation: 15 }
    ]
  }
};

export function WeatherDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData.london);
  const [error, setError] = useState('');
  const [savedLocations, setSavedLocations] = useState<string[]>(['London']);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [activeView, setActiveView] = useState<'overview' | 'hourly' | 'forecast'>('overview');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const city = searchTerm.toLowerCase().trim();
    
    if (mockWeatherData[city]) {
      setWeather(mockWeatherData[city]);
      setError('');
    } else {
      setError('City not found. Try: London, Tokyo, New York, or Paris');
    }
  };

  const addLocation = (city: string) => {
    if (!savedLocations.includes(city)) {
      setSavedLocations([...savedLocations, city]);
    }
  };

  const removeLocation = (city: string) => {
    setSavedLocations(savedLocations.filter(loc => loc !== city));
  };

  const convertTemp = (temp: number) => {
    return unit === 'C' ? temp : Math.round((temp * 9/5) + 32);
  };

  const getWeatherIcon = (condition: string, size: 'small' | 'large' = 'large') => {
    const className = size === 'large' ? 'w-24 h-24' : 'w-8 h-8';
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className={`${className} text-yellow-400`} />;
      case 'rainy':
        return <CloudRain className={`${className} text-blue-400`} />;
      case 'cloudy':
        return <Cloud className={`${className} text-gray-400`} />;
      case 'snow':
        return <CloudSnow className={`${className} text-blue-200`} />;
      default:
        return <Cloud className={`${className} text-gray-400`} />;
    }
  };

  const getAirQualityColor = (aqi: number) => {
    if (aqi >= 80) return 'text-green-400';
    if (aqi >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6" style={{ fontFamily: 'Sora, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">WeatherNow Pro</h1>
            <p className="text-blue-200">Advanced weather tracking & forecasting</p>
          </div>
          <button
            onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
          >
            °{unit}
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a city (London, Tokyo, New York, Paris)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
          </form>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-red-300 text-sm text-center"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Saved Locations */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          {savedLocations.map((loc) => (
            <div key={loc} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl">
              <button
                onClick={() => {
                  setSearchTerm(loc);
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                {loc}
              </button>
              {savedLocations.length > 1 && (
                <button onClick={() => removeLocation(loc)} className="text-white/50 hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addLocation(weather.city)}
            className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-white hover:bg-white/20 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Weather Alerts */}
        {weather.alerts && weather.alerts.length > 0 && (
          <div className="mb-6">
            {weather.alerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-4 text-white mb-3"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-red-400" />
                  <div>
                    <h4 className="font-bold">{alert.type}</h4>
                    <p className="text-sm text-red-200">{alert.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View Tabs */}
        <div className="flex gap-2 mb-6">
          {['overview', 'hourly', 'forecast'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view as typeof activeView)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeView === view
                  ? 'bg-white/20 text-white border-2 border-white/40'
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/15'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Weather Card */}
        {activeView === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Current Weather */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-6 h-6" />
                    <h2 className="text-4xl font-bold">{weather.city}</h2>
                  </div>
                  <p className="text-blue-200 text-lg">{weather.country}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm text-blue-100">
                      {new Date().toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  {getWeatherIcon(weather.condition)}
                  <p className="mt-2 text-xl font-medium">{weather.condition}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-8xl font-bold mb-2">{convertTemp(weather.temp)}°</div>
                  <div className="flex items-center gap-2 text-blue-100 text-lg">
                    <span>Feels like {convertTemp(weather.feelsLike)}°</span>
                    {weather.feelsLike > weather.temp ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: 'blue' },
                    { icon: Wind, label: 'Wind', value: `${weather.windSpeed} km/h ${weather.windDirection}`, color: 'cyan' },
                    { icon: Eye, label: 'Visibility', value: `${weather.visibility} km`, color: 'purple' },
                    { icon: Gauge, label: 'Pressure', value: `${weather.pressure} mb`, color: 'pink' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className={`w-4 h-4 text-${item.color}-200`} />
                        <span className="text-xs text-blue-100">{item.label}</span>
                      </div>
                      <p className="text-lg font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              {/* Sun Times */}
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 text-white border border-orange-400/30">
                <h3 className="font-bold mb-4 text-lg">Sun & Moon</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sunrise className="w-5 h-5 text-orange-300" />
                      <span>Sunrise</span>
                    </div>
                    <span className="font-semibold">{weather.sunrise}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sunset className="w-5 h-5 text-orange-400" />
                      <span>Sunset</span>
                    </div>
                    <span className="font-semibold">{weather.sunset}</span>
                  </div>
                </div>
              </div>

              {/* UV & Air Quality */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20">
                <h3 className="font-bold mb-4 text-lg">Air Quality & UV</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span>UV Index</span>
                      <span className="font-bold">{weather.uvIndex}/10</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-red-400"
                        style={{ width: `${(weather.uvIndex / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Air Quality</span>
                      <span className={`font-bold ${getAirQualityColor(weather.airQuality)}`}>
                        {weather.airQuality}/100
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          weather.airQuality >= 80 ? 'bg-green-400' :
                          weather.airQuality >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${weather.airQuality}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hourly Forecast */}
        {activeView === 'hourly' && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white border border-white/20 mb-6">
            <h3 className="text-2xl font-bold mb-6">Hourly Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {weather.hourly.map((hour, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
                >
                  <p className="font-semibold mb-3">{hour.time}</p>
                  <div className="flex justify-center mb-3">
                    {getWeatherIcon(hour.condition, 'small')}
                  </div>
                  <p className="text-3xl font-bold mb-2">{convertTemp(hour.temp)}°</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-blue-200">
                    <Droplets className="w-3 h-3" />
                    <span>{hour.precipitation}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 7-Day Forecast */}
        {activeView === 'forecast' && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white border border-white/20">
            <h3 className="text-2xl font-bold mb-6">7-Day Forecast</h3>
            <div className="space-y-3">
              {weather.forecast.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all"
                >
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                    <div className="font-semibold text-lg">{day.day}</div>
                    <div className="flex items-center gap-3">
                      {getWeatherIcon(day.condition, 'small')}
                      <span>{day.condition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-300" />
                      <span>{day.precipitation}%</span>
                    </div>
                    <div className="text-2xl font-bold">{convertTemp(day.temp)}°</div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingDown className="w-4 h-4 text-blue-300" />
                      <span>{convertTemp(day.tempMin)}°</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-orange-300" />
                      <span>{convertTemp(day.tempMax)}°</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>Data updates every hour • Weather data for demonstration purposes</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}