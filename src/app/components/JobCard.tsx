import ImageBetter from "@/lib/components/ui/Image";
import { siteurl } from "@/lib/utils/siteurl";
import { useState } from "react";
export const JobCard: React.FC<{
  data: any;
  hidden_save?: boolean;
  render?: () => void;
  onClick?: (item: any) => void;
}> = ({ data, hidden_save, render, onClick }) => {
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
            src={siteurl(data?.cover_path)}
            alt="John Cena"
            className=" w-full h-full object-cover object-right"
            defaultSrc={siteurl("/404-img.jpg")}
          />
        </div>
      </div>
      <div className="flex flex-col p-4">
        <h2 className=" font-bold text-lg">{data?.name}</h2>
        <div className="flex flex-grow items-center justify-end">
          <p
            className={cx(
              "font-bold text-xs line-clamp-1",
              data?.status === "ACTIVE" ? "text-blue-500" : "text-red-500"
            )}
          >
            {data?.status === "ACTIVE" ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
