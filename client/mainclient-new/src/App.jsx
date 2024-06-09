import React, { useEffect, useContext } from "react";
import Home from "./pages/commonUser/home";
import Login from "./pages/auth/login";
import jscookie from "js-cookie";
import { AuthContext } from "./context/authContext";
import UserCreation from "./pages/admin/users/userCreation";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./pages/commonUser/aboutus";
import NoticeUpload from "./pages/admin/notice/noticeUpload";
import AllNotices from "./pages/admin/notice/allNotices";
import AllNoticesUsers from "./pages/users/notice/AllNotices";
import Profile from "./pages/common/profile/profile";
import Axios from "axios";
import { url } from "./url";
import UserPrefference from "./pages/admin/users/userPrefference";
import GalleryUpload from "./pages/admin/gallery/galleryUpload";
import AllGallery from "./pages/commonUser/allGallery";
import PaymentDone from "./pages/admin/payment";
import UserPaymentInfo from "./pages/admin/payment/userPaymentInfo";
import MonthLyDone from "./pages/admin/payment/monthlyDone";
import UserList from "./pages/admin/users/userList";
import Videoes from "./pages/commonUser/videoes";
import VideosUpload from "./pages/admin/videos/videosUpload";
import AttendAndResult from "./pages/admin/users/attendandresult";
import ProfileSingleUser from "./pages/common/profile";
import ContactUs from "./pages/commonUser/conatctus/contactus";
import ReviewSection from "./pages/commonUser/review";
import { firebaseapp } from "./firebase/init";
import AllReviews from "./pages/admin/review/allreviews";
import WbjeeQuestionUpload from "./pages/admin/exam/wbjee";
import JeeMainQuestionUpload from "./pages/admin/exam/jeemain";
import HsQuestionUpload from "./pages/admin/exam/hs";
import AllJeemainQuestions from "./pages/admin/exam/jeemain/allQuestions";
import AllWbjeeQuestions from "./pages/admin/exam/wbjee/allQuestions";
import FAQ from "./pages/commonUser/faq";
import Courses from "./pages/commonUser/courses";
import ScoreBoard from "./pages/users/exam/scorecard";
import NotFound404 from "./component/shared/404page";
import AllHsQuestions from "./pages/admin/exam/hs/allQuestions";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {
  useEffect(() => {
    checkAdmin();
  }, []);
  const [_, setAuth] = useContext(AuthContext);
  async function checkAdmin() {
    const jwt = jscookie.get("userjwt");
    let resp = { status: 400 };
    console.log(jwt);
    if (jwt) {
      resp = await Axios.get(url + "/auth/checkJWT/" + jwt)
        .then((res) => {
          return {
            status: res.status,
            data: res.data,
          };
        })
        .catch((err) => {
          return {
            status: 400,
            message: err.message,
          };
        });
    }
    let isLoggedIn = false,
      isAdmin = false;
    if (resp.status == 200) {
      if (resp.data.message === "Valid") {
        if (resp.data.admin) {
          isAdmin = true;
        }
        isLoggedIn = true;
      }
    } else {
      try {
        let id = jscookie.get("uid");
        if (id) {
          await firebaseapp.firestore().collection("users").doc(id).update({
            isLoggedIn: false,
          });
        }
      } catch (Err) {
        console.log(Err);
      }
    }
    const authTemp = {
      isAdmin,
      isLoggedIn,
    };
    setAuth(authTemp);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
    {
      path: "/allGalleries",
      element: <AllGallery />,
    },
    {
      path: "/videos",
      element: <Videoes />,
    },
    {
      path: "/contactus",
      element: <ContactUs />,
    },
    {
      path: "/review",
      element: <ReviewSection />,
    },
    {
      path: "/faq",
      element: <FAQ />,
    },
    {
      path: "/courses",
      element: <Courses />,
    },
    {
      path: "/profileSingle",
      element: <ProfileSingleUser />,
    },
    {
      path: "/userprofile",
      element: <Profile />,
    },
    {
      path: "/userCreation",
      element: <UserCreation />,
    },
    {
      path: "/userPrefference",
      element: <UserPrefference />,
    },
    {
      path: "/userList",
      element: <UserList />,
    },
    {
      path: "/userAttendenceResult",
      element: <AttendAndResult />,
    },
    {
      path: "/noticeUpload",
      element: <NoticeUpload />,
    },
    {
      path: "/allNotices",
      element: <AllNotices />,
    },
    {
      path: "/galleryUpload",
      element: <GalleryUpload />,
    },
    {
      path: "/videoUpload",
      element: <VideosUpload />,
    },
    {
      path: "/userPaymentInfo",
      element: <UserPaymentInfo />,
    },
    {
      path: "/paymentInfo",
      element: <PaymentDone />,
    },
    {
      path: "/monthlyDone",
      element: <MonthLyDone />,
    },
    {
      path: "/allReviews",
      element: <AllReviews />,
    },
    {
      path: "/wbjeequestionupload",
      element: <WbjeeQuestionUpload />,
    },
    {
      path: "/jeemainquestionupload",
      element: <JeeMainQuestionUpload />,
    },
    {
      path: "/hsquestionupload",
      element: <HsQuestionUpload />,
    },
    {
      path: "/jeemainquestions",
      element: <AllJeemainQuestions />,
    },
    {
      path: "/wbjeequestions",
      element: <AllWbjeeQuestions />,
    },
    {
      path: "/hsquestions",
      element: <AllHsQuestions />,
    },
    {
      path: "/allNoticesUsers",
      element: <AllNoticesUsers />,
    },
    {
      path: "/scoreboard",
      element: <ScoreBoard />,
    },
    {
      path: "*",
      element: <NotFound404 />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
