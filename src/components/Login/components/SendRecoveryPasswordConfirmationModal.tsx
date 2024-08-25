import * as Dialog from "@radix-ui/react-dialog";
import { loginStatus, sendRecoveryPasswordEmailUser } from "../../../stores/userStore";
import { useState } from "react";

const SendRecoveryPasswordConfirmationModal = () => {
    const [emailToRecoveryPassword, setEmailToRecoveryPassword] = useState("");

    const handleSubmit = () => {
        loginStatus.set({ status: "", message: "" });
        sendRecoveryPasswordEmailUser(emailToRecoveryPassword);
    };

    return (
        <div className="bg-white rounded-md shadow-lg px-4 py-6 ">
            <Dialog.Title className="text-lg font-medium text-gray-800 text-center mt-3">
                Send Recovery Password Email
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500">
                <div className="flex flex-col gap-2">
                    <span>Please enter your email to recovery your password</span>
                    <input
                        type="text"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg"
                        placeholder="example@mail.com"
                        onChange={(e) => setEmailToRecoveryPassword(e.target.value)}
                    />
                </div>
            </Dialog.Description>
            <div className="items-center gap-2 mt-3 text-sm sm:flex">
                <Dialog.Close asChild>
                    <button
                        type="button"
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-lightPrimaryColor rounded-md outline-none ring-offset-2 ring-lightPrimaryColor focus:ring-2 hover:bg-primaryColor"
                        onClick={() => handleSubmit()}
                        disabled={!emailToRecoveryPassword}
                    >
                        Confirmar
                    </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                    <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-lightPrimaryColor focus:ring-2  hover:bg-secondBackgroundColor hover:text-textColor"
                        aria-label="Close"
                    >
                        Cancelar
                    </button>
                </Dialog.Close>
            </div>
        </div>
    );
};

export { SendRecoveryPasswordConfirmationModal };
