import BackSvg from "../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";

/**
 * Header component for the application
 * @param text - The text to display in the header
 * @param onClick - The function to call when the back button is clicked
 * @returns {JSX.Element}
 */

export function Header({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  const navigate = useNavigate();
  return (
    <header
      className="fixed top-0 flex h-[104px] w-full flex-shrink-0 items-center justify-between rounded-b-[20px] bg-white px-[29px]"
      style={{ boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.04)" }}
    >
      <img
        src={BackSvg}
        alt="Back"
        width={18}
        height={16}
        onClick={
          onClick ||
          (() => {
            navigate(-1);
          })
        }
        className="cursor-pointer"
      />
      <h1 className="text-[18px] font-bold leading-[140%] text-[#2A2A2A]">
        {text}
      </h1>
      <div></div>
    </header>
  );
}
