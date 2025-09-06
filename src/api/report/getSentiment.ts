import { getData } from "../../hooks/apiHelpers";

export async function getSentiment(): Promise<string> {
  return getData<string>("/api/analysis/sentiment");
}
