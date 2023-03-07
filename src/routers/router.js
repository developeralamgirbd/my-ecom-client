import {createBrowserRouter, createRoutesFromElements, Route, Routes} from "react-router-dom";
import AdminMain from "../layouts/admin/AdminMain";
import DashboardPage from "../pages/dashboard/Dashboard-page";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import Main from "../layouts/customer/Main";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import NewPasswordPage from "../pages/auth/NewPasswordPage";
import PrivateRoute from "./privateRoute";
import CategoryCreatePage from "../pages/admin/category/CategoryCreatePage";
import CategoryListPage from "../pages/admin/category/CategoryListPage";
import ProductCreatePage from "../pages/post/ProductCreatePage";
import PostListPage from "../pages/post/PostListPage";
import ProfilePage from "../pages/auth/ProfilePage";
import UpdatePasswordPage from "../pages/auth/UpdatePasswordPage";
import SinglePost from "../pages/SinglePost";
import PostsByCategory from "../pages/PostsByCategory";
import PostsBySearch from "../pages/PostsBySearch";
import ShoppingCard from "../components/card/ShoppingCard";
import SuperAdminRoute from "./superAdminRoute";
import UserMain from "../layouts/UserMain";
import UserDashboardPage from "../pages/dashboard/UserDashboard-page";
import OrderPage from "../pages/OrderPage";

const router = createBrowserRouter([

    {
        path: '/admin',
        element:<SuperAdminRoute><AdminMain/></SuperAdminRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage/>
            },
            {
                path: '/admin/category-create',
                element: <CategoryCreatePage/>
            },
            {
                path: '/admin/category-list',
                element: <CategoryListPage/>
            },
            {
                path: '/admin/post-create',
                element: <ProductCreatePage/>
            },
            {
                path: '/admin/post-list',
                element: <PostListPage/>
            },
            {
                path: '/admin/profile',
                element: <ProfilePage/>
            },
            {
                path: '/admin/change-password',
                element: <UpdatePasswordPage/>
            },
        ]
    },
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/send-otp',
                element: <ForgotPasswordPage/>
            },
            {
                path: '/verify-otp',
                element: <VerifyOtpPage/>
            },
            {
                path: '/reset-password',
                element: <NewPasswordPage/>
            },
            {
                path: '/post/:id',
                element: <SinglePost/>
            },
            {
                path: '/category/posts/:name',
                element: <PostsByCategory/>
            },
            {
                path: '/search',
                element: <PostsBySearch/>
            },
            {
                path: '/cart',
                element: <ShoppingCard/>
            }

        ]
    },

    {
        path: '/customer',
        element: <PrivateRoute><Main/></PrivateRoute> ,
        children: [
            {
                index: true,
                element: <UserDashboardPage/>
            },
            {
                path: '/customer/profile',
                element: <ProfilePage/>
            },
            {
                path: '/customer/change-password',
                element: <UpdatePasswordPage/>
            },
            {
                path: '/customer/orders',
                element: <OrderPage/>
            },
        ]
    },



]);

/*const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<ShoppingCard />} />



            <Route path="/dashboard" element={<PrivateRoute/>}>
                <Route path="user" element={<UserDashboardPage />} />
            </Route>

            {/!*Admin Route*!/}
            <Route path="/dashboard" element={<SuperAdminRoute/>}>
                <Route path="dashboard" element={<DashboardPage/>} />
                <Route path="'dashboard/category-create'" element={<CategoryCreatePage/>} />
                <Route path="dashboard/category-list" element={ <CategoryListPage/>} />
                <Route path="dashboard/post-create" element={ <ProductCreatePage/>} />
                <Route path="/dashboard/post-list" element={<PostListPage/>} />
                <Route path="/dashboard/change-password" element={<UpdatePasswordPage/>} />

            </Route>

            {/!*<Route path="*" element={<PageNotFound />} replace />*!/}


    )
);*/
/*
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<Team />}
            path="teams/:teamId"
            loader={async ({ params }) => {
                return fetch(
                    `/fake/api/teams/${params.teamId}.json`
                );
            }}
            action={async ({ request }) => {
                return updateFakeTeam(await request.formData());
            }}
            errorElement={<ErrorBoundary />}
        >

        </Route>
    )
);*/

export default router;