import { Dialog } from "@headlessui/react"
import GameStats from "../../models/GameStats"
import BaseModal from "./BaseModal"

type Props = {
  isOpen: boolean
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
      <Dialog.Description className="text-lg mt-4">
        <div>{gameStats.goldTrophies} gold {getTrophyNoun(gameStats.goldTrophies)}</div>
        <div>{gameStats.silverTrophies} silver {getTrophyNoun(gameStats.silverTrophies)}</div>
        <div>{gameStats.bronzeTrophies} bronze {getTrophyNoun(gameStats.bronzeTrophies)}</div>
        <div>{gameStats.currentStreak} streak</div>
      </Dialog.Description>
    </BaseModal>
  )
}

const getTrophyNoun = (count: number) => {
  return count === 1 ? 'trophy' : 'trophies';
}