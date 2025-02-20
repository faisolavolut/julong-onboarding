import { getStatusLabel } from "@/constants/status-mpp";
import ImageBetter from "@/lib/components/ui/Image";
import { Progress } from "@/lib/components/ui/Progress";
import { dayDate } from "@/lib/utils/date";
import { siteurl } from "@/lib/utils/siteurl";
import { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
export const TaskCard: React.FC<{
  data: any;
  hidden_save?: boolean;
  render?: () => void;
  onClick?: (item: any) => void;
}> = ({ data, hidden_save, render, onClick }) => {
  const progress = 50;
  const [favorite, setFavorite] = useState(data?.is_saved ? true : false);
  const [isZooming, setIsZooming] = useState(false);
  const handleClick = () => {
    setIsZooming(true);
    setTimeout(() => setIsZooming(false), 300); // Durasi animasi 300ms
  };
  return (
    <div
      className="border rounded-lg overflow-hidden shadow-md  w-full bg-white cursor-pointer "
      onClick={async () => {
        if (typeof onClick === "function") {
          await onClick(data);
        }
      }}
    >
      <div className="flex justify-between items-center">
        <div className="w-full h-28">
          <ImageBetter
            src={siteurl(data?.CoverPath)}
            alt="John Cena"
            className=" w-full h-full object-cover object-right"
            defaultSrc={siteurl("/404-img.jpg")}
          />
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex flex-row gap-x-1">
          <h2 className=" font-bold text-lg flex-grow">{data?.name}</h2>
          <div className="flex items-center justify-end">
            <div
              className={cx(
                "	text-amber-600 p-1 text-xs rounded-md capitalize",
                data?.priority === "HIGH" && "bg-amber-100",
                data?.priority === "MEDIUM" && "bg-blue-100",
                data?.priority === "LOW" && "bg-green-100"
              )}
            >
              {getStatusLabel(data?.priority)}
            </div>
          </div>
        </div>
        <div className="flex flex-col relative">
          <div className="w-full justify-end text-[10px] text-primary flex flex-row font-bold">
            {progress}%
          </div>
          <Progress value={progress} className={cx(`w-full h-2 bg-gray-300`)} />
        </div>
        <div className="flex flex-grow items-center justify-end py-1">
          <div className="flex flex-row items-center gap-x-1 text-[10px] text-primary">
            <LuCalendarDays />
            <p className={cx("font-bold  line-clamp-1")}>
              {dayDate(data?.end_date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
