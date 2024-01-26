export type RandomCacheTime = ({
  seconds,
  extra_minutes,
}: {
  seconds: number;
  extra_minutes: number;
}) => number;

export default function makeRandomCacheTime(): RandomCacheTime {
  return function randomCacheTime({ seconds, extra_minutes }) {
    return seconds + Math.round(Math.random() * (extra_minutes * 60));
  };
}
