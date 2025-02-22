"use client";
import { getParams } from "@/lib/utils/get-params";

import { ButtonBetter } from "@/lib/components/ui/button";
import { apix } from "@/lib/utils/apix";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";

import FlowbiteFooterSection from "@/app/components/flowbite-footer";
import DefaultHeaderNavigation from "@/app/components/navbarHeader";
import { siteurl } from "@/lib/utils/siteurl";
import get from "lodash.get";
import {
  convertToTimeOnly,
  formatMoney,
} from "@/lib/components/form/field/TypeInput";
import { getNumber } from "@/lib/utils/getNumber";
import { actionToast } from "@/lib/utils/action";
import Stepper from "@/app/components/Stepper";
import { LuPartyPopper } from "react-icons/lu";
import { Field } from "@/lib/components/form/Field";
import { Form } from "@/lib/components/form/Form";
import { notFound } from "next/navigation";
import { labelDocumentType } from "@/lib/utils/document_type";
import { dayDate, formatTime } from "@/lib/utils/date";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { GoClock } from "react-icons/go";
import { IoLinkOutline } from "react-icons/io5";

function Page() {
  const id = getParams("id"); // Replace this with dynamic id retrieval
  const local = useLocal({
    open: false,
    ready: false,
    access: true,
    jobs: [] as any[],
    data: null as any,
    applied: false,
    profile: {} as any,
    line: [] as any,
    steps: [] as any[],
    step: 0,
    stepName: null as any,
    detail: null as any,
  });

  useEffect(() => {
    const run = async () => {
      const data: any = await apix({
        port: "recruitment",
        value: "data.data",
        path: `/api/job-postings/${id}`,
        validate: "object",
      });
      const id_project = data?.project_recruitment_header_id;
      const res: any = await apix({
        port: "recruitment",
        value: "data.data",
        validate: "array",
        path: "/api/project-recruitment-lines/header/" + id_project,
      });
      console.log({ res });

      let now = 0 as number;
      try {
        const profile: any = await apix({
          port: "recruitment",
          value: "data.data",
          path: `/api/applicants/me/${id}`,
          validate: "object",
        });
        local.step = profile?.order;
        local.profile = profile;
        now = profile?.order;
      } catch (ex) {
        local.profile = null;
      }
      local.render();
      let steps = res.map((e: any) => {
        return {
          id: e?.order,
          label: labelDocumentType(e?.template_activity_line?.name),
          name: e?.template_activity_line?.name,
          id_line: e?.id,
        };
      });
      if (steps?.length) {
        steps.push({
          id: steps?.length + 1,
          label: "Final Result",
          name: "final_result",
        });
      }
      const stepNow = steps.find((e: any) => e?.id === now);
      const stepName = stepNow?.name;
      if (stepName === "TEST") {
        const test = await apix({
          port: "recruitment",
          value: "data.data",
          path: `/api/test-schedule-headers/my-schedule?job_posting_id=${id}&project_recruitment_line_id=${stepNow?.id_line}
`,
          validate: "object",
        });
        let url = test.link;
        const regex = /form\/[a-f0-9-]+/;
        const isMatch = regex.test(url);
        if (isMatch) {
          url = `${url}/${stepNow?.id_line}/${id}/form`;
        }
        let detail = {
          ...test,
          url: url,
          start_time: convertToTimeOnly(test?.start_time),
          end_time: convertToTimeOnly(test?.end_date),
        };
        console.log({ detail });
        local.detail = detail;
      }

      local.stepName = stepName;
      local.steps = steps;
      local.data = data;
      local.applied = data?.is_applied;
      local.ready = true;
      local.render();
    };
    run();
  }, []);
  if (!local.profile) notFound();
  return (
    <div className="flex flex-col max-w-screen bg-white min-h-screen">
      <DefaultHeaderNavigation />
      <div className="relative flex flex-col flex-grow">
        {local.ready ? (
          <div className="flex flex-col justify-center items-center">
            <div className="flex-grow flex w-full flex-col max-w-screen-xl">
              <div className="flex-grow flex flex-col ">
                <div
                  className={cx(
                    "bg-gradient-to-r from-blue-500 to-blue-700 p-6  flex items-center space-x-4 shadow-lg bg-no-repeat bg-cover	bg-center	",
                    css`
                      background-image: url("${siteurl("/frame.jpg")}");
                    `
                  )}
                >
                  <div className="flex flex-col px-10 gap-x-4">
                    <div className="w-16 h-16">
                      <img
                        src={siteurl("/dog.jpg")}
                        alt="John Cena"
                        className="rounded-full w-full h-full object-cover border-2 border-white"
                      />
                    </div>
                    <div className="text-black">
                      <p className="flex items-center font-bold text-3xl	 flex-row gap-x-2">
                        {get(local, "data.job_name")}
                      </p>
                      <div className="h-0.5 w-full bg-black rounded-full"></div>
                      <p className="text-sm flex items-center flex-row gap-x-2">
                        {get(local, "data.for_organization_name")}
                      </p>
                    </div>
                  </div>
                  <div className="flex-grow"></div>
                  <div className="flex flex-col px-10 gap-x-4 gap-y-2">
                    {local.applied ? (
                      <ButtonBetter className="bg-second text-black hover:bg-second">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19 6.5h-3v-1a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3m-9-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.05h3v1.05a1 1 0 0 0 2 0v-1.05h6v1.05a1 1 0 0 0 2 0v-1.05h3Zm0-7H4v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
                          ></path>
                        </svg>
                        View Detail
                      </ButtonBetter>
                    ) : (
                      <ButtonBetter
                        className="bg-second text-black hover:bg-second"
                        onClick={async () => {
                          await actionToast({
                            task: async () => {
                              await apix({
                                port: "recruitment",
                                path: `/api/applicants/apply?job_posting_id=${id}`,
                                method: "get",
                              });
                            },
                            after: () => {
                              local.applied = true;
                              local.render();
                            },
                            msg_load: "Apply Position ",
                            msg_error: "Apply Position failed ",
                            msg_succes: "Apply Position success ",
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19 6.5h-3v-1a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3m-9-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.05h3v1.05a1 1 0 0 0 2 0v-1.05h6v1.05a1 1 0 0 0 2 0v-1.05h3Zm0-7H4v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
                          ></path>
                        </svg>
                        Apply for this position
                      </ButtonBetter>
                    )}
                    <div className="flex flex-row">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md max-w-md mx-auto">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Salary (Rupiah)
                          </h3>
                          <p className="text-lg font-semibold text-green-600">
                            Rp
                            {formatMoney(
                              getNumber(get(local, "data.salary_min"))
                            )}{" "}
                            - Rp
                            {formatMoney(
                              getNumber(get(local, "data.salary_max"))
                            )}
                          </p>
                          <p className="text-xs text-gray-400">
                            Monthly salary
                          </p>
                        </div>
                        <div className="border-l border-gray-300 h-full mx-4"></div>
                        <div className="text-center">
                          <div className="flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={25}
                              height={25}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="m15 19.923l-6-2.1l-3.958 1.53q-.384.143-.713-.083T4 18.634V6.404q0-.268.13-.489t.378-.307L9 4.077l6 2.1l3.958-1.53q.384-.143.713.054t.329.588v12.384q0 .287-.159.498q-.158.212-.426.298zm-.5-1.22v-11.7l-5-1.745v11.7zm1 0L19 17.55V5.7l-3.5 1.304zM5 18.3l3.5-1.342v-11.7L5 6.45zM15.5 7.004v11.7zm-7-1.746v11.7z"
                              ></path>
                            </svg>
                          </div>
                          <h3 className="text-sm font-medium text-gray-500 mt-1">
                            Job Location
                          </h3>
                          <p className="text-lg font-semibold text-gray-800">
                            {get(local, "data.for_organization_location")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-x-4 p-8">
                  <div
                    className={cx(
                      "grid grid-cols-3 gap-x-4 flex-grow",
                      css`
                        .tiptap h1 {
                          font-size: 1.4rem !important;
                        }

                        .tiptap h2 {
                          font-size: 1.2rem !important;
                        }

                        .tiptap h3 {
                          font-size: 1.1rem !important;
                        }
                        .ProseMirror {
                          outline: none !important;
                          padding: 10px 2rem 10px 2rem;
                        }
                        .tiptap a {
                          font-weight: bold;
                          color: #313678;
                          text-decoration: underline;
                        }
                        .ProseMirror ul,
                        ol {
                          padding: 0 1rem;
                          margin: 1.25rem 1rem 1.25rem 0.4rem;
                        }
                        .ProseMirror ol {
                          list-style-type: decimal;
                        }
                        .ProseMirror ul {
                          list-style-type: disc;
                        }
                      `
                    )}
                  >
                    <div className="col-span-3 flex flex-col gap-y-4">
                      <div className="border border-gray-200 flex flex-col py-4 rounded-lg">
                        <div className="font-bold flex flex-col border-b border-gray-200 px-4 mx-4 py-2">
                          Activity Details
                        </div>
                        <div className="flex flex-col flex-grow py-4">
                          <Stepper steps={local.steps} step={local.step} />
                        </div>
                      </div>
                      {local.stepName === "ADMINISTRATIVE_SELECTION" ? (
                        <div className="border border-gray-200 flex flex-col py-4 rounded-lg">
                          <div className=" flex flex-row items-center  justify-center text-md gap-x-2 px-4 mx-4 py-2">
                            Thank you for submitting your application. We are
                            pleased to inform you that your CV is currently
                            under review by our HR team.
                          </div>
                        </div>
                      ) : local.stepName === "TEST" ? (
                        <div className="border border-gray-200 flex flex-col py-4 rounded-lg">
                          <div className="font-bold flex flex-row items-center text-lg gap-x-2 border-b border-gray-200 px-4 mx-4 py-2">
                            Congratulations{" "}
                            <LuPartyPopper className="text-pink-500" />
                          </div>
                          <div className=" flex flex-row items-center text-md gap-x-2 px-4 mx-4 py-2">
                            You've Passed to the Next Stage! Please stay tuned
                            and check your email regularly for updates.
                          </div>
                          <div className="flex flex-col flex-grow py-4 pt-0 px-8">
                            <p className="font-bold">Schedule Test:</p>
                            <p className=" flex flex-row gap-x-2 items-center">
                              <RiCalendarScheduleLine />
                              {dayDate(get(local, "detail.start_date")) ===
                              dayDate(get(local, "detail.end_date"))
                                ? dayDate(get(local, "detail.start_date"))
                                : `${dayDate(
                                    get(local, "detail.start_date")
                                  )} - ${dayDate(
                                    get(local, "detail.end_date")
                                  )}`}
                            </p>
                            <p className=" flex flex-row gap-x-2 items-center">
                              <GoClock />
                              {`${get(local, "detail.start_time")} - ${get(
                                local,
                                "detail.end_time"
                              )}`}
                            </p>
                            <p className=" flex flex-row gap-x-2 items-center">
                              <IoLinkOutline />
                              <a
                                target="_blank"
                                className="text-primary underline"
                                href={get(local, "detail.url")}
                              >
                                Link Test
                              </a>
                            </p>
                          </div>
                        </div>
                      ) : local.stepName === "INTERVIEW" ? (
                        <div className="border border-gray-200 flex flex-col py-4 rounded-lg">
                          <div className="font-bold flex flex-row items-center text-lg gap-x-2 border-b border-gray-200 px-4 mx-4 py-2">
                            Congratulations{" "}
                            <LuPartyPopper className="text-pink-500" />
                          </div>
                          <div className=" flex flex-row items-center text-md gap-x-2 px-4 mx-4 py-2">
                            You've Passed to the Next Stage! Please stay tuned
                            and check your email regularly for updates.
                          </div>
                          <div className="flex flex-col flex-grow py-4 pt-0 px-8">
                            <p className="font-bold">Schedule Interview:</p>
                            <p className=" flex flex-row gap-x-2 items-center">
                              <RiCalendarScheduleLine />
                              {dayDate(new Date()) === dayDate(new Date())
                                ? dayDate(new Date())
                                : `${dayDate(new Date())} - ${dayDate(
                                    new Date()
                                  )}`}
                            </p>
                            <p className=" flex flex-row gap-x-2 items-center">
                              <GoClock />
                              {`${formatTime(new Date())} - ${formatTime(
                                new Date()
                              )}`}
                            </p>
                            <p className=" flex flex-row gap-x-2 items-center">
                              <IoLinkOutline />
                              <a
                                className="text-primary cursor-pointer underline"
                                target="_blank"
                                href={"https://meet.google.com/jrb-mxxj-yda"}
                              >
                                link meet
                              </a>
                            </p>
                          </div>
                        </div>
                      ) : local.stepName === "OFFERING_LETTER" ? (
                        <div className="border border-gray-200 flex flex-col py-4 rounded-lg">
                          <div className="font-bold flex flex-row items-center text-lg gap-x-2 border-b border-gray-200 px-4 mx-4 py-2">
                            Congratulations Your Offer Letter is Ready!{" "}
                            <LuPartyPopper className="text-pink-500" />
                          </div>
                          <div className=" flex flex-row items-center text-md gap-x-2 px-4 mx-4 py-2">
                            We are thrilled to inform you that you have
                            successfully completed the recruitment process, and
                            your offer letter has been prepared.
                          </div>
                          <div className="flex flex-col flex-grow py-4 pt-0 px-8">
                            <Form
                              onSubmit={async (fm: any) => {}}
                              onLoad={async () => {
                                return {
                                  employee_contract:
                                    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/Contract.pdf",
                                };
                              }}
                              showResize={false}
                              header={(fm: any) => {
                                return <></>;
                              }}
                              children={(fm: any) => {
                                return (
                                  <>
                                    <div
                                      className={cx(
                                        "flex flex-row flex-wrap py-2"
                                      )}
                                    >
                                      <div className="flex-grow grid gap-4 grid-cols-1">
                                        <div>
                                          <div className="flex">
                                            <Field
                                              fm={fm}
                                              classField={""}
                                              name={"employee_contract"}
                                              label={
                                                "Upload the signed offer letter in PDF format."
                                              }
                                              disabled={true}
                                              type={"upload"}
                                              required={true}
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <div className="flex">
                                            <Field
                                              fm={fm}
                                              hidden_label={true}
                                              classField={""}
                                              name={"contract"}
                                              label={
                                                "Upload the signed offer letter in PDF format."
                                              }
                                              type={"upload"}
                                            />
                                          </div>
                                        </div>
                                        <div className="flex flex-row items-center">
                                          <ButtonBetter className=" px-6">
                                            Submit
                                          </ButtonBetter>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              }}
                            />
                          </div>
                        </div>
                      ) : local.stepName === "CONTRACT_DOCUMENT" ? (
                        <div className="border border-gray-200 flex flex-col py-4 rounded-lg">
                          <div className="font-bold flex flex-row items-center text-lg gap-x-2 border-b border-gray-200 px-4 mx-4 py-2">
                            Congratulations{" "}
                            <LuPartyPopper className="text-pink-500" />
                          </div>
                          <div className=" flex flex-row items-center text-md gap-x-2 px-4 mx-4 py-2">
                            Your Contract is Ready! We are pleased to inform you
                            that you have successfully completed the necessary
                            steps, and your job contract is now ready.
                          </div>
                          <div className="flex flex-col flex-grow py-4 pt-0 px-8">
                            <Form
                              onSubmit={async (fm: any) => {}}
                              onLoad={async () => {
                                return {
                                  employee_contract:
                                    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/Contract.pdf",
                                };
                              }}
                              showResize={false}
                              header={(fm: any) => {
                                return <></>;
                              }}
                              children={(fm: any) => {
                                return (
                                  <>
                                    <div
                                      className={cx(
                                        "flex flex-row flex-wrap py-2"
                                      )}
                                    >
                                      <div className="flex-grow grid gap-4 grid-cols-1">
                                        <div>
                                          <div className="flex">
                                            <Field
                                              fm={fm}
                                              classField={""}
                                              name={"employee_contract"}
                                              label={
                                                "Upload the signed offer letter in PDF format."
                                              }
                                              disabled={true}
                                              type={"upload"}
                                              required={true}
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <div className="flex">
                                            <Field
                                              fm={fm}
                                              hidden_label={true}
                                              classField={""}
                                              name={"contract"}
                                              label={
                                                "Upload the signed offer letter in PDF format."
                                              }
                                              type={"upload"}
                                            />
                                          </div>
                                        </div>
                                        <div className="flex flex-row items-center">
                                          <ButtonBetter className=" px-6">
                                            Submit
                                          </ButtonBetter>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              }}
                            />
                          </div>
                        </div>
                      ) : local.stepName === "final_result" ? (
                        <div className="border border-gray-200 flex flex-col py-4 rounded-lg">
                          <div className="font-bold flex flex-row items-center text-lg gap-x-2 border-b border-gray-200 px-4 mx-4 py-2">
                            Congratulations{" "}
                            <LuPartyPopper className="text-pink-500" />
                          </div>
                          <div className=" flex flex-row items-center text-md gap-x-2 px-4 mx-4 py-2">
                            Congratulations on becoming a part of{" "}
                            {get(local, "data.for_organization_name")}! As part
                            of the new employee verification process, we kindly
                            request you to submit the following documents:
                          </div>
                          <div className="flex flex-col flex-grow py-4 pt-0 px-8">
                            <Form
                              onSubmit={async (fm: any) => {}}
                              onLoad={async () => {
                                return {
                                  employee_contract:
                                    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/Contract.pdf",
                                };
                              }}
                              showResize={false}
                              header={(fm: any) => {
                                return <></>;
                              }}
                              children={(fm: any) => {
                                return (
                                  <>
                                    <div
                                      className={cx(
                                        "flex flex-row flex-wrap py-2"
                                      )}
                                    >
                                      <div className="flex-grow grid gap-4 grid-cols-1 md:grid-cols-2">
                                        <div>
                                          <Field
                                            fm={fm}
                                            name={"ktp"}
                                            label={"KTP"}
                                            type={"upload"}
                                          />
                                        </div>
                                        <div>
                                          <Field
                                            fm={fm}
                                            name={"kartu_keluarga"}
                                            label={"Kartu Keluarga"}
                                            type={"upload"}
                                          />
                                        </div>
                                        <div>
                                          <Field
                                            fm={fm}
                                            name={"ijazah"}
                                            label={"Ijazah"}
                                            type={"upload"}
                                          />
                                        </div>
                                        <div>
                                          <Field
                                            fm={fm}
                                            name={"kartu_bpjs"}
                                            label={"Kartu BPJS"}
                                            type={"upload"}
                                          />
                                        </div>
                                        <div>
                                          <Field
                                            fm={fm}
                                            name={"surat_keterangan_kerja"}
                                            label={"Surat Keterangan Kerja"}
                                            type={"upload"}
                                          />
                                        </div>
                                        <div>
                                          <Field
                                            fm={fm}
                                            name={"surat_keterangan_kesehatan"}
                                            label={"Surat Keterangan Kesehatan"}
                                            type={"upload"}
                                          />
                                        </div>
                                        <div>
                                          <Field
                                            fm={fm}
                                            name={"skck"}
                                            label={"SKCK"}
                                            type={"upload"}
                                          />
                                        </div>
                                        <div>
                                          <Field
                                            fm={fm}
                                            name={"npwp"}
                                            label={"NPWP"}
                                            type={"upload"}
                                          />
                                        </div>
                                        <div className="flex flex-row items-center">
                                          <ButtonBetter className=" px-6">
                                            Submit
                                          </ButtonBetter>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-grow">
            <div className="h-screen w-full flex flex-row items-center justify-center">
              <div className="spinner-better"></div>
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <FlowbiteFooterSection />
        </div>
      </div>
    </div>
  );
}

export default Page;
