// components/CustomDialog.js
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const CustomDialog = ({ open, onClose, loading }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="inline-block align-middle p-8 my-8 text-left align-middle bg-white shadow-xl rounded-md">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              Checking Image...
            </Dialog.Title>

            {loading && (
              <div className="mt-4 flex justify-center items-center">
                {/* Loading Spinner */}
                <div className="inline-block animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-6 w-6"></div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomDialog;
