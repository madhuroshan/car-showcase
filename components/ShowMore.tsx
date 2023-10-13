"use client";
import { useRouter } from "next/navigation";
import { ShowMoreProps } from "@/types";
import { Button } from ".";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const handleUpdateParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    return newPathname;
  };
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathname = handleUpdateParams("limit", `${newLimit}`);
    router.push(newPathname);
  };
  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <Button
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
