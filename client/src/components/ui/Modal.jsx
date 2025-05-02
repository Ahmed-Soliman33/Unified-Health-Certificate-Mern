const Modal = ({ isOpen, setIsModalOpen, children }) => {
  if (!isOpen) return null;

  const onClose = () => setIsModalOpen(false);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-xl p-6 rounded-2xl shadow-xl relative animate-fadeIn"
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3 duration-200 text-red-500 hover:text-red-600 text-2xl font-[200]"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
