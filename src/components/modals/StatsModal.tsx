import { FaceFrownIcon, FireIcon, TrophyIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import Trophy from "../../enums/Trophy"
import { getNumberFormatted, getStatsLineText, getStreakText, getYouWonMessage } from "../../i18n/translate-methods"
import getTrophyColor, { getTrophyCountFromStats, getTrophyExclamation } from "../../lib/trophies"
import GameStats from "../../models/GameStats"
import Hint from "../../models/Hint"
import BaseModal from "./BaseModal"
import Puzzle from "../../models/puzzle"

type Props = {
  isOpen: boolean,
  handleClose: () => void,
  gameStats: GameStats,
  lastHint?: Hint,
  hints: Hint[],
  puzzle: Puzzle
}

export default function StatsModal({
  isOpen,
  handleClose,
  gameStats,
  lastHint,
  hints,
  puzzle
}: Props) {
  const { t } = useTranslation();

  // const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  // const [message, setMessage] = useState('');

  // const showMessage = (mes: string) => {
  //   setMessage(mes);
  //   setIsMessageModalOpen(true);
  // }

  // const handleShareFailure = () => {
  //   showMessage(t("Failed to copy the text to the clipboard. Sorry. It might be because of the browser you're using."));
  // }

  // const handleShareToClipboard = () => {
  //   showMessage(t("The result was copied to your clipboard. You can now paste it wherever you want to share it."));
  // }

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
      message2 = getYouWonMessage(lastHint.trophy);
    } else {
      icon = <FaceFrownIcon className={iconSizeClasses} />

      message1 = t('Incorrect') + '.';
      message2 = t('The answer is') + ' ' + getNumberFormatted(puzzle.answer) + '.';
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
      <div className="mt-2">
        {gameResult}
        <div className="text-xl mb-2">{t('Statistics')}</div>
        <StatsLine trophy={Trophy.Gold} gameStats={gameStats} />
        <StatsLine trophy={Trophy.Silver} gameStats={gameStats} />
        <StatsLine trophy={Trophy.Bronze} gameStats={gameStats} />
        <StatsLine gameStats={gameStats} />
        {gameResult &&
          <div className="mt-7">
            {t('Come back for another question') + ' '}
            <span className="font-bold">{t('tomorrow')}</span>.
            {/* <div className="flex justify-center">
              <button
                className="inline-flex mt-4 bg-green-600 text-white px-6 py-2 rounded-full"
                onClick={() => { shareResult(puzzle, hints, handleShareToClipboard, handleShareFailure) }}
              >
                {t('Share result')} &nbsp;
                <ShareIcon className="h-6 w-6 pt-0.5"></ShareIcon>
              </button>
            </div> */}
          </div>
        }
      </div>
      {/* <MessageModal
        message={message}
        isOpen={isMessageModalOpen}
        handleClose={() => setIsMessageModalOpen(false)}
      /> */}
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

    text = getStatsLineText(trophy, count);
  } else {
    const iconClasses = iconSizeClasses + ' text-red-400'

    icon = <FireIcon className={iconClasses} />;

    count = gameStats.currentStreak;

    text = getStreakText(count);
  }

  return (
    <div className="flex content-baseline mb-2">
      {icon}
      <span className="text-2xl mx-2">{count}</span>
      <span className="mt-1.5">{text}</span>
    </div>
  )
}
