import { Dialog } from "@headlessui/react"
import BaseModal from "./BaseModal"

type Props = {
  text: string,
  isOpen: boolean
  handleClose: () => void
}

export default function LargerTextModal({
  text,
  isOpen,
  handleClose
}: Props) {

  return (
    <BaseModal
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Dialog.Description className="text-lg mt-4">
        {text}
      </Dialog.Description>
    </BaseModal>
  )
}
