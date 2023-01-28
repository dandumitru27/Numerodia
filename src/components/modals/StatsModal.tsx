import { Dialog } from "@headlessui/react"
import { FireIcon, TrophyIcon } from "@heroicons/react/24/outline"
import Trophy from "../../enums/Trophy"
import getTrophyColor, { getTrophyCountFromStats } from "../../lib/trophies"
import GameStats from "../../models/GameStats"
import BaseModal from "./BaseModal"

type Props = {
  isOpen: boolean,
  handleClose: () => void,
  gameStats: GameStats
}

export default function StatsModal({
  isOpen,
  handleClose,
  gameStats
}: Props) {

  return (
    <BaseModal
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Dialog.Description className="mt-4">
        <StatsLine trophy={Trophy.Gold} gameStats={gameStats} />
        <StatsLine trophy={Trophy.Silver} gameStats={gameStats} />
        <StatsLine trophy={Trophy.Bronze} gameStats={gameStats} />
        <StatsLine gameStats={gameStats} />
      </Dialog.Description>
    </BaseModal>
  )
}

type LineProps = {
  trophy?: Trophy,
  gameStats: GameStats
}

function StatsLine({
  trophy,
  gameStats
}: LineProps) {
  let icon;
  let count: number;
  let text: string;

  const iconSizeClasses = 'h-7 w-7';

  if (trophy !== undefined) {
    let trophyColor = getTrophyColor(trophy);

    const iconClasses = iconSizeClasses + ` text-[${trophyColor}]`;

    icon = <TrophyIcon className={iconClasses} />;

    count = getTrophyCountFromStats(trophy, gameStats);

    let trophyName = Trophy[trophy].toLowerCase();

    text = trophyName + ' ' + getTrophyNoun(count);
  } else {
    const iconClasses = iconSizeClasses + ' text-red-400'

    icon = <FireIcon className={iconClasses} />;

    count = gameStats.currentStreak;

    text = 'streak';
  }

  return (
    <div className="flex content-baseline mb-2">
      {icon}
      <span className="text-2xl mx-2">{count}</span>
      <span className="mt-1.5">{text}</span>
    </div>
  )
}

const getTrophyNoun = (count: number) => {
  return count === 1 ? 'trophy' : 'trophies';
}
