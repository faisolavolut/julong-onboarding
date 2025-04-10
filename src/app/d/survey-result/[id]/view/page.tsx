"use client";
import { getParams } from "@/lib/utils/get-params";

import { Field } from "@/lib/components/form/Field";
import { FormBetter } from "@/lib/components/form/FormBetter";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import { useLocal } from "@/lib/utils/use-local";
import { notFound } from "next/navigation";
import { FC, useEffect } from "react";
import { getNumber } from "@/lib/utils/getNumber";
import { cloneFM } from "@/lib/utils/cloneFm";
import { MdChecklist } from "react-icons/md";
import { Rating } from "@/lib/components/ui/ratings";
import { ExternalLink } from "lucide-react";
import { RiDownloadCloudLine } from "react-icons/ri";
import { ButtonBetter } from "@/lib/components/ui/button";
import { actionToast } from "@/lib/utils/action";
import { apix } from "@/lib/utils/apix";

function Page() {
  const id = getParams("id");
  const labelPage = "Survey Result";
  const urlPage = `/d/survey-result`;
  const local = useLocal({
    can_edit: false,
    ready: false as boolean,
  });

  useEffect(() => {
    const run = async () => {
      local.can_edit = true;
      local.ready = true;
      local.render();
    };
    run();
  }, []);

  if (local.ready && !local.can_edit) return notFound();

  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col py-4 pt-0 pb-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900">
                <span className="">{labelPage}</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: `List ${labelPage}`,
                    url: urlPage,
                  },
                  {
                    title: "View",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <ButtonBetter
                className="bg-primary"
                onClick={async () => {
                  await actionToast({
                    task: async () => {
                      // const res = await apix({
                      //   port: "recruitment",
                      //   method: "get",
                      //   value: "data",
                      //   options: {
                      //     responseType: "blob",
                      //     headers: {
                      //       Accept:
                      //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Memastikan format yang benar
                      //     },
                      //   },
                      //   path: `/api/applicants/job-posting/${id_posting}/export`,
                      // });
                      // const url = window.URL.createObjectURL(new Blob([res]));
                      // const link = document.createElement("a");
                      // link.href = url;
                      // link.setAttribute("download", "export-applicant.xlsx");
                      // document.body.appendChild(link);
                      // link.click();
                    },
                    msg_load: "Download Survey Result",
                    msg_error: "Download Survey Result Failed",
                    msg_succes: "Download Survey Result Success",
                  });
                }}
              >
                <div className="flex items-center gap-x-0.5">
                  <RiDownloadCloudLine className="text-xl" />
                  <span className="capitalize">Export</span>
                </div>
              </ButtonBetter>
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {}}
      mode="view"
      onLoad={async () => {
        const data: any = await apix({
          port: "onboarding",
          value: "data.data",
          path: `/api/employee-tasks/response/${id}`,
          validate: "object",
        });
        const response = {
          id: data.id,
          employee_name: data?.employee_name,
          survey_template: data?.survey_template,
          survey_template_name: data?.survey_template?.title,
          questions: data?.survey_template?.questions?.length
            ? data?.survey_template?.questions.map((e: any) => {
                const questionType = e.answer_type?.name || "";
                const answer = [
                  "multiple choice",
                  "checkbox",
                  "single checkbox",
                  "link",
                ].includes(questionType?.toLowerCase())
                  ? e.survey_responses?.map((eo: any) => eo?.answer || "")
                  : ["attachment"].includes(questionType?.toLowerCase())
                  ? e.survey_responses?.map((eo: any) => {
                      return {
                        path: eo?.answer_file || "",
                      };
                    })
                  : ["rating"].includes(questionType?.toLowerCase())
                  ? getNumber(e.survey_responses?.[0]?.answer || 0)
                  : e.survey_responses?.[0]?.answer || "";
                return {
                  ...e,
                  answer_type_name: questionType?.toLowerCase(),
                  question_options: e.question_options?.length
                    ? e.question_options.map((eo: any) => eo?.option_text || "")
                    : [],
                  answer,
                };
              })
            : [],
        };
        console.log(response);
        return response;
      }}
      showResize={false}
      header={(fm: any) => {
        return <></>;
      }}
      children={(fm: any) => {
        return (
          <>
            <div className={"flex flex-col flex-wrap px-4 py-2"}>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                <div>
                  <Field
                    fm={fm}
                    name={"survey_template_name"}
                    label={"Survey"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"employee_name"}
                    label={"Employee"}
                    type={"text"}
                  />
                </div>
              </div>
              <div
                className={cx(
                  "w-full flex flex-row border-b border-gray-300 py-1 sticky top-0 bg-white z-10"
                )}
              >
                <div className="flex flex-row items-center gap-x-2 font-bold text-md">
                  <MdChecklist className="text-xl" />
                  Survey Answer
                </div>
                <div className="flex flex-row flex-grow items-center justify-end gap-x-2"></div>
              </div>
              <div
                className={cx(
                  "flex flex-col gap-y-2 pt-2",
                  css`
                    .is_disable {
                      background-color: transparent !important;
                    }
                  `
                )}
              >
                {fm?.data?.questions?.length ? (
                  <>
                    <div className={cx("w-full flex flex-col gap-y-2 ")}>
                      {fm?.data?.questions.map((e: any, idx: number) => {
                        let fm_row = cloneFM(fm, e);
                        const typeAnswer =
                          typeof fm_row?.data?.answer_type_name === "string"
                            ? fm_row?.data?.answer_type_name.toLowerCase()
                            : null;
                        return (
                          <div
                            className="max-w-full shadow-md p-2 rounded-md border border-gray-200"
                            key={`question_${idx}`}
                          >
                            <div className="flex flex-row items-center gap-x-2 w-full">
                              <div className="flex flex-col flex-grow">
                                <div>{fm_row?.data?.question}</div>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-1">
                              {[
                                "multiple choice",
                                "checkbox",
                                "single checkbox",
                              ].includes(
                                typeof fm_row?.data?.answer_type_name ===
                                  "string"
                                  ? fm_row?.data?.answer_type_name.toLowerCase()
                                  : null
                              ) ? (
                                <div>
                                  <Field
                                    fm={fm_row}
                                    style="underline"
                                    hidden_label={true}
                                    name={"question_options"}
                                    label={"Option"}
                                    type={"tag"}
                                    mode={"object"}
                                    valueChecked={fm_row?.data?.answer}
                                    styleField={
                                      ["checkbox", "single checkbox"].includes(
                                        typeAnswer
                                      )
                                        ? "checkbox"
                                        : ["dropdown"].includes(typeAnswer)
                                        ? "order"
                                        : ["multiple choice"].includes(
                                            typeAnswer
                                          )
                                        ? "radio"
                                        : null
                                    }
                                  />
                                </div>
                              ) : ["dropdown"].includes(
                                  fm_row?.data?.answer_type_name
                                ) ? (
                                <div>
                                  <Field
                                    fm={fm_row}
                                    name={"answer"}
                                    style="underline"
                                    label={"Survey"}
                                    hidden_label={true}
                                    type={"text"}
                                  />
                                </div>
                              ) : ["rating"].includes(typeAnswer) ? (
                                <>
                                  <div className="col-span-2 flex flex-wrap">
                                    <div className="flex flex-row items-center py-2 px-1">
                                      <Rating
                                        rating={fm_row?.data?.answer || 0}
                                        totalStars={fm_row?.data?.max_stars}
                                        size={24}
                                        variant="yellow"
                                        disabled={true}
                                        className="flex flex-col"
                                        showText={false}
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : ["attachment"].includes(typeAnswer) ? (
                                <>
                                  <div className="col-span-2 flex flex-wrap">
                                    <div className="flex flex-row items-center py-2 px-1">
                                      <Field
                                        fm={fm_row}
                                        hidden_label={true}
                                        name={"answer"}
                                        label={"Description"}
                                        type={"multi-upload"}
                                        valueKey={"path"}
                                        onDelete={async (item) => {}}
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : ["link"].includes(typeAnswer) ? (
                                <>
                                  <div className="col-span-2 flex flex-wrap">
                                    <div className="flex flex-col items-center py-2 px-1">
                                      {fm_row?.data?.answer?.length ? (
                                        <ListLink url={fm_row?.data?.answer} />
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <Field
                                    fm={fm_row}
                                    name={"answer"}
                                    style="underline"
                                    label={"Survey"}
                                    hidden_label={true}
                                    type={"text"}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        );
      }}
    />
  );
}

const ListLink: FC<any> = ({ url }) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      {url && url.length ? (
        url.map((e: any, idx: number) => {
          return (
            <div
              key={"link_" + idx}
              className={cx(
                "flex  rounded items-center px-1   cursor-pointer flex-grow hover:bg-gray-100 gap-x-1 justify-between",
                "pr-2",
                css`
                  &:hover {
                    // border: 1px solid #1c4ed8;
                    // outline: 1px solid #1c4ed8;
                  }
                  &:hover {
                    // border-bottom: 1px solid #1c4ed8;
                    // outline: 1px solid #1c4ed8;
                  }
                `
              )}
              onClick={() => {
                window.open(e, "_blank");
              }}
            >
              <div className="flex flex-row gap-x-1 items-center">
                <div className="text-xs filename line-clamp-1 break-all">
                  {e}
                </div>
              </div>

              <div className="ml-2">
                <ExternalLink size="12px" />
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
