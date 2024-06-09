import React, { useEffect, useContext, Suspense, lazy } from "react";
import Introduction from "../../component/home/introduction";
import BottomNavBar from "../../component/shared/bottomNavbar";
const AboutHome = lazy(() => import("../../component/home/about"));
const Feature = lazy(() => import("../../component/home/features"));
const Footer = lazy(() => import("../../component/shared/footer"));
import LazyLoaded from "../../component/util/lazyloaded";
import BaseLayout from "../../component/shared/baseLayout";
import { firebaseapp } from "../../firebase/init";
import { AuthContext } from "../../context/authContext";
import { subscribeNotificationUser } from "../../firebase/commonUser/notification";

const Home = () => {
  useEffect(() => {
    notification();
  }, []);
  const [auth, _] = useContext(AuthContext);
  const notification = () => {
    try {
      let messaging = firebaseapp.messaging();
      messaging
        .requestPermission()
        .then((per) => {
          return messaging.getToken();
        })
        .then(async (token) => {
          let res = await subscribeNotificationUser(token);
          if (res.status == 200) {
            console.log("Successfully registered");
          } else {
            console.log(res.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {}
  };
  return (
    <div>
      <BaseLayout />
      <main className="site-main">
        <Introduction />
        <Suspense fallback={<LazyLoaded />}>
          <AboutHome type="home" />
        </Suspense>
        <Suspense fallback={<LazyLoaded />}>
          <Feature />
        </Suspense>
      </main>
      <Suspense fallback={<LazyLoaded />}>
        <Footer />
      </Suspense>
      <BottomNavBar />
    </div>
  );
};

export default Home;
