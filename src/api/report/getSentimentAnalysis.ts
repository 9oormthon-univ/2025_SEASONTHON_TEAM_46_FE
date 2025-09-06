import { getData } from "../../hooks/apiHelpers";
import type { SentimentPercentageItem } from "../../types/SentimentAnalysis";

export function getSentimentPercentage() {
  return getData<SentimentPercentageItem[]>(
    "/api/analysis/sentiment/percentage",
  );
}
