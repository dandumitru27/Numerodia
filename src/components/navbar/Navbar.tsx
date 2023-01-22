import { ChartBarIcon } from "@heroicons/react/24/outline";

type Props = {
  setIsStatsModalOpen: (value: boolean) => void
}

export default function Navbar({
  setIsStatsModalOpen
}: Props) {
  return (
    <div>
      <div className="flex justify-between px-3 mb-1">
        <div className="flex font-bold text-lg">
          <span className="text-green-800">numerodia</span>
          <span className="text-slate-300">.com</span>
        </div>
        <div className="flex mt-0.5">
          <ChartBarIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => setIsStatsModalOpen(true)}
          />
        </div>
      </div>
      <hr />
    </div>
  )
}
