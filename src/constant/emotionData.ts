// src/constants/emotionMeta.ts
export type EmotionKey = "희망" | "재미" | "분노" | "불안" | "슬픔" | "중립";

export const EMOTION_META: Record<
  EmotionKey,
  { color: string; subs: string[] }
> = {
  희망: { color: "#7BEAD7", subs: ["성취", "감동", "희망", "격려"] },
  재미: { color: "#7BEAD7", subs: ["즐거움", "흥미", "웃음", "연예"] },
  분노: { color: "#FF7676", subs: ["갈등", "비판", "부패", "논란"] },
  불안: { color: "#FF7676", subs: ["위기", "불안", "갈등", "위협"] },
  슬픔: { color: "#8C8C8C", subs: ["재난", "사고", "패배", "충격"] },
  중립: { color: "#8C8C8C", subs: ["객관", "정보"] },
};
