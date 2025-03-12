import { PropsWithChildren, useEffect } from "react";
import frameSdk from "@farcaster/frame-sdk";
import { usePrivy } from "@privy-io/react-auth";
import { useLoginToFrame } from "@privy-io/react-auth/farcaster";

function FarcasterFrameProvider({ children }: PropsWithChildren) {
  const { ready, authenticated, user } = usePrivy();
  const { initLoginToFrame, loginToFrame } = useLoginToFrame();

  useEffect(() => {
    console.log("user", user);
    if (ready && !authenticated) {
      const login = async () => {
        // Initialize a new login attempt to get a nonce for the Farcaster wallet to sign
        const { nonce } = await initLoginToFrame();
        // Request a signature from Warpcast
        const result = await frameSdk.actions.signIn({ nonce: nonce });
        // Send the received signature from Warpcast to Privy for authentication
        console.log("loggin into frame result", result);
        await loginToFrame({
          message: result.message,
          signature: result.signature,
        });
      };
      login();
    }

    setTimeout(() => {
      frameSdk.actions.ready();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, authenticated]);

  return <>{children}</>;
}

export default FarcasterFrameProvider;

//   useEffect(() => {
//     const init = async () => {
//       const context = await FrameSDK.context;

//       // Autoconnect if running in a frame.
//       if (context?.client.clientFid) {
//         connect(wagmiConfig, { connector: farcasterFrame() });
//         console.log("**********connecting");
//       }

//       // Hide splash screen after UI renders.
//       setTimeout(() => {
//         FrameSDK.actions.ready();
//       }, 500);
//     };
//     init();
//   }, []);
