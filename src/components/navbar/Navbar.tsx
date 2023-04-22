import { ChartBarIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

type Props = {
  setIsInfoModalOpen: (value: boolean) => void,
  setIsStatsModalOpen: (value: boolean) => void
}

export default function Navbar({
  setIsInfoModalOpen,
  setIsStatsModalOpen
}: Props) {
  const { i18n } = useTranslation();

  var domainFirstPart = 'numero';
  if (i18n.language === 'ro') {
    domainFirstPart = 'ro.' + domainFirstPart;
  }

  return (
    <div>
      <div className="flex justify-between px-3 mb-1">
        <div className="flex text-lg">
          <span className="text-green-700">{domainFirstPart}</span>
          <span className="text-green-700 font-bold">dia</span>
          <span className="text-slate-300">.com</span>
        </div>
        <div className="flex mt-0.5">
          <InformationCircleIcon
            className="h-6 w-6 mr-3 cursor-pointer"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <ChartBarIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsStatsModalOpen(true)}
          />
        </div>
      </div>
      <hr />
    </div>
  )
}
