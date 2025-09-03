/**
 * Category Component
 * @param text - The text to display in the category badge
 * @param color - The background color of the category badge
 * @returns {JSX.Element}
 */

export function Category({ text, color }: { text: string; color: string }) {
  return (
    <section>
      <div
        className={`flex h-[24px] w-[43px] flex-shrink-0 items-center justify-center rounded-[50px]`}
        style={{ backgroundColor: `${color}3A` }}
      >
        <p
          className={`text-[12px] font-[500] leading-[16.8px]`}
          style={{ color }}
        >
          {text}
        </p>
      </div>
    </section>
  );
}
