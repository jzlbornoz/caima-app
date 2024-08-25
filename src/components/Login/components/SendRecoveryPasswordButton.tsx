import * as Dialog from "@radix-ui/react-dialog";
import { SendRecoveryPasswordConfirmationModal } from "./SendRecoveryPasswordConfirmationModal";

const SendRecoveryPasswordButton = () => {

    return (
        <div className="text-center">
            <Dialog.Root>
                <Dialog.Trigger
                    className="w-full px-4 py-2 hover:text-lightPrimaryColor text-lightSecondaryColor font-medium 
          bg-secondaryColor active:bg-lightPrimaryColor rounded-lg duration-150"
                >
                    Recovery Password
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                    <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                        {/* == REGISTER Party MODAL */}
                        <SendRecoveryPasswordConfirmationModal />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export { SendRecoveryPasswordButton };
