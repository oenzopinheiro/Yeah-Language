import { tv } from "tailwind-variants";

interface ProgressBarProps {
  progress: number;
}

const progressStyle = tv({
  slots: {
    container: ["relative bg-gray-primary w-full h-[1.1rem] rounded-lg"],
    ProgressBar: [
      "absolute h-[1.1rem] bg-green-primary rounded-lg",
      "transition-all duration-500 ease-[cubic-bezier(0.65, 0, 0.35, 1)]",
    ],
  },
});

export function ProgressBar({ progress }: ProgressBarProps) {
  const { container, ProgressBar } = progressStyle();

  return (
    <div className={container()}>
      <div className={ProgressBar()} style={{ width: `${progress}%` }} />
    </div>
  );
}
