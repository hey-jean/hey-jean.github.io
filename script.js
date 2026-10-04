// 오늘의 날씨 (Open-Meteo, API 키 불필요)
const CITIES = [
  { id: 'seoul', lat: 37.5665, lon: 126.978 },
  { id: 'jeju', lat: 33.4996, lon: 126.5312 }
];

function weatherInfo(code) {
  if (code === 0) return ['☀️', '맑음'];
  if (code <= 2) return ['🌤️', '구름 조금'];
  if (code === 3) return ['☁️', '흐림'];
  if (code <= 48) return ['🌫️', '안개'];
  if (code <= 57) return ['🌦️', '이슬비'];
  if (code <= 67) return ['🌧️', '비'];
  if (code <= 77) return ['🌨️', '눈'];
  if (code <= 82) return ['🌧️', '소나기'];
  if (code <= 86) return ['🌨️', '눈 소나기'];
  return ['⛈️', '뇌우'];
}

async function fetchWeather(city) {
  const card = document.getElementById(city.id);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&timezone=Asia%2FSeoul`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const [icon, desc] = weatherInfo(data.current.weather_code);
    card.querySelector('.icon').textContent = icon;
    card.querySelector('.temp').textContent = `${Math.round(data.current.temperature_2m)}°`;
    card.querySelector('.desc').textContent = desc;
  } catch (e) {
    card.querySelector('.icon').textContent = '⚠️';
    card.querySelector('.desc').textContent = '날씨를 불러오지 못했어요';
  }
}
CITIES.forEach(fetchWeather);

// 명언
const QUOTES = [
  ['천 리 길도 한 걸음부터.', '노자'],
  ['오늘 할 수 있는 일을 내일로 미루지 마라.', '벤저민 프랭클린'],
  ['배움에는 왕도가 없다.', '유클리드'],
  ['상상력은 지식보다 중요하다.', '알베르트 아인슈타인'],
  ['실패는 성공의 어머니이다.', '토머스 에디슨'],
  ['아는 것이 힘이다.', '프랜시스 베이컨'],
  ['행동은 모든 성공의 기본 열쇠이다.', '파블로 피카소'],
  ['시작이 반이다.', '아리스토텔레스']
];
let last = -1;
function showQuote(first) {
  let i;
  if (first) i = 5; // 처음에는 항상 같은 명언("아는 것이 힘이다.")
  else do { i = Math.floor(Math.random() * QUOTES.length); } while (i === last);
  last = i;
  document.getElementById('quote-text').textContent = `“${QUOTES[i][0]}”`;
  document.getElementById('quote-author').textContent = `— ${QUOTES[i][1]}`;
}
document.getElementById('next-quote').addEventListener('click', () => showQuote(false));
showQuote(true);
