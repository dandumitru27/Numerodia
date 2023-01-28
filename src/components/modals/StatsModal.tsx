import { Dialog } from "@headlessui/react"
import { FaceFrownIcon, FireIcon, TrophyIcon } from "@heroicons/react/24/outline"
import { LOCALE } from "../../constants/settings"
import Trophy from "../../enums/Trophy"
import getTrophyColor, { getTrophyCountFromStats, getTrophyExclamation } from "../../lib/trophies"
import GameStats from "../../models/GameStats"
import Hint from "../../models/Hint"
import BaseModal from "./BaseModal"

type Props = {
  isOpen: boolean,
  handleClose: () => void,
  gameStats: GameStats,
  lastHint?: Hint,
  answer: number
}

export default function StatsModal({
  isOpen,
  handleClose,
  gameStats,
  lastHint,
  answer
}: Props) {
  let gameResult;

  if (lastHint?.isCorrect || lastHint?.isGameLost) {
    let icon;
    let message1: string;
    let message2: string;

    const iconSizeClasses = 'h-14 w-14 mr-2';

    if (lastHint.isCorrect && lastHint.trophy !== undefined) {
      let trophyColor = getTrophyColor(lastHint.trophy);

      const iconClasses = iconSizeClasses + ` text-[${trophyColor}]`;

      icon = <TrophyIcon className={iconClasses} />;

      message1 = getTrophyExclamation(lastHint.trophy);
      message2 = `You won the ${Trophy[lastHint.trophy].toLowerCase()} trophy.`
    } else {
      icon = <FaceFrownIcon className={iconSizeClasses} />

      message1 = 'Incorrect.';
      message2 = `The answer is ${answer.toLocaleString(LOCALE)}.`;
    }

    gameResult =
      <div className="flex mb-7">
        {icon}
        <div className="mt-2">{message1}<br />{message2}</div>
      </div>;
  }

  return (
    <BaseModal
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="mt-4">
        {gameResult}
        <div className="text-xl mb-2">Statistics</div>
        <StatsLine trophy={Trophy.Gold} gameStats={gameStats} />
        <StatsLine trophy={Trophy.Silver} gameStats={gameStats} />
        <StatsLine trophy={Trophy.Bronze} gameStats={gameStats} />
        <StatsLine gameStats={gameStats} />
        {gameResult && <div className="mt-7">Come back for another question <span className="font-bold">tomorrow</span>.</div>}
      </div>
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
