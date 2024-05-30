import * as Dialog from "@radix-ui/react-dialog";
import { RegisterPartyModal } from "./RegisterPartyModal";

const RegisterCaimaButton = () => {
  return (
    <div className="text-center">
      <Dialog.Root>
        <Dialog.Trigger className="rounded-md bg-lightPrimaryColor hover:bg-primaryColor px-5 py-2.5 text-sm font-medium text-backgroundColor hover:text-titleColor shadow mt-5">
          Register New Caima
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
            {/* == REGISTER Party MODAL */}
            <RegisterPartyModal />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export { RegisterCaimaButton };
