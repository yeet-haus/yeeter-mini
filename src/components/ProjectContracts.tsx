import { useDao } from "../hooks/useDao";
import { useYeeter } from "../hooks/useYeeter";
import { EXPLORER_URL } from "../utils/constants";

export const ProjectContracts = ({
  chainid,
  daoid,
  yeeterid,
}: {
  chainid: string;
  daoid: string;
  yeeterid: string;
}) => {
  const { dao } = useDao({
    daoid,
    chainid,
  });

  const { yeeter } = useYeeter({
    chainid,
    yeeterid,
  });

  if (!dao || !yeeter) return;

  return (
    <>
      <div className="font-bold text-xl mt-3">Contracts</div>
      <div className="text-sm">
        Yeeter campaigns are all on-chain. They are made up of the following:
      </div>
      <a
        className="link link-primary text-sm"
        href={`${EXPLORER_URL[chainid]}/address/${dao.id}`}
        target="_blank"
      >
        DAOhaus moloch v3 ⟶
      </a>
      <a
        className="link link-primary text-sm"
        href={`${EXPLORER_URL[chainid]}/address/${dao.safeAddress}`}
        target="_blank"
      >
        DAO Safe ⟶
      </a>
      <a
        className="link link-primary text-sm"
        href={`${EXPLORER_URL[chainid]}/address/${dao.sharesAddress}`}
        target="_blank"
      >
        DAO Voting token (team members) ⟶
      </a>
      <a
        className="link link-primary text-sm"
        href={`${EXPLORER_URL[chainid]}/address/${dao.lootAddress}`}
        target="_blank"
      >
        DAO Non-voting token (funders) ⟶
      </a>
      <a
        className="link link-primary text-sm"
        href={`${EXPLORER_URL[chainid]}/address/${yeeter.id}`}
        target="_blank"
      >
        Yeeter fundraiser shaman ⟶
      </a>
    </>
  );
};
