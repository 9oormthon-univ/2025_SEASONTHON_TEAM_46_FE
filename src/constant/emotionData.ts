export type EmotionKey = "희망" | "재미" | "분노" | "불안" | "슬픔" | "중립";

export const EMOTION_META: Record<
  EmotionKey,
  { color: string; subs: string[]; bgColor: string }
> = {
  희망: {
    color: "#38D1B8",
    subs: ["성취", "감동", "희망", "격려"],
    bgColor: "#7BEAD742",
  },
  재미: {
    color: "#7BEAD7",
    subs: ["즐거움", "흥미", "웃음", "연예"],
    bgColor: "#7BEAD742",
  },
  분노: {
    color: "#F63E3E",
    subs: ["갈등", "비판", "부패", "논란"],
    bgColor: "#FF767642",
  },
  불안: {
    color: "#F63E3E",
    subs: ["위기", "불안", "갈등", "위협"],
    bgColor: "#FF767642",
  },
  슬픔: {
    color: "#979797",
    subs: ["재난", "사고", "패배", "충격"],
    bgColor: "#ECECEC",
  },
  중립: { color: "#979797", subs: ["객관", "정보"], bgColor: "#ECECEC" },
};
