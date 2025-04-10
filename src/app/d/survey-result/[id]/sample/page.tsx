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
        const data: any = {
          id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
          cover_path:
            "http://localhost:8001/storage/covers/1739949078745508000_template-1.png",
          cover_path_origin:
            "storage/covers/1739949078745508000_template-1.png",
          employee_id: "858451f3-ac12-4a5c-be9f-411765b70802",
          template_task_id: null,
          survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
          verified_by: null,
          name: "Test Update",
          priority: "HIGH",
          description: "Mwehehe",
          start_date: "2025-02-19T00:00:00Z",
          end_date: "2025-02-25T00:00:00Z",
          is_done: "YES",
          proof:
            "http://localhost:8001/storage/covers/1739956792926352000_david_gadgetin.png",
          status: "ACTIVE",
          kanban: "IN_PROGRESS",
          notes: "",
          source: "ONBOARDING",
          is_checklist: "YES",
          progress: 100,
          progress_verified: 100,
          midsuit_id: null,
          created_at: "2025-02-19T16:00:40.557558+07:00",
          updated_at: "2025-02-28T10:44:29.911349+07:00",
          verified_by_name: "",
          employee_name: "Employee Admin",
          template_task: null,
          employee_task_attachments: [],
          employee_task_checklists: [],
          survey_template: {
            id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
            survey_number: "SURVEY-00004",
            title: "Survey Kesejahteraan Karyawan",
            status: "DRAFT",
            created_at: "2025-04-09T14:52:03.525103+07:00",
            updated_at: "2025-04-09T14:59:17.788375+07:00",
            questions: [
              {
                id: "f2e7f8c9-547c-419c-8417-fb61794ba5f1",
                survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                answer_type_id: "90b0ae9c-c360-4c8c-bfb6-4b5b89868f90",
                question: "Nama elo",
                attachment: "http://localhost:8001/",
                is_completed: "",
                number: 1,
                max_stars: 5,
                created_at: "2025-04-09T14:58:36.665745+07:00",
                updated_at: "2025-04-09T14:59:17.795743+07:00",
                answer_type: {
                  id: "90b0ae9c-c360-4c8c-bfb6-4b5b89868f90",
                  name: "Short Answer",
                  created_at: "2025-03-20T10:49:27.640058+07:00",
                  updated_at: "2025-03-20T10:49:27.640058+07:00",
                },
                question_options: null,
                survey_responses: [
                  {
                    id: "87342305-dd12-434b-a500-277fb4a130ae",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "f2e7f8c9-547c-419c-8417-fb61794ba5f1",
                    answer: "Nama lu siapa wok",
                    answer_file: "http://localhost:8001/",
                    created_at: "2025-04-09T15:21:03.419478+07:00",
                    updated_at: "2025-04-09T15:21:03.419478+07:00",
                  },
                ],
              },
              {
                id: "96cf2845-7c49-4f1c-871a-dea2d9e3b860",
                survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                answer_type_id: "833576c9-e2a2-4d7b-b275-c1577f27ce1c",
                question: "Deskripsi Elo",
                attachment: "http://localhost:8001/",
                is_completed: "",
                number: 2,
                max_stars: 5,
                created_at: "2025-04-09T14:58:36.668667+07:00",
                updated_at: "2025-04-09T14:59:17.79863+07:00",
                answer_type: {
                  id: "833576c9-e2a2-4d7b-b275-c1577f27ce1c",
                  name: "Long Answer",
                  created_at: "2025-03-20T10:49:27.737008+07:00",
                  updated_at: "2025-03-20T10:49:27.737008+07:00",
                },
                question_options: null,
                survey_responses: [
                  {
                    id: "87342305-dd12-434b-a500-277fb4a130ae",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "f2e7f8c9-547c-419c-8417-fb61794ba5f1",
                    answer: "ALOHHAAAAA",
                    answer_file: "http://localhost:8001/",
                    created_at: "2025-04-09T15:21:03.419478+07:00",
                    updated_at: "2025-04-09T15:21:03.419478+07:00",
                  },
                ],
              },
              {
                id: "447332b1-4e5c-4edf-bcbe-b6914e96209b",
                survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                answer_type_id: "f53b7d8b-2208-4808-bafc-9fa6ebf92b78",
                question: "Gender",
                attachment: "http://localhost:8001/",
                is_completed: "",
                number: 3,
                max_stars: 5,
                created_at: "2025-04-09T14:58:36.670525+07:00",
                updated_at: "2025-04-09T14:59:17.801182+07:00",
                answer_type: {
                  id: "f53b7d8b-2208-4808-bafc-9fa6ebf92b78",
                  name: "Multiple Choice",
                  created_at: "2025-03-20T10:49:27.50465+07:00",
                  updated_at: "2025-03-20T10:49:27.50465+07:00",
                },
                question_options: [
                  {
                    id: "9874eb6b-16f9-4a31-9042-5f95a2eed7a8",
                    question_id: "447332b1-4e5c-4edf-bcbe-b6914e96209b",
                    option_text: "Laki",
                    created_at: "2025-04-09T14:59:17.803393+07:00",
                    updated_at: "2025-04-09T14:59:17.803393+07:00",
                  },
                  {
                    id: "a99a4121-1ef2-4b6f-88c5-e12d2b64cb4a",
                    question_id: "447332b1-4e5c-4edf-bcbe-b6914e96209b",
                    option_text: "Perempuan",
                    created_at: "2025-04-09T14:59:17.804689+07:00",
                    updated_at: "2025-04-09T14:59:17.804689+07:00",
                  },
                ],
                survey_responses: [
                  {
                    id: "87342305-dd12-434b-a500-277fb4a130ae",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "f2e7f8c9-547c-419c-8417-fb61794ba5f1",
                    answer: "Laki",
                    answer_file: "http://localhost:8001/",
                    created_at: "2025-04-09T15:21:03.419478+07:00",
                    updated_at: "2025-04-09T15:21:03.419478+07:00",
                  },
                ],
              },
              {
                id: "71af7418-737d-46d1-881f-72e0d8ad5942",
                survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                answer_type_id: "a04e61ec-8bb6-425e-93d9-f2dfa4300946",
                question: "Pilih lebih dari satu",
                attachment: "http://localhost:8001/",
                is_completed: "",
                number: 4,
                max_stars: 5,
                created_at: "2025-04-09T14:58:36.676231+07:00",
                updated_at: "2025-04-09T14:59:17.80658+07:00",
                answer_type: {
                  id: "a04e61ec-8bb6-425e-93d9-f2dfa4300946",
                  name: "Checkbox",
                  created_at: "2025-03-20T10:49:27.836418+07:00",
                  updated_at: "2025-03-20T10:49:27.836418+07:00",
                },
                question_options: [
                  {
                    id: "019f5612-37bb-4844-89e2-bd5db535d8f9",
                    question_id: "71af7418-737d-46d1-881f-72e0d8ad5942",
                    option_text: "satu",
                    created_at: "2025-04-09T14:59:17.808755+07:00",
                    updated_at: "2025-04-09T14:59:17.808755+07:00",
                  },
                  {
                    id: "951ee176-b8ae-482f-b567-d30aff877441",
                    question_id: "71af7418-737d-46d1-881f-72e0d8ad5942",
                    option_text: "dua",
                    created_at: "2025-04-09T14:59:17.809938+07:00",
                    updated_at: "2025-04-09T14:59:17.809939+07:00",
                  },
                  {
                    id: "57e27d57-8149-489a-870b-e37451caf7ce",
                    question_id: "71af7418-737d-46d1-881f-72e0d8ad5942",
                    option_text: "tiga",
                    created_at: "2025-04-09T14:59:17.811074+07:00",
                    updated_at: "2025-04-09T14:59:17.811074+07:00",
                  },
                ],
                survey_responses: [
                  {
                    id: "87342305-dd12-434b-a500-277fb4a130ae",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "f2e7f8c9-547c-419c-8417-fb61794ba5f1",
                    answer: "dua",
                    answer_file: "http://localhost:8001/",
                    created_at: "2025-04-09T15:21:03.419478+07:00",
                    updated_at: "2025-04-09T15:21:03.419478+07:00",
                  },
                  {
                    id: "87342305-dd12-434b-a500-277fb4a130ae",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "f2e7f8c9-547c-419c-8417-fb61794ba5f1",
                    answer: "tiga",
                    answer_file: "http://localhost:8001/",
                    created_at: "2025-04-09T15:21:03.419478+07:00",
                    updated_at: "2025-04-09T15:21:03.419478+07:00",
                  },
                ],
              },
              {
                id: "f3d3bd66-e33b-4301-a347-9ff3e813dd55",
                survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                answer_type_id: "51cb622b-6d29-4714-9562-8546f48d0c44",
                question: "Dropdown",
                attachment: "http://localhost:8001/",
                is_completed: "",
                number: 5,
                max_stars: 5,
                created_at: "2025-04-09T14:58:36.682595+07:00",
                updated_at: "2025-04-09T14:59:17.812826+07:00",
                answer_type: {
                  id: "51cb622b-6d29-4714-9562-8546f48d0c44",
                  name: "Dropdown",
                  created_at: "2025-03-20T10:49:27.936306+07:00",
                  updated_at: "2025-03-20T10:49:27.936306+07:00",
                },
                question_options: [
                  {
                    id: "71f1b113-bd33-415a-b1c7-d80d5e963123",
                    question_id: "f3d3bd66-e33b-4301-a347-9ff3e813dd55",
                    option_text: "ddwn 1",
                    created_at: "2025-04-09T14:59:17.814869+07:00",
                    updated_at: "2025-04-09T14:59:17.814869+07:00",
                  },
                  {
                    id: "b1db5e43-63d6-453d-9214-3900664eb010",
                    question_id: "f3d3bd66-e33b-4301-a347-9ff3e813dd55",
                    option_text: "ddwn 2",
                    created_at: "2025-04-09T14:59:17.816002+07:00",
                    updated_at: "2025-04-09T14:59:17.816002+07:00",
                  },
                  {
                    id: "56820825-3077-48ff-af5c-35a3ea30ea8a",
                    question_id: "f3d3bd66-e33b-4301-a347-9ff3e813dd55",
                    option_text: "ddwn 3",
                    created_at: "2025-04-09T14:59:17.817089+07:00",
                    updated_at: "2025-04-09T14:59:17.817089+07:00",
                  },
                  {
                    id: "8fc59629-7aa0-4e2d-a768-3cee5f1f7f9e",
                    question_id: "f3d3bd66-e33b-4301-a347-9ff3e813dd55",
                    option_text: "ddwn 4",
                    created_at: "2025-04-09T14:59:17.81821+07:00",
                    updated_at: "2025-04-09T14:59:17.81821+07:00",
                  },
                ],
                survey_responses: [
                  {
                    id: "87342305-dd12-434b-a500-277fb4a130ae",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "f2e7f8c9-547c-419c-8417-fb61794ba5f1",
                    answer: "Laki",
                    answer_file: "http://localhost:8001/",
                    created_at: "2025-04-09T15:21:03.419478+07:00",
                    updated_at: "2025-04-09T15:21:03.419478+07:00",
                  },
                ],
              },
              {
                id: "70ff1dac-0942-483a-92e1-b92e34daf3d1",
                survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                answer_type_id: "f76ac245-56e6-4b52-8e3f-421538b77ba4",
                question: "Kasih rating!!! wajib 5!!!",
                attachment: "http://localhost:8001/",
                is_completed: "",
                number: 6,
                max_stars: 5,
                created_at: "2025-04-09T14:58:36.689529+07:00",
                updated_at: "2025-04-09T14:59:17.819929+07:00",
                answer_type: {
                  id: "f76ac245-56e6-4b52-8e3f-421538b77ba4",
                  name: "Rating",
                  created_at: "2025-03-20T10:49:28.037961+07:00",
                  updated_at: "2025-03-20T10:49:28.037961+07:00",
                },
                question_options: null,
                survey_responses: [
                  {
                    id: "87342305-dd12-434b-a500-277fb4a130ae",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "f2e7f8c9-547c-419c-8417-fb61794ba5f1",
                    answer: "3",
                    answer_file: "http://localhost:8001/",
                    created_at: "2025-04-09T15:21:03.419478+07:00",
                    updated_at: "2025-04-09T15:21:03.419478+07:00",
                  },
                ],
              },
              {
                id: "2edf8f11-277d-4d8e-8523-f3ed15933ec3",
                survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                answer_type_id: "d97c5137-9265-463e-9cb4-866b8f10ec4c",
                question: "Insert link ig kamuh",
                attachment: "http://localhost:8001/",
                is_completed: "",
                number: 7,
                max_stars: 5,
                created_at: "2025-04-09T14:58:36.691284+07:00",
                updated_at: "2025-04-09T14:59:17.822101+07:00",
                answer_type: {
                  id: "d97c5137-9265-463e-9cb4-866b8f10ec4c",
                  name: "Link",
                  created_at: "2025-03-20T10:49:28.139689+07:00",
                  updated_at: "2025-03-20T10:49:28.139689+07:00",
                },
                question_options: null,
                survey_responses: [
                  {
                    id: "ea6665fa-ada9-44ff-8126-6fad0604a8e2",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "01bc339e-1207-42ee-a637-1179a8656c26",
                    answer: "https://jsonformatter.org/json-pretty-print",
                    answer_file:
                      "http://localhost:8001/storage/answers/files/1744186905905619100_gilang_julong.jpg",
                    created_at: "2025-04-09T15:21:46.312884+07:00",
                    updated_at: "2025-04-09T15:21:46.312884+07:00",
                  },
                  {
                    id: "ea6665fa-ada9-44ff-8126-6fad0604a8e2",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "01bc339e-1207-42ee-a637-1179a8656c26",
                    answer: "https://jsonformatter.org/json-pretty-print",
                    answer_file:
                      "http://localhost:8001/storage/answers/files/1744186905905619100_gilang_julong.jpg",
                    created_at: "2025-04-09T15:21:46.312884+07:00",
                    updated_at: "2025-04-09T15:21:46.312884+07:00",
                  },
                ],
              },
              {
                id: "01bc339e-1207-42ee-a637-1179a8656c26",
                survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                answer_type_id: "ecf0c7ff-d204-410f-9900-3a271a93dee8",
                question: "insert foto",
                attachment: "http://localhost:8001/",
                is_completed: "",
                number: 8,
                max_stars: 5,
                created_at: "2025-04-09T14:59:17.823652+07:00",
                updated_at: "2025-04-09T14:59:17.823652+07:00",
                answer_type: {
                  id: "ecf0c7ff-d204-410f-9900-3a271a93dee8",
                  name: "Attachment",
                  created_at: "2025-03-20T10:49:28.246297+07:00",
                  updated_at: "2025-03-20T10:49:28.246297+07:00",
                },
                question_options: null,
                survey_responses: [
                  {
                    id: "ea6665fa-ada9-44ff-8126-6fad0604a8e2",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "01bc339e-1207-42ee-a637-1179a8656c26",
                    answer: "",
                    answer_file:
                      "http://localhost:8001/storage/answers/files/1744186905905619100_gilang_julong.jpg",
                    created_at: "2025-04-09T15:21:46.312884+07:00",
                    updated_at: "2025-04-09T15:21:46.312884+07:00",
                  },
                  {
                    id: "ea6665fa-ada9-44ff-8126-6fad0604a8e2",
                    survey_template_id: "89648dee-5b5a-4141-bd04-01b6f6d0e52e",
                    employee_task_id: "03cea9cb-fff9-41eb-8fc6-3616c239e954",
                    question_id: "01bc339e-1207-42ee-a637-1179a8656c26",
                    answer: "",
                    answer_file:
                      "http://localhost:8001/storage/answers/files/1744186905905619100_gilang_julong.jpg",
                    created_at: "2025-04-09T15:21:46.312884+07:00",
                    updated_at: "2025-04-09T15:21:46.312884+07:00",
                  },
                ],
              },
            ],
          },
        };
        console.log({ data });
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
