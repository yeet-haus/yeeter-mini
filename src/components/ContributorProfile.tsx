import { normalize } from "viem/ens";
import { http, createConfig, useEnsAvatar } from "wagmi";
import { mainnet } from "wagmi/chains";
import { APP_THEME } from "../utils/content";
import { GetEnsNameReturnType } from "wagmi/actions";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export const ContributorProfile = ({
  name,
}: {
  name?: GetEnsNameReturnType;
}) => {
  const { data: avatar } = useEnsAvatar({
    config,
    name: normalize(name || ""),
  });

  return (
    <div className="chat-image avatar av-contain">
      <div className="w-10 rounded-full">
        {avatar && <img alt="yeeter" src={avatar} />}
        {!avatar && <img alt="yeeter" src={APP_THEME.logo} />}
      </div>
    </div>
  );
};