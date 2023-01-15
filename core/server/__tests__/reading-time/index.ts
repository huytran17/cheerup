import analyzer from "reading-time";
import makeReadingTimeAnalyzer from "./reading-time-analyzer";

const readingTimeAnalyzer = makeReadingTimeAnalyzer({
  analyzer,
});

export default Object.freeze({
  readingTimeAnalyzer,
});

export { readingTimeAnalyzer };
