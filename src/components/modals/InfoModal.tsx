import { Dialog } from "@headlessui/react"
import { useTranslation } from "react-i18next"
import BaseModal from "./BaseModal"

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export default function InfoModal({
  isOpen,
  handleClose
}: Props) {
  const { t } = useTranslation();

  return (
    <BaseModal
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium text-center text-gray-900"
      >
        {t('How to play')}
      </Dialog.Title>
      <div className="mt-3 text-justify text-gray-600">
        <div>
          {t('You need to guess the number that answers today\'s question in four tries.')}
        </div>
        <div className="mt-3">
          {t('If the number is large, you only have to guess the first two digits, the rest are considered zeros.')}
        </div>
        <div className="mt-3">
          {t('After each try you will receive helpful hints.')}
        </div>
        <div className="mt-3">
          {t('When you guess the number, you will get a trophy, depending on how many tries it took you.')}
        </div>
        <div className="mt-3">
          {t('Every day there is a new question.')}
        </div>
        <div className="mt-3">
          {t('Good luck!')}
        </div>
      </div>
    </BaseModal>
  )
}
