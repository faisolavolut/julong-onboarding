"use client";
import { getParams } from "@/lib/utils/get-params";

import { Field } from "@/lib/components/form/Field";
import { FormBetter } from "@/lib/components/form/FormBetter";
import { Alert } from "@/lib/components/ui/alert";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import { ButtonBetter, ButtonContainer } from "@/lib/components/ui/button";
import { apix } from "@/lib/utils/apix";
import { useLocal } from "@/lib/utils/use-local";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { IoMdSave } from "react-icons/io";
import { MdChecklist, MdDelete } from "react-icons/md";
import { actionToast } from "@/lib/utils/action";
import { cloneFM } from "@/lib/utils/cloneFm";
import { HiPlus } from "react-icons/hi";
import { Rating } from "@/lib/components/ui/ratings";

function Page() {
  const id = getParams("id");
  const labelPage = "Survey";
  const urlPage = `/d/survey`;
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
                    title: "Edit",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <Alert
                type={"save"}
                msg={"Are you sure you want to save this record?"}
                onClick={() => {
                  fm.submit();
                }}
              >
                <ButtonContainer className={"bg-primary"}>
                  <IoMdSave className="text-xl" />
                  Save
                </ButtonContainer>
              </Alert>

              <Alert
                type={"delete"}
                msg={"Are you sure you want to delete this record?"}
                onClick={async () => {
                  await actionToast({
                    task: async () => {
                      await apix({
                        port: "onboarding",
                        path: `/api/survey-templates/${id}`,
                        method: "delete",
                      });
                    },
                    after: () => {
                      navigate(urlPage);
                    },
                    msg_load: "Delete ",
                    msg_error: "Delete failed ",
                    msg_succes: "Delete success ",
                  });
                }}
              >
                <ButtonContainer variant={"destructive"}>
                  <MdDelete className="text-xl" />
                  Delete
                </ButtonContainer>
              </Alert>
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        let questions = fm.data?.questions || [];
        if (questions?.length) {
          questions = questions.map((e: any) => {
            delete e["attachment"];
            return {
              ...e,
              question_options: e?.question_options?.length
                ? e.question_options.map((e: any) => {
                    return {
                      option_text: e,
                    };
                  })
                : [],
            };
          });
        }
        const result = {
          ...fm.data,
          questions,
        };
        const res = await apix({
          port: "onboarding",
          value: "data.data",
          path: "/api/survey-templates/update",
          method: "put",
          data: {
            ...result,
          },
        });
      }}
      onLoad={async () => {
        const data: any = await apix({
          port: "onboarding",
          value: "data.data",
          path: `/api/survey-templates/${id}`,
          validate: "object",
        });
        const res: any = await apix({
          port: "onboarding",
          value: "data.data",
          path: "/api/answer-types",
          validate: "array",
        });
        const questions = data?.questions?.length
          ? data.questions.map((e: any) => {
              return {
                ...e,
                answer_type_name: e?.answer_type?.name,
                question_options: e?.question_options?.length
                  ? e.question_options.map((e: any) => e.option_text)
                  : [],
              };
            })
          : [];
        return {
          ...data,
          survey_template_id: data?.id,
          questions,
          list_answer_type: res,
          employees: data?.event_employees?.length
            ? data.event_employees.map((e: any) => {
                return {
                  ...e,
                  check: true,
                  id_event_employee: e?.id,
                  id: e?.employee_id,
                  name: e?.employee_name,
                };
              })
            : [],
        };
      }}
      showResize={false}
      header={(fm: any) => {
        return <></>;
      }}
      children={(fm: any) => {
        return (
          <>
            <div className={"flex flex-col flex-wrap px-4 py-2 relative"}>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                <div>
                  <Field
                    fm={fm}
                    name={"title"}
                    label={"Title"}
                    type={"text"}
                    required={true}
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
                  Add Question
                </div>
                <div className="flex flex-row flex-grow items-center justify-end gap-x-2">
                  <ButtonBetter
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      const data = fm?.data?.questions || [];
                      const answerType = fm?.data?.list_answer_type || [];
                      const findDefaultType = answerType.find(
                        (e: any) => e?.name === "Short Answer"
                      );
                      data.push(
                        findDefaultType
                          ? {
                              answer_type_id: findDefaultType?.id,
                              answer_types: findDefaultType,
                              answer_type_name: "Short Answer",
                              answer_type: findDefaultType,
                              max_stars: 5,
                            }
                          : {}
                      );
                      fm.data.questions = data;
                      fm.render();
                      console.log(fm.data.questions);
                    }}
                  >
                    <HiPlus className="text-xl" />
                    Add More
                  </ButtonBetter>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 pt-2">
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
                                <Field
                                  style="underline"
                                  fm={fm_row}
                                  name={"question"}
                                  label={"Recommend by"}
                                  type={"text"}
                                  hidden_label={true}
                                  placeholder="Title Question"
                                />
                              </div>
                              <div className="flex flex-col w-[200px]">
                                <Field
                                  fm={fm_row}
                                  target={"answer_type_id"}
                                  name="answer_type"
                                  label={"Answer Type"}
                                  type={"dropdown-async"}
                                  hidden_label={true}
                                  pagination={false}
                                  search={"local"}
                                  onChange={(item: any) => {
                                    if (
                                      ![
                                        "multiple choice",
                                        "checkbox",
                                        "dropdown",
                                        "single checkbox",
                                      ].includes(typeAnswer) &&
                                      ![
                                        "multiple choice",
                                        "checkbox",
                                        "dropdown",
                                        "single checkbox",
                                      ].includes(item?.name?.toLowerCase())
                                    ) {
                                      fm_row.data.question_options = [];
                                    } else if (
                                      item?.name?.toLowerCase() === "rating"
                                    ) {
                                      fm_row.data.rating = 5;
                                    }
                                    fm_row.data.answer_type_name = item?.name;
                                    fm_row.render();
                                    fm.render();
                                  }}
                                  onLoad={async () => {
                                    return fm.data?.list_answer_type || [];
                                  }}
                                  onLabel={"name"}
                                  onValue={"id"}
                                />
                              </div>

                              <div className="">
                                <ButtonBetter
                                  variant="destructive"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    const data: any[] =
                                      fm?.data?.questions || [];
                                    fm.data.questions = data.filter(
                                      (_, i) => i !== idx
                                    );
                                    const delete_id =
                                      fm.data.deleted_question_ids || [];
                                    if (e?.id) {
                                      delete_id.push(e?.id);
                                      fm.data.deleted_question_ids = delete_id;
                                    }
                                    fm.render();
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={25}
                                    height={25}
                                    viewBox="0 0 24 24"
                                  >
                                    <g fill="none">
                                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                      <path
                                        fill="currentColor"
                                        d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                                      ></path>
                                    </g>
                                  </svg>
                                </ButtonBetter>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-1">
                              {[
                                "multiple choice",
                                "checkbox",
                                "dropdown",
                                "single checkbox",
                              ].includes(
                                typeof fm_row?.data?.answer_type_name ===
                                  "string"
                                  ? fm_row?.data?.answer_type_name.toLowerCase()
                                  : null
                              ) && (
                                <div>
                                  <Field
                                    fm={fm_row}
                                    style="underline"
                                    hidden_label={true}
                                    name={"question_options"}
                                    label={"Option"}
                                    type={"tag"}
                                    mode={"object"}
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
                              )}
                              {["rating"].includes(typeAnswer) && (
                                <>
                                  <div className="col-span-2 flex flex-wrap">
                                    <div>
                                      <Field
                                        fm={fm_row}
                                        style="underline"
                                        hidden_label={true}
                                        name={"max_stars"}
                                        type={"money"}
                                        onChange={() => {
                                          if (fm_row?.data?.max_stars > 20) {
                                            fm_row.data.max_stars = 20;
                                          }
                                          fm.render();
                                        }}
                                        placeholder="Your Rating (Star)"
                                      />
                                    </div>
                                    <div className="flex flex-row items-center">
                                      <Rating
                                        rating={0}
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

export default Page;
