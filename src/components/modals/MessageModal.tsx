import { Dialog } from "@headlessui/react"
import BaseModal from "./BaseModal"

type Props = {
  message: string,
  isOpen: boolean
  handleClose: () => void
}

export default function MessageModal({
  message,
  isOpen,
  handleClose
}: Props) {

  return (
    <BaseModal
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Dialog.Description className="text mt-4">
        {message}
      </Dialog.Description>
    </BaseModal>
  )
}
