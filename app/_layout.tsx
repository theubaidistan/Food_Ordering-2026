// import { SplashScreen, Stack } from "expo-router";
// import { useFonts } from "expo-font";
// import { useEffect } from "react";

// import "./globals.css";
// import * as Sentry from "@sentry/react-native";
// import useAuthStore from "@/store/auth.store";

// // Sentry.init({
// //   dsn: 'https://94edd17ee98a307f2d85d750574c454a@o4506876178464768.ingest.us.sentry.io/4509588544094208',

// //   // Adds more context data to events (IP address, cookies, user, etc.)
// //   // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
// //   sendDefaultPii: true,

// //   // Configure Session Replay
// //   replaysSessionSampleRate: 1,
// //   replaysOnErrorSampleRate: 1,
// //   integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

// //   // uncomment the line below to enable Spotlight (https://spotlightjs.com)
// //   // spotlight: __DEV__,
// // });

// Sentry.init({
//   dsn: "https://def89de62185ea5ba120a497fefac078@o4509973404123136.ingest.us.sentry.io/4509973405302784",
//   // Enable logs to be sent to Sentry
//   debug: true,
// });

// export default Sentry.wrap(function RootLayout() {
//   const { isLoading, fetchAuthenticatedUser } = useAuthStore();

//   const [fontsLoaded, error] = useFonts({
//     "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
//     "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
//     "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
//     "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
//     "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
//   });

//   useEffect(() => {
//     if (error) throw error;
//     if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded, error]);

//   useEffect(() => {
//     fetchAuthenticatedUser();
//   }, []);

//   if (!fontsLoaded || isLoading) return null;

//   return <Stack screenOptions={{ headerShown: false }} />;
// });

// Sentry.showFeedbackWidget();

//*--------------------------------------------------------------------------------------------
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import "./globals.css";
import * as Sentry from "@sentry/react-native";
import useAuthStore from "@/store/auth.store";

// ✅ Initialize Sentry ONCE (outside component is fine)
Sentry.init({
  dsn: "https://def89de62185ea5ba120a497fefac078@o4509973404123136.ingest.us.sentry.io/4509973405302784",
  debug: true,

  tracesSampleRate: 1.0,

  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1,

  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],
});

function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // ✅ Move feedback widget HERE
  useEffect(() => {
    Sentry.showFeedbackWidget();
  }, []);

  if (!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

// ✅ Wrap AFTER defining component
export default Sentry.wrap(RootLayout);
//*---------------------------------------------------------------------------------
