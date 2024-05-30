import { forwardRef, useState, type ButtonHTMLAttributes } from "react";
import { useStore } from "@nanostores/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as Dialog from "@radix-ui/react-dialog";
import type { PartyInterface } from "../typesDefs/party";
import { createPartyFunction } from "../stores/partyStore";
import { userInfo } from "../stores/userStore";

const RegisterPartyModal = () => {
  const $userInfo = useStore(userInfo);

  const [newPartyData, setNewPartyData] = useState({
    date: new Date(),
  } as PartyInterface);

  const handleSubmit = () => {
    createPartyFunction({
      ...newPartyData,
      createdBy: $userInfo.id,
      stats: [{ userId: $userInfo.id, goals: 0, victory: 0 }],
      players: [$userInfo.id],
    });
  };

  interface DatePickerInputProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    value?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

  // Use forwardRef with the appropriate generic types for the ref and props
  const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerInputProps>(
    ({ value, onClick }, ref) => (
      <button
        className="rounded-md bg-backgroundColor hover:bg-primaryColor px-5 py-2.5 text-sm font-medium text-textColor shadow mt-5"
        onClick={onClick}
        ref={ref}
      >
        {value}
      </button>
    )
  );

  return (
    <div className="bg-white rounded-md shadow-lg px-4 py-6 ">
      <Dialog.Title className="text-lg font-medium text-gray-800 text-center mt-3">
        Select Caima Date
      </Dialog.Title>
      <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500">
        <DatePicker
          selected={newPartyData.date}
          onChange={(dateSelected: Date) =>
            setNewPartyData({ ...newPartyData, date: new Date(dateSelected) })
          }
          customInput={<DatePickerInput />}
        />
      </Dialog.Description>
      <div className="items-center gap-2 mt-3 text-sm sm:flex">
        <Dialog.Close asChild>
          <button
            type="button"
            className="w-full mt-2 p-2.5 flex-1 text-white bg-lightPrimaryColor rounded-md outline-none ring-offset-2 ring-lightPrimaryColor focus:ring-2 hover:bg-primaryColor"
            onClick={() => handleSubmit()}
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

export { RegisterPartyModal };
