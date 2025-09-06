/**
 * Category Component
 * @param text - The text to display in the category badge
 * @param textColor - The text color of the category badge
 * @param bgColor - The background color of the category badge
 * @returns {JSX.Element}
 */
type CategoryProps = {
  text: string;
  textColor: string;
  bgColor: string;
};

export function Category({ text, textColor, bgColor }: CategoryProps) {
  return (
    <section>
      <div
        className={`flex h-[24px] w-[43px] flex-shrink-0 items-center justify-center rounded-[50px]`}
        style={{ backgroundColor: bgColor }}
      >
        <p
          className={`text-[12px] font-[500] leading-[16.8px]`}
          style={{ color: textColor }}
        >
          {text}
        </p>
      </div>
    </section>
  );
}
