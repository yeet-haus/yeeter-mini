import { usePrivy } from "@privy-io/react-auth";

export const NeedWalletModal = () => {
  const { ready, authenticated } = usePrivy();

  const openModal = () => {
    const inputElement: HTMLDialogElement | null = document.getElementById(
      "need-wallet-modal"
    ) as HTMLDialogElement;

    if (inputElement) {
      inputElement.showModal();
    }
  };

  if (!ready || (ready && authenticated)) return null;

  return (
    <>
      <button className="btn" onClick={openModal}>
        Need a wallet?
      </button>
      <dialog id="need-wallet-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            You don't have a wallet or crypto?
          </h3>
          <p className="py-4">
            Here are some instructions on how to get set up
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
