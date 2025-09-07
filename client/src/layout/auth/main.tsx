import { Outlet } from "react-router";

const AuthMainLayout = () => {
    return (
        <section className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </section>
    );
};

export default AuthMainLayout;
