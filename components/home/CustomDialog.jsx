// components/CustomDialog.js
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const CustomDialog = ({ open, onClose, text, state }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => onClose()}
      >
        <div className="min-h-screen px-6 text-center flex items-center justify-center">
          <div className="relative inline-block align-middle px-14 py-9 text-left align-middle bg-white shadow-xl rounded-md flex items-center justify-center flex-col rounded-[20px] z-[100]">
            <Dialog.Title as="h3" className="text-[24px] leading-6 text-black font-bold">
              {state === 'error' ? 'Uh Oh!' : text}
            </Dialog.Title>
            {
              state === 'loading' &&
              <img src="/images/loading.png" className='w-[60px] mt-3' />
            }
            {
              state === 'error' &&
              <p className='text-[15px] text-black w-[230px] mt-3'>
                We Couldn't Detect Your Face!
                Please Upload Another Picture
              </p>
            }
            {
              state === 'complete' &&
              <svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg" className='mt-3'>
                <path d="M46.9248 19.4594C46.0562 18.8451 45.3411 18.0042 44.8174 16.9748C44.0317 15.4498 43.8927 13.7779 44.2461 12.2617C44.5604 10.897 43.6217 9.52274 42.2558 9.36033C41.1938 9.20026 40.1715 8.81265 39.2272 8.15982C37.8295 7.19972 36.891 5.78746 36.485 4.26537C36.1156 2.93344 34.6405 2.16261 33.3457 2.6463C32.3555 3.01842 31.2531 3.16183 30.1528 3.03943C28.4456 2.83642 26.9705 2.06559 25.8781 0.917959C25.426 0.458791 24.8205 0.188312 24.2129 0.183635C23.6054 0.178958 22.9958 0.440083 22.5366 0.892235C21.4267 2.02291 19.9399 2.77094 18.2297 2.94764C17.0897 3.05279 16.0277 2.89272 15.0433 2.5054C13.7561 2.00183 12.2696 2.71189 11.8794 4.07595C11.45 5.5916 10.4899 6.98924 9.07765 7.92772C8.12338 8.56593 7.09523 8.93775 6.03085 9.08146C4.62443 9.2605 3.70288 10.5825 3.99613 11.9518C4.32589 13.5113 4.12346 15.1426 3.35234 16.6556C2.81284 17.6768 2.08524 18.4686 1.20692 19.1074C0.0613411 19.934 -0.141087 21.5653 0.76234 22.5976C1.77822 23.8206 2.41176 25.3824 2.43657 27.0914C2.4278 28.2306 2.19179 29.292 1.69085 30.2375C1.07365 31.4859 1.66951 33.0094 2.95645 33.551C4.43296 34.132 5.71582 35.2051 6.5395 36.7304C7.0635 37.7218 7.35909 38.7873 7.38888 39.8508C7.41603 41.256 8.69889 42.3292 10.0673 42.1499C11.6256 41.972 13.2558 42.3263 14.6917 43.2487C15.6363 43.8636 16.3896 44.6668 16.9142 45.5822C17.6263 46.8029 19.2185 47.1569 20.3641 46.3303C21.3948 45.6167 22.5755 45.1701 23.8671 45.1041C25.1573 45.228 26.3312 45.6547 27.3508 46.3841C28.4839 47.1903 30.1193 46.8611 30.8118 45.6892C31.3504 44.782 32.116 43.9904 33.07 43.3902C34.5199 42.49 36.1553 42.1608 37.7107 42.3627C39.1142 42.5633 40.3755 41.5098 40.4242 40.1051C40.4704 39.0422 40.7824 37.9813 41.3216 36.9982C42.1683 35.5237 43.4679 34.4325 44.9531 33.8743C46.248 33.3906 46.8675 31.8384 46.2696 30.5807C45.8213 29.6279 45.5636 28.5626 45.5724 27.4235C45.6235 25.7151 46.2431 24.1629 47.3156 22.956C48.2348 21.9378 48.0576 20.3035 46.9248 19.4594ZM23.8777 38.8005C15.4479 38.7356 8.62797 31.8099 8.69287 23.3801C8.75776 14.9504 15.6836 8.13047 24.1133 8.19537C32.543 8.26026 39.3629 15.186 39.2981 23.6158C39.2332 32.0455 32.3074 38.8654 23.8777 38.8005Z" fill="#00A006" />
              </svg>

            }
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomDialog;