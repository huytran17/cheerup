import ReadingTime, { ReadTimeResults, Options } from "reading-time";

export interface IReadingTimeAnalyzerData {
  text: string;
  options?: Options;
}

export type ReadingTimeAnalyzer = ({
  text,
  options,
}: IReadingTimeAnalyzerData) => ReadTimeResults;

export default function makeReadingTimeAnalyzer({
  analyzer,
}: {
  analyzer: typeof ReadingTime;
}): ReadingTimeAnalyzer {
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
