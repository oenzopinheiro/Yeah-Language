import { Button } from "@/app/modules/share/components/Button";
import { XCircle } from "@phosphor-icons/react/dist/ssr";

interface ErrorProps {
  correctSolution: string;
  yourSolution: string;
  handleClick: () => void;
}

export function Error({
  correctSolution,
  yourSolution,
  handleClick,
}: ErrorProps) {
  return (
    <div className="max-w-5xl px-4 w-full mx-auto flex justify-between items-center h-full">
      <div className="flex items-center gap-3">
        <div className="text-red-dark">
          <XCircle size={80} weight="fill" />
        </div>

        <div className="flex flex-col text-red-dark">
          <div>
            <span className="text-sm md:text-lg font-bold">
              Correct solution:
            </span>

            <div className="text-sm">{correctSolution}</div>
            <div>
              <span className="text-sm md:text-lg font-bold">
                Your solution
              </span>

              <div className="text-sm">{yourSolution}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-36">
        <Button variant="error" onClick={handleClick}>
          Continue
        </Button>
      </div>
    </div>
  );
}
