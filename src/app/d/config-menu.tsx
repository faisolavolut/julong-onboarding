import { FaChartSimple } from "react-icons/fa6";
import { MdOutlineEventAvailable, MdOutlineTaskAlt } from "react-icons/md";

export const configMenu = [
  {
    title: "Home",
    icon: <FaChartSimple />,
    href: "/d/home",
    permision: ["read-home-onboarding"],
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
    permision: ["read-events"],
  },
  {
    title: "Survey",
    icon: <MdOutlineTaskAlt />,
    href: "/d/survey",
    permision: ["read-survey"],
  },
];
