// components/InfoDialog.js
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const PrevDialog = ({ open, loading, prevUrl, onClose }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => { }}
      >
        <div className="min-h-screen px-6 text-center flex items-center justify-center bg-black/[.9]">
          <div className="relative inline-block align-middle px-14 py-9 text-left align-middle bg-transparent shadow-xl rounded-md flex items-center justify-center flex-col rounded-[20px] z-[100]">
            {
              loading &&
              <img src="/Loading.gif" alt="loading" className='absolute top-1/2 w-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' />
            }
            <img
              src={prevUrl}
              alt="prev"
              className={`object-cover object-top rounded-[30px] w-[300px] h-[300px] z-0 ${loading ? 'blur-lg' : 'blur-none'}`}
            />
            <div className='px-8 w-full'>
              <button
                className='text-center w-full rounded-[7px] bg-[#D9D9D9] py-2 flex items-center justify-center mt-5 disabled:bg-gray-300'
                disabled={loading}
                onClick={() => {
                  if (!loading)
                    onClose();
                }}
                onMouseDown={() => {
                  if (!loading) onClose();
                }}
              >
                More!
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PrevDialog;
