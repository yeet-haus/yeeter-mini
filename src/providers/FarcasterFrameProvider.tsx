import FrameSDK from "@farcaster/frame-sdk";
import farcasterFrame from "@farcaster/frame-wagmi-connector";
import { PropsWithChildren, useEffect } from "react";
import { connect } from "wagmi/actions";
import { wagmiConfig } from "./Providers";

function FarcasterFrameProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const init = async () => {
      const context = await FrameSDK.context;

      // Autoconnect if running in a frame.
      if (context?.client.clientFid) {
        connect(wagmiConfig, { connector: farcasterFrame() });
        console.log("**********connecting");
      }

      // Hide splash screen after UI renders.
      setTimeout(() => {
        FrameSDK.actions.ready();
      }, 500);
    };
    init();
  }, []);

  return <>{children}</>;
}

export default FarcasterFrameProvider;
