import { useState } from "react";

export type CategoryKey = "전체" | "정치" | "세계" | "IT" | "생활" | "사회";

const CATEGORIES: CategoryKey[] = [
  "전체",
  "정치",
  "세계",
  "IT",
  "생활",
  "사회",
];

type Props = {
  value?: CategoryKey;
  defaultValue?: CategoryKey;
  onChange?: (next: CategoryKey) => void;
  className?: string;
};

export default function Category({
  value,
  defaultValue = "전체",
  onChange,
  className = "",
}: Props) {
  const [internal, setInternal] = useState<CategoryKey>(defaultValue);
  const selected = value ?? internal;

  const handleClick = (c: CategoryKey) => {
    if (value === undefined) {
      setInternal(c);
    }
    onChange?.(c);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 가로 스크롤 컨테이너 */}
      <div className="no-scrollbar flex w-full gap-2 overflow-x-auto px-3 py-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => handleClick(c)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selected === c
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
