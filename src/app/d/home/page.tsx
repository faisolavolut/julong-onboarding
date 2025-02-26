"use client";
import { CardBetter } from "@/lib/components/ui/card";
import ImageBetter from "@/lib/components/ui/Image";
import { apix } from "@/lib/utils/apix";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { siteurl } from "@/lib/utils/siteurl";
import { useLocal } from "@/lib/utils/use-local";
import get from "lodash.get";
import { useEffect } from "react";

function Page() {
  const local = useLocal({
    can_approve: false,
    profile: null as any,
    recruitment_target: {
      count: 5000,
      percent: 70,
    },

    recruitment_realization: {
      count: 789,
      percent: 40,
    },
    billing: 90000,
    duration: [60, 80, 100, 50, 70, 60, 40],
    job_level: [
      {
        name: 1,
        value: 50,
      },
      {
        name: 3,
        value: 70,
      },
      {
        name: 4,
        value: 40,
      },
    ],
    job_level_max: 70,
    department: [
      {
        name: "HR",
        value: 50,
      },
      {
        name: "Finance",
        value: 70,
      },
      {
        name: "Estate",
        value: 40,
      },
    ],
    time_hire: 1531,
  });

  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      local.can_approve = getAccess("approval-verification-profile", roles);
      try {
        const res = await apix({
          port: "portal",
          value: "data.data",
          path: "/api/users/me",
          method: "get",
        });
        console.log({ res });
        local.profile = {
          ...res,
          verif: res?.verified_user_profile !== "ACTIVE" ? false : true,
        };
      } catch (ex) {}
      local.render();
    };
    run();
  }, []);

  return (
    <div className="flex p-4 flex-col flex-grow gap-y-2 max-w-5xl ">
      <div className="flex flex-row flex-grow gap-y-4 items-start">
        <div className="col-span-3 flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col flex-grow md:col-span-2 row-span-2">
            <CardBetter className="col-span-2   p-4 flex flex-col h-full w-full">
              <div className="flex flex-col flex-grow gap-y-2">
                <div className="flex flex-row  justify-center flex-grow max-h-96	">
                  {/* <div
                    className={cx(
                      "flex flex-grow bg-cover bg-no-repeat	 bg-center mx-auto max-w-80",
                      css`
                        background-image: url("${siteurl("/bean.webp")}");
                      `
                    )}
                  ></div> */}
                  <ImageBetter
                    src={siteurl(get(local.profile, "user_profile.avatar"))}
                    alt="Profile"
                    className="sm:w-48 sm:h-48 md:h-64 md:w-64 rounded-full object-cover"
                    defaultSrc={siteurl(
                      get(local.profile, "user_profile.gender") === "FEMALE"
                        ? "/default-avatar-women.jpeg"
                        : "/default-avatar.webp"
                    )}
                  />
                </div>
                <h2 className="text-lg font-bold mt-4">Account</h2>
                <div className="flex flex-col relative text-sm">
                  <div className="mt-4 w-full text-left flex flex-grow justify-between">
                    <p className="text-gray-600 ">Name</p>
                    <p className="text-gray-800 font-bold">
                      {get(local.profile, "name")}
                    </p>
                  </div>
                  <div className="mt-2 w-full text-left  flex flex-grow justify-between">
                    <p className="text-gray-600 ">Email</p>
                    <p className="text-gray-600 font-bold">
                      {get(local.profile, "email")}
                    </p>
                  </div>
                </div>
              </div>
            </CardBetter>
          </div>
          <div className="flex flex-col flex-grow">
            <CardBetter className="  p-4 flex flex-col  flex-grow">
              <div className="flex flex-col flex-grow gap-y-2">
                <h2 className="text-lg font-bold mt-4">Status</h2>
                <div className="flex flex-col relative text-sm">
                  <div className="mt-4 w-full text-left flex flex-grow justify-between">
                    <p className="text-gray-600 ">Organization</p>
                    <p className="text-gray-800 font-bold">
                      {get(local.profile, "employee.organization.name")}
                    </p>
                  </div>
                  <div className="mt-2 w-full text-left  flex flex-grow justify-between">
                    <p className="text-gray-600 ">Company</p>
                    <p className="text-gray-600 font-bold">
                      {get(
                        local.profile,
                        "employee.employee_job.emp_organization.name"
                      )}
                    </p>
                  </div>
                  <div className="mt-2 w-full text-left  flex flex-grow justify-between">
                    <p className="text-gray-600 ">Position</p>
                    <p className="text-gray-600 font-bold">
                      {get(local.profile, "employee.employee_job.job.name")}
                    </p>
                  </div>
                </div>
              </div>
            </CardBetter>
          </div>
          <div className="flex flex-col flex-grow">
            <CardBetter className="  p-4 flex flex-col  flex-grow">
              <div className="flex flex-col flex-grow gap-y-2">
                <h2 className="text-lg font-bold mt-4">My Profile</h2>
                <div className="flex flex-col relative text-sm">
                  <div className="mt-4 w-full text-left flex flex-grow justify-between">
                    <p className="text-gray-600 ">Name</p>
                    <p className="text-gray-800 font-bold">
                      {get(local.profile, "employee.name")}
                    </p>
                  </div>
                  {/* <div className="mt-2 w-full text-left flex flex-grow justify-between">
                    <p className="text-gray-600 ">ID Employee</p>
                    <p className="text-gray-800 font-bold">
                      {get(local.profile, "employee.name")}
                    </p>
                  </div>
                  <div className="mt-2 w-full text-left flex flex-grow justify-between">
                    <p className="text-gray-600 ">No KTP</p>
                    <p className="text-gray-800 font-bold">
                      {get(local.profile, "employee.name")}
                    </p>
                  </div> */}
                  <div className="mt-2 w-full text-left flex flex-grow justify-between">
                    <p className="text-gray-600 ">Mobile Phone</p>
                    <p className="text-gray-800 font-bold">
                      {get(local.profile, "employee.mobile_phone")}
                    </p>
                  </div>
                  <div className="mt-2 w-full text-left flex flex-grow justify-between">
                    <p className="text-gray-600 ">Address</p>
                    <p className="text-gray-800 font-bold">
                      {get(local.profile, "user_profile.address")}
                    </p>
                  </div>
                </div>
              </div>
            </CardBetter>
          </div>

          {/* 
          <CardBetter className="p-4 flex flex-col  flex-grow">
            <div className="flex flex-col flex-grow gap-y-2">
              <p className="text-linear-primary font-bold text-sm">
                Avg. Time to Hire
              </p>
            </div>
          </CardBetter> */}
        </div>
      </div>
    </div>
  );
}
export default Page;
