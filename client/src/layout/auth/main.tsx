// import dependencies
import { Outlet } from "react-router";

const AuthMainLayout = () => {
    return (
        <section className="container mx-auto min-h-screen flex items-center justify-center p-6">
            {/* Auth Main Layout */}
            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden max-w-4xl w-full">
                <Outlet />
            </div>
        </section>
    );
};

export default AuthMainLayout;
