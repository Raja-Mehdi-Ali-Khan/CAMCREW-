const LoginRequiredModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between rounded-t p-5">
              <h3 className="text-3xl font-semibold">
                Please Login with Your Account
              </h3>
            </div>

            <div className="flex items-center justify-center rounded-b p-4">
              <button
                className="mb-1 mr-1 bg-bgimage px-6 py-2 text-sm font-bold uppercase text-gray-900 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={onClose}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default LoginRequiredModal;
