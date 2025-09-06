import type { ReactNode } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({
  open,
  onClose,
  children,
}: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-[rgba(42,42,42,0.80)]"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md rounded-t-[20px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.04)]"
        style={{ height: "448px" }}
      >
        <div className="flex h-full flex-col items-center p-6 text-center">
          {children}
        </div>
      </div>
    </div>
  );
}
