import { formatShortDateTimeFromSeconds } from "../utils/dates";
import { YeeterItem } from "../utils/types";

//createdAT
//open
//close

export const Timeline = ({ yeeter }: { yeeter: YeeterItem }) => {
  if (!yeeter) return;

  return (
    <ul className="timeline timeline-vertical md:timeline-horizontal items-center">
      <li
        className={yeeter.isComingSoon ? `text-primary font-bold text-xl` : ""}
      >
        <div className="timeline-start text-base">
          {formatShortDateTimeFromSeconds(yeeter.createdAt)}
        </div>
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-end timeline-box">Created</div>
        <hr />
      </li>
      <li className={yeeter.isActive ? `text-primary font-bold text-xl` : ""}>
        <hr />
        <div className="timeline-end text-base">
          {formatShortDateTimeFromSeconds(yeeter.startTime)}
        </div>
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-start timeline-box">Open</div>
        <hr />
      </li>
      <li className={yeeter.isEnded ? `text-primary font-bold text-xl` : ""}>
        <hr />
        <div className="timeline-start text-base">
          {formatShortDateTimeFromSeconds(yeeter.endTime)}
        </div>
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-end timeline-box">Close</div>
      </li>
    </ul>
  );
};
