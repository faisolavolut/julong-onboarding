import { ButtonLink } from "@/lib/components/ui/button-link";
import { shortDate } from "@/lib/utils/date";
import { getAccess } from "@/lib/utils/getAccess";
import { getValue } from "@/lib/utils/getValue";
import get from "lodash.get";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { getStatusLabel } from "./status-mpp";
export const rolesMpp = (roles: any[]) => {
  const data = [
    {
      name: "superadmin",
      permision: [
        "read-mpp-hrd-location",
        "read-mpp-hrd-unit",
        "read-mpp-dir-unit",
      ],
    },
    {
      name: "HRD Location",
      permision: ["read-mpp-hrd-location"],
    },
    {
      name: "HRD Unit",
      permision: ["read-mpp-hrd-unit"],
    },
    {
      name: "Direktur Unit",
      permision: ["read-mpp-dir-unit"],
    },
  ];

  const yourRole =
    data.find((e) => {
      if (e.name === "superadmin") {
        // Cek semua izin (and)
        return e.permision.every((perm) => getAccess(perm, roles));
      } else {
        // Cek salah satu izin (or)
        return e.permision.some((perm) => getAccess(perm, roles));
      }
    })?.name || null;
  if (getAccess("read-mpp", roles)) return "superadmin";
  return yourRole;
};
export const columnMpp = (data: any) => {
  const access = rolesMpp(
    typeof data?.local?.roles === "object" ? [data?.local?.roles] : []
  );
  if (data?.id === "on_going") {
    switch (access) {
      case "HRD Location":
        return [
          {
            name: "organization_name",
            header: () => <span>Organization</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "organization_location_name",
            header: () => <span>Location</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_number",
            header: () => <span>Document Number</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_date",
            header: () => <span>Document Date</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{shortDate(new Date(getValue(row, name)))}</>;
            },
          },
          {
            name: "status",
            header: () => <span>Status</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getStatusLabel(getValue(row, name))}</>;
            },
          },
          {
            name: "action",
            header: () => <span>Action</span>,
            sortable: false,
            renderCell: ({ row, name, cell }: any) => {
              if (!get(row, "id")) return <></>;
              return (
                <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                  {["REJECTED", "DRAFTED", "DRAFT"].includes(
                    get(row, "status")
                  ) && data?.local?.can_edit ? (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${get(row, "id")}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${get(row, "id")}/view`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                  )}
                </div>
              );
            },
          },
        ];
        break;
      case "HRD Unit":
        return [
          {
            name: "organization_name",
            header: () => <span>Organization</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "name",
            header: () => <span>Location</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "mp_planning_header.document_number",
            header: () => <span>Document Number</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "mp_planning_header.document_date",
            header: () => <span>Document Date</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{shortDate(new Date(getValue(row, name)))}</>;
            },
          },
          {
            name: "mp_planning_header.status",
            header: () => <span>Status</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getStatusLabel(getValue(row, name))}</>;
            },
          },
          {
            name: "action",
            header: () => <span>Action</span>,
            sortable: false,
            renderCell: ({ row, name, cell }: any) => {
              if (!get(row, "mp_planning_header.id")) return <></>;
              return (
                <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                  {["REJECTED", "DRAFTED", "DRAFT"].includes(
                    get(row, "mp_planning_header.status")
                  ) && data?.local?.can_edit ? (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${get(
                        row,
                        "mp_planning_header.id"
                      )}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${get(
                        row,
                        "mp_planning_header.id"
                      )}/view`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                  )}
                </div>
              );
            },
          },
        ];
        break;
      case "Direktur Unit":
        return [
          {
            name: "organization_name",
            header: () => <span>Organization</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "name",
            header: () => <span>Location</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "mp_planning_header.document_number",
            header: () => <span>Document Number</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "mp_planning_header.document_date",
            header: () => <span>Document Date</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{shortDate(new Date(getValue(row, name)))}</>;
            },
          },
          {
            name: "action",
            header: () => <span>Action</span>,
            sortable: false,
            renderCell: ({ row, name, cell }: any) => {
              if (!get(row, "mp_planning_header.id")) return <></>;
              return (
                <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                  {data?.local?.can_edit &&
                  ["REJECTED", "DRAFTED", "DRAFT"].includes(
                    get(row, "mp_planning_header.status")
                  ) ? (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${get(
                        row,
                        "mp_planning_header.id"
                      )}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
                  ) : (
                    <></>
                  )}

                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${get(
                      row,
                      "mp_planning_header.id"
                    )}/view`}
                  >
                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-lg" />
                    </div>
                  </ButtonLink>
                </div>
              );
            },
          },
        ];
        break;
      default:
        return [
          {
            name: "mp_planning_header.document_number",
            header: () => <span>Document Number</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "mp_planning_header.document_date",
            header: () => <span>Document Date</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{shortDate(new Date(getValue(row, name)))}</>;
            },
          },
          {
            name: "organization_name",
            header: () => <span>Organization</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "name",
            header: () => <span>Location</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "mp_planning_header.requestor_name",
            header: () => <span>Requestor</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "mp_planning_header.status",
            header: () => <span>Status</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getStatusLabel(getValue(row, name))}</>;
            },
          },
          {
            name: "action",
            header: () => <span>Action</span>,
            sortable: false,
            renderCell: ({ row, name, cell }: any) => {
              if (!get(row, "mp_planning_header.id")) return <></>;
              return (
                <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                  {["REJECTED", "DRAFTED", "DRAFT"].includes(
                    get(row, "mp_planning_header.status")
                  ) && data?.local?.can_edit ? (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${get(
                        row,
                        "mp_planning_header.id"
                      )}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${get(
                        row,
                        "mp_planning_header.id"
                      )}/view`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                  )}
                </div>
              );
            },
          },
        ];
        break;
    }
  } else {
    switch (data?.role) {
      case "HRD Site":
        return [
          {
            name: "organization_name",
            header: () => <span>Organization</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "organization_location_name",
            header: () => <span>Location</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_number",
            header: () => <span>Document Number</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_date",
            header: () => <span>Document Date</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{shortDate(new Date(getValue(row, name)))}</>;
            },
          },
          {
            name: "status",
            header: () => <span>Status</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getStatusLabel(getValue(row, name))}</>;
            },
          },
          {
            name: "action",
            header: () => <span>Action</span>,
            sortable: false,
            renderCell: ({ row, name, cell }: any) => {
              return (
                <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                  {["REJECTED", "DRAFTED", "DRAFT"].includes(row?.status) &&
                  data?.local?.can_edit ? (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${row.id}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${row.id}/view`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                  )}
                </div>
              );
            },
          },
        ];
        break;
      case "HRD Unit":
        return [
          {
            name: "organization_name",
            header: () => <span>Organization</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "organization_location_name",
            header: () => <span>Location</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_number",
            header: () => <span>Document Number</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_date",
            header: () => <span>Document Date</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{shortDate(new Date(getValue(row, name)))}</>;
            },
          },
          {
            name: "status",
            header: () => <span>Status</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getStatusLabel(getValue(row, name))}</>;
            },
          },
          {
            name: "action",
            header: () => <span>Action</span>,
            sortable: false,
            renderCell: ({ row, name, cell }: any) => {
              return (
                <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                  {["REJECTED", "DRAFTED", "DRAFT"].includes(row?.status) &&
                  data?.local?.can_edit ? (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${row.id}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${row.id}/view`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                  )}
                </div>
              );
            },
          },
        ];
        break;
      case "Direktur Unit":
        return [
          {
            name: "organization_name",
            header: () => <span>Organization</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "organization_location_name",
            header: () => <span>Location</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_number",
            header: () => <span>Document Number</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_date",
            header: () => <span>Document Date</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{shortDate(new Date(getValue(row, name)))}</>;
            },
          },
          {
            name: "action",
            header: () => <span>Action</span>,
            sortable: false,
            renderCell: ({ row, name, cell }: any) => {
              return (
                <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                  {data?.local?.can_edit &&
                  ["REJECTED", "DRAFTED", "DRAFT"].includes(row?.status) ? (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${row.id}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
                  ) : (
                    <></>
                  )}

                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${row.id}/view`}
                  >
                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-lg" />
                    </div>
                  </ButtonLink>
                </div>
              );
            },
          },
        ];
        break;
      default:
        return [
          {
            name: "document_number",
            header: () => <span>Document Number</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "document_date",
            header: () => <span>Document Date</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{shortDate(new Date(getValue(row, name)))}</>;
            },
          },
          {
            name: "organization_name",
            header: () => <span>Organization</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "organization_location_name",
            header: () => <span>Location</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "requestor_name",
            header: () => <span>Requestor</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getValue(row, name)}</>;
            },
          },
          {
            name: "status",
            header: () => <span>Status</span>,
            renderCell: ({ row, name, cell }: any) => {
              return <>{getStatusLabel(getValue(row, name))}</>;
            },
          },
          {
            name: "action",
            header: () => <span>Action</span>,
            sortable: false,
            renderCell: ({ row, name, cell }: any) => {
              return (
                <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                  {["REJECTED", "DRAFTED", "DRAFT"].includes(row?.status) &&
                  data?.local?.can_edit ? (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${row.id}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/location/${row.id}/view`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                  )}
                </div>
              );
            },
          },
        ];
        break;
    }
  }
};
