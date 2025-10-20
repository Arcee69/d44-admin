import React from "react";
import successIcon from "../../assets/icons/success_icon.svg";
import Button from "../Button/ButtonComponent";

export default function SuccessAlert({
  handleCloseModalandRouting,
  modalTitle,
  modalNote,
  isLoading,
}) {
  return (
    <div className="bg-background_white w-[531px] h-[371px] rounded-lg flex flex-col gap-3 items-center justify-center p-8">
      <img
        src={successIcon}
        alt="icon"
        loading="lazy"
        className="h-[105px] w-[115px] z-30 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h3 className="text-3xl text-text_secondary_500 leading-8 text-center">
        {modalTitle || "Successful"}
      </h3>
      <p className="text-text_secondary_500 text-base text-center">
        {modalNote || "Your account has been created successfully"}
      </p>
      <Button
        title="Okay"
        className="w-full h-[56px] text-center my-6"
        backgroundColor="bg-primary"
        type="button"
        isLoading={isLoading}
        onClick={() => handleCloseModalandRouting()}
      />
    </div>
  );
}
