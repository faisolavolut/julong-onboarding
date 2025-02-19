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
          <img
            src={siteurl("/template-1.png")}
            alt="John Cena"
            className=" w-full h-full object-cover object-right
"
          />
        </div>
      </div>
      <div className="flex flex-col  p-4">
        <h2 className="mt-3 font-bold text-lg">{data?.job_name}</h2>
        <p className="text-gray-600 text-sm line-clamp-1">
          {data?.for_organization_name}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
