export type RandomCacheTime = ({
  second,
  extra,
}: {
  second: number;
  extra: number;
}) => number;

export default function makeRandomCacheTime(): RandomCacheTime {
  return function randomCacheTime({ second, extra }) {
    return second + Math.random() * (extra * 60);
  };
}
