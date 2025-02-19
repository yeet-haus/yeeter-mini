import { formatShortDateTimeFromSeconds } from "../utils/dates";
import { StatusRecord } from "../utils/types";

export const StatusUpdateCard = ({
  statusRecord,
}: {
  statusRecord: StatusRecord;
}) => {
  return (
    <>
      <div className="card bg-accent text-primary-content w-full">
        <div className="card-body px-4 py-3">
          <p className="text-xs text-black-100">
            {formatShortDateTimeFromSeconds(statusRecord.createdAt)}
          </p>
          <h2 className="card-title">{statusRecord.parsedContent.name}</h2>
          <p className="break-all">{statusRecord.parsedContent.description}</p>
          {statusRecord.parsedContent.link !== "" && (
            <a
              className="link link-primary text-base-100 text-sm"
              href={statusRecord.parsedContent.link}
              target="_blank"
            >
              More Info
            </a>
          )}
        </div>
      </div>
    </>
  );
};
