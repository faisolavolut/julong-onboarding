import { FaChartSimple } from "react-icons/fa6";
import { MdOutlineEventAvailable, MdOutlineTaskAlt } from "react-icons/md";

export const configMenu = [
  {
    title: "Dashboard",
    icon: <FaChartSimple />,
    href: "/d/dashboard",
    permision: ["read-dashboard-onboarding"],
  },
  {
    title: "Task Template",
    icon: <MdOutlineTaskAlt />,
    href: "/d/task-template",
    permision: ["read-task-template"],
  },
  {
    title: "Task Employee",
    icon: <MdOutlineTaskAlt />,
    href: "/d/task",
    permision: ["read-task"],
  },
  {
    title: "Event",
    icon: <MdOutlineEventAvailable />,
    href: "/d/event",
    permision: ["read-event"],
  },
];
