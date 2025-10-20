import React from 'react';

const SideModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50  flex justify-center items-center">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          >
            
          </div>
          <div className="relative h-full w-full z-50 bg-[#fff] rounded-lg p-8">
            <div className="absolute top-0 right-0">
              <button
                className="bg-gray-300 rounded-full p-8"
                onClick={onClose}
              >
                X
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default SideModal;
