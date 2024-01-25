export type RandomCacheTime = ({
  second,
  extra_minutes,
}: {
  second: number;
  extra_minutes: number;
}) => number;

export default function makeRandomCacheTime(): RandomCacheTime {
  return function randomCacheTime({ second, extra_minutes }) {
    return second + Math.random() * (extra_minutes * 60);
  };
}
