import { Dialog } from "@headlessui/react"
import { XCircleIcon } from "@heroicons/react/24/outline"

type Props = {
  isOpen: boolean,
  handleClose: () => void,
  children: React.ReactNode
}

export default function BaseModal({
  isOpen,
  handleClose,
  children
}: Props) {

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center m-4">
        <Dialog.Panel className="w-full max-w-sm transform rounded-lg bg-white p-4">
          <button
            onClick={() => handleClose()}
            tabIndex={0}
            aria-pressed="false"
            className="absolute right-2 top-2"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
