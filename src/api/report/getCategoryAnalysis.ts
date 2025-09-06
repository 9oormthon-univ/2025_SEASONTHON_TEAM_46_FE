import { getData } from "../../hooks/apiHelpers";
import type { CategoryAnalysis } from "../../types/CategoryAnalysis";

export function getCategoryAnalysis() {
  return getData<CategoryAnalysis>("/api/analysis/category");
}
