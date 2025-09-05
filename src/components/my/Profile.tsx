import type { ProfileProps } from "../../types/ProfileProps";

export function Profile({ imgSrc, name, email, role }: ProfileProps) {
  return (
    <article className="flex h-[129px] w-full items-center justify-center gap-[18px]">
      <img src={imgSrc} alt="Default Profile" width={62} height={62} />
      <div className="flex w-[190px] flex-col items-start">
        <div className="flex items-center gap-[6px]">
          <p className="text-[22px] font-[700] leading-[140%] text-[#2A2A2A]">
            {name}
          </p>
          <div
            className="flex h-[24px] w-[78px] flex-shrink-0 items-center justify-center rounded-[50px]"
            style={{
              background: "linear-gradient(270deg, #7F81FF 0%, #3D57FE 76.44%)",
            }}
          >
            <p className="text-[12px] font-[600] leading-[140%] text-[#FAFAFA]">
              {role}
            </p>
          </div>
        </div>
        <p className="truncate text-[12px] font-[500] leading-[140%] text-[#979797]">
          {email}
        </p>
      </div>
      <button className="flex h-[24px] w-[42px] flex-shrink-0 items-center justify-center rounded-[50px] bg-white">
        <p className="text-[12px] font-[500] leading-[140%] text-[#B3B3B3]">
          편집
        </p>
      </button>
    </article>
  );
}
