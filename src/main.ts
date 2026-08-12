import "@fontsource-variable/newsreader/opsz.css";
import "./style.css";

const LOCAL_TIME_ZONE = "Asia/Kolkata";
const WEATHER_ENDPOINT =
    "https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,weather_code,is_day&temperature_unit=celsius&timezone=Asia%2FKolkata&forecast_days=1";

const timeElement = document.querySelector<HTMLTimeElement>("#local-time");
const weatherElement =
    document.querySelector<HTMLSpanElement>("#local-weather");

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: LOCAL_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
});

const updateTime = () => {
    if (!timeElement) return;

    const now = new Date();
    timeElement.textContent = timeFormatter.format(now).toUpperCase();
    timeElement.dateTime = now.toISOString();
};

updateTime();
window.setInterval(updateTime, 30_000);

type WeatherResponse = {
    current?: {
        temperature_2m?: number;
        weather_code?: number;
        is_day?: number;
    };
};

type WeatherKind =
    | "clear-day"
    | "clear-night"
    | "partly-cloudy"
    | "cloudy"
    | "fog"
    | "rain"
    | "snow"
    | "storm";

const WEATHER_ICONS: Record<WeatherKind, string> = {
    "clear-day": `<circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/>`,
    "clear-night": `<path d="M20.2 15.1A8.4 8.4 0 0 1 8.9 3.8 8.4 8.4 0 1 0 20.2 15.1Z"/>`,
    "partly-cloudy": `<path d="M8 7.5a4 4 0 0 1 7.7 1.5"/><path d="M12 3v1.5M5.64 5.64 6.7 6.7M18.36 5.64 17.3 6.7M19.5 10H21"/><path d="M6.5 19h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.3 13.5 2.75 2.75 0 0 0 6.5 19Z"/>`,
    cloudy: `<path d="M6.5 18.5h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.3 13 2.75 2.75 0 0 0 6.5 18.5Z"/>`,
    fog: `<path d="M5 8h14M3 12h15M6 16h15"/>`,
    rain: `<path d="M6.5 15h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.3 9.5 2.75 2.75 0 0 0 6.5 15Z"/><path d="m8 18-1 2M13 18l-1 2M18 18l-1 2"/>`,
    snow: `<path d="M6.5 14h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.3 8.5 2.75 2.75 0 0 0 6.5 14Z"/><path d="M8 18h.01M13 20h.01M18 18h.01"/>`,
    storm: `<path d="M6.5 14h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.3 8.5 2.75 2.75 0 0 0 6.5 14Z"/><path d="m13 16-2 3h3l-2 3"/>`,
};

const weatherCondition = (code: number, isDay: boolean) => {
    if (code === 0)
        return {
            kind: isDay ? "clear-day" : "clear-night",
            label: "Clear sky",
        } satisfies { kind: WeatherKind; label: string };
    if (code <= 2)
        return { kind: "partly-cloudy", label: "Partly cloudy" } as const;
    if (code === 3) return { kind: "cloudy", label: "Overcast" } as const;
    if (code <= 48) return { kind: "fog", label: "Foggy" } as const;
    if (code <= 67 || (code >= 80 && code <= 82))
        return { kind: "rain", label: "Rainy" } as const;
    if (code <= 77 || (code >= 85 && code <= 86))
        return { kind: "snow", label: "Snowy" } as const;
    return { kind: "storm", label: "Thunderstorm" } as const;
};

const updateWeather = async () => {
    if (!weatherElement) return;

    try {
        const response = await fetch(WEATHER_ENDPOINT);
        if (!response.ok) throw new Error("Weather request failed");

        const data = (await response.json()) as WeatherResponse;
        const temperature = data.current?.temperature_2m;
        const code = data.current?.weather_code;
        const isDay = data.current?.is_day;

        if (
            temperature === undefined ||
            code === undefined ||
            isDay === undefined
        ) {
            throw new Error("Weather response was incomplete");
        }

        const condition = weatherCondition(code, isDay === 1);
        const roundedTemperature = Math.round(temperature);
        weatherElement.innerHTML = `<svg class="weather-icon" viewBox="0 0 24 24" aria-hidden="true">${WEATHER_ICONS[condition.kind]}</svg><span>${roundedTemperature}°C</span>`;
        weatherElement.setAttribute(
            "aria-label",
            `${condition.label}, ${roundedTemperature} degrees Celsius`,
        );
    } catch {
        weatherElement.textContent = "Weather unavailable";
        weatherElement.removeAttribute("aria-label");
    }
};

void updateWeather();
