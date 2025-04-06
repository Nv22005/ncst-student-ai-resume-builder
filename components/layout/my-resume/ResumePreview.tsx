"use client";

import React from "react";
import { useFormContext } from "@/lib/context/FormProvider";
import PersonalDetailsPreview from "./previews/PersonalDetailsPreview";
import SkillsPreview from "./previews/SkillsPreview";
import SummaryPreview from "./previews/SummaryPreview";
import ExperiencePreview from "./previews/ExperiencePreview";
import EducationalPreview from "./previews/EducationalPreview";
import { themeColors } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

const ResumePreview = ({ download = false }) => {
  const { formData, setActiveFormIndex } = useFormContext();
  const pathname = usePathname();

  const isEditMode = pathname.endsWith("/edit");
  const interactiveClass = isEditMode
    ? "cursor-pointer hover:bg-gray-100 px-2 py-[1px] rounded"
    : "";

  const sections = [
    {
      index: 1,
      component: <PersonalDetailsPreview />,
      condition: true,
    },
    {
      index: 2,
      component: <SummaryPreview />,
      condition: true,
    },
    {
      index: 3,
      component: <ExperiencePreview />,
      condition: formData?.experience?.length > 0,
    },
    {
      index: 4,
      component: <EducationalPreview />,
      condition: formData?.education?.length > 0,
    },
    {
      index: 5,
      component: <SkillsPreview />,
      condition: formData?.skills?.length > 0,
    },
  ];

  if (Object.keys(formData || {}).length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[210mm] min-h-[297mm] rounded-sm shadow-lg skeleton" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          download ? "p-8" : "p-12"
        } shadow-lg bg-white w-[210mm] h-[297mm] print:shadow-none print:h-[297mm] print:overflow-hidden`}
      >
        <div 
          className="border-t-[10px] border-b-[10px] mb-2"
          style={{
            borderTopColor: formData?.themeColor || themeColors[0],
            borderBottomColor: formData?.themeColor || themeColors[0],
          }}
        />
        <div className="flex justify-center mb-4">
          <div className="relative w-[35px] h-[35px]">
            <Image 
              src="/icons/logo.png" 
              alt="ResumeAI Logo" 
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="h-[calc(297mm-120px)] overflow-y-auto print:overflow-hidden">
          {sections.map(
            ({ index, component, condition }) =>
              condition && (
                <div
                  key={index}
                  onClick={
                    isEditMode ? () => setActiveFormIndex(index) : undefined
                  }
                  className={interactiveClass}
                >
                  {component}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
