import { getData } from "../../hooks/apiHelpers";
import type { EmotionItem } from "../../types/EmotionCount";

export function getEmotion() {
  return getData<EmotionItem[]>("/api/analysis/emotion");
}
