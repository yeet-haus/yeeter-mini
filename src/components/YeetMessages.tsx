import { useYeets } from "../hooks/useYeets";
import { ContributorProfile } from "./ContributorProfile";
import { YeetMessage } from "./YeetMessage";

export const YeetMessages = ({
  chainid,
  campaignid,
}: {
  chainid: string;
  campaignid: string;
}) => {
  const { yeets } = useYeets({
    chainid,
    campaignid,
  });

  console.log("yeets", yeets);

  return (
    <div className="flex flex-col p-3 w-full border-accent text-xs rounded-sm">
      {yeets &&
        yeets?.map((yeet) => {
          return <YeetMessage yeet={yeet} key={yeet.id} />;
        })}
    </div>
  );
};
