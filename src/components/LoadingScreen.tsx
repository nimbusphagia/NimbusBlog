import { useNavigation } from "react-router-dom";

export function LoadingBar() {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  return (
    <div className={isLoading ? "loadingScreen" : "loadingDone"} />
  );
}
