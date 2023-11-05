export default function fetchMatchs(): Promise<Match[]> {
  return fetch('https://nesine-case-study.onrender.com/bets').then((res) => res.json());
}
