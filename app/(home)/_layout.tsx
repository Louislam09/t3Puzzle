import { View } from "@/components/Themed";
import { Slot } from "expo-router";

import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import GameProvider from "@/contexts/GameProvider";
import GradientBackground from "@/components/GradientBackground";
import { ScoreProvider } from "@/contexts/ScoreProvider";

const StatusBarBackground = ({ children }: any) => {
  const styling = {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: 'salmon',
  };
  return <View style={[styling, { width: "100%" }]}>{children}</View>;
};

export default function HomeLayout() {
  return (
    <StatusBarBackground>
      <GameProvider>
        <ScoreProvider>
          <GradientBackground>
            <Slot />
          </GradientBackground>
        </ScoreProvider>
      </GameProvider>
    </StatusBarBackground>
  );
}
