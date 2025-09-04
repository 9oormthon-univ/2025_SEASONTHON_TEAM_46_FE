import SearchIcon from "../../assets/icons/search.svg";
import type { KeyboardEvent, FocusEventHandler } from "react";

type Props = {
  className?: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export default function SearchBar({
  className = "",
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const ne = e.nativeEvent as globalThis.KeyboardEvent;
    if (ne.isComposing || ne.keyCode === 229) {
      return;
    }

    e.preventDefault();
    onSubmit(value.trim());
    (e.currentTarget as HTMLInputElement).blur();
  };

  return (
    <div
      className={`flex h-[56px] items-center gap-[13px] rounded-[50px] bg-[#FAFAFA] px-[27px] ${className}`}
    >
      <button
        type="button"
        onClick={() => onSubmit(value.trim())}
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center"
      >
        <img src={SearchIcon} alt="" />
      </button>

      <input
        type="text"
        placeholder="뉴스를 검색해보세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        className="min-w-0 flex-1 bg-transparent text-[16px] font-medium leading-normal text-black outline-none placeholder:font-medium placeholder:text-black/30"
      />
    </div>
  );
}
