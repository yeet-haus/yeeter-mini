import BAAL from "./baal.json";
import BAAL_SUMMONER from "../abi/baalSummoner.json";
import BAAL_ADV_TOKEN_SUMMONER from "../abi/baalAdvTokenSummoner.json";
import GNOSIS_MODULE from "../abi/gnosisModule.json";
import GNOSIS_MULTISEND from "../abi/gnosisMultisend.json";
import GNOSIS_PROXY from "../abi/gnosisProxy.json";
import GNOSIS_SIGNLIB from "../abi/gnosisSignLib.json";
import LOOT from "../abi/loot.json";
import POSTER from "./poster.json";
import SHARES from "../abi/shares.json";
import SUPERFLUID_PROXY from "../abi/superFluidProxy.json";
import TRIBUTE_MINION from "../abi/tributeMinion.json";
import ERC20 from "../abi/erc20a.json";
import ERC721 from "../abi/erc721.json";
import VAULT_SUMMONER from "../abi/vaultSummoner.json";
import YEETER_SHAMAN from "../abi/yeeterShaman.json";
import YEETER_SUMMONER from "../abi/yeeterSummoner.json";

export const LOCAL_ABI = {
  BAAL,
  BAAL_SUMMONER,
  BAAL_ADV_TOKEN_SUMMONER,
  GNOSIS_MULTISEND,
  GNOSIS_MODULE,
  GNOSIS_PROXY,
  GNOSIS_SIGNLIB,
  LOOT,
  POSTER,
  SHARES,
  SUPERFLUID_PROXY,
  TRIBUTE_MINION,
  ERC20,
  ERC721,
  VAULT_SUMMONER,
  YEETER_SHAMAN,
  YEETER_SUMMONER,
};
export type ContractABIKey = keyof typeof LOCAL_ABI;
