import { useEffect, useState } from "react";
import CategoryPill from "./CategoryPill";
import { useDragToScroll } from "../../hooks/useDragToScroll";

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
  fadeColor?: string;
};

export default function CategoryTabs({
  value,
  defaultValue = "전체",
  onChange,
  className = "",
  fadeColor = "#FFFFFF",
}: Props) {
  const [internal, setInternal] = useState<CategoryKey>(defaultValue);
  const selected = value ?? internal;

  const scrollerRef = useDragToScroll<HTMLDivElement>();
  const [showRightFade, setShowRightFade] = useState(false);

  const updateFades = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowRightFade(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    setTimeout(updateFades, 0);

    const el = scrollerRef.current;
    const onResize = () => updateFades();

    window.addEventListener("resize", onResize);
    el?.addEventListener("scroll", updateFades);

    return () => {
      window.removeEventListener("resize", onResize);
      el?.removeEventListener("scroll", updateFades);
    };
  }, [scrollerRef]);

  const handleSelect = (k: CategoryKey) => {
    if (value === undefined) setInternal(k);
    onChange?.(k);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollerRef}
        className="no-scrollbar w-full cursor-grab snap-x overflow-x-auto overscroll-x-contain px-3 [-webkit-overflow-scrolling:touch] [touch-action:pan-x] active:cursor-grabbing"
      >
        <div className="mx-auto flex w-max items-center gap-[9px]">
          {CATEGORIES.map((c) => (
            <div key={c} className="flex-shrink-0 snap-start">
              <CategoryPill
                label={c}
                selected={selected === c}
                onClick={() => handleSelect(c)}
              />
            </div>
          ))}
        </div>
      </div>

      {showRightFade && (
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-5"
          style={{
            background: `linear-gradient(to left, ${fadeColor}, transparent)`,
          }}
        />
      )}
    </div>
  );
}
