import { Dialog } from "@headlessui/react"
import { CalculatorIcon, CalendarDaysIcon, ChevronDoubleUpIcon, QuestionMarkCircleIcon, SparklesIcon, TrophyIcon } from "@heroicons/react/24/outline"
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

  const iconClasses = 'h-6 w-6 inline pb-1 mr-1';

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
          <QuestionMarkCircleIcon className={iconClasses + ' text-green-700'} />
          {t('You need to guess the number that answers today\'s question in four tries.')}
        </div>
        <div className="mt-3">
          <CalculatorIcon className={iconClasses + ' text-red-700'} />
          {t('If the number is large, you only have to guess the first two digits, the rest are considered zeros.')}
        </div>
        <div className="mt-3">
          <ChevronDoubleUpIcon className={iconClasses + ' text-green-700'} />
          {t('After each try you will receive helpful hints.')}
        </div>
        <div className="mt-3">
          <TrophyIcon className={iconClasses + ' text-[#F8D000]'} />
          {t('When you guess the number, you will get a trophy, depending on how many tries it took you.')}
        </div>
        <div className="mt-3">
          <CalendarDaysIcon className={iconClasses + ' text-red-700'} />
          {t('Every day there is a new question.')}
        </div>
        <div className="mt-3">
          <SparklesIcon className={iconClasses + ' text-green-700'} />
          {t('Good luck!')}
        </div>
        <div className="mt-3 border-t-2 pt-3 text-sm">
          {t('Numerodia was created by Dan Dumitru in Brasov, Romania. Some game mechanics were borrowed from other daily games.')}
        </div>
      </div>
    </BaseModal>
  )
}
