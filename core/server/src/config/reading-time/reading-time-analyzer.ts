import ReadingTime, { ReadTimeResults, Options } from "reading-time";

export interface IReadingTimeAnalyzerData {
  text: string;
  options?: Options;
}

export type IReadingTimeAnalyzer = ({
  text,
  options,
}: IReadingTimeAnalyzerData) => ReadTimeResults;

export default function makeReadingTimeAnalyzer({
  analyzer,
}: {
  analyzer: typeof ReadingTime;
}): IReadingTimeAnalyzer {
  return function readingTimeAnalyzer({
    text,
    options,
  }: {
    text: string;
    options?: Options;
  }): ReadTimeResults {
    return analyzer(text, options);
  };
}
