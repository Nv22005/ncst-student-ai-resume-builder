import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

function PersonalDetailsPreview() {
  const { formData } = useFormContext();
  
  return (
    <div>
      <h2
        className="font-bold text-xl text-center text-black"
      >
        {formData?.firstName} {formData?.lastName}
      </h2>

      <h2 className="text-center text-sm font-medium text-black">
        {formData?.jobTitle}
      </h2>

      <h2 className="text-center font-normal text-xs text-black">
        {formData?.address}
      </h2>

      <div className="flex justify-between">
        <h2 className="font-normal text-xs text-black">
          {formData?.phone}
        </h2>

        <h2 className="font-normal text-xs text-black">
          {formData?.email}
        </h2>
      </div>
      
      <hr
        className="border-[1.5px] my-2 mb-5"
        style={{
          borderColor: formData?.themeColor || themeColors[0],
        }}
      />
    </div>
  );
}

export default PersonalDetailsPreview;
