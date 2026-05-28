// resources/js/Layouts/AppLayout.jsx

import Sidebar from "@/Components/Layout/Sidebar";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";

export default function AppLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">

            {/* Sidebar */}
            <Sidebar />

            {/* Right Section */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">

                    {children}

                </main>

                {/* Footer */}
                <Footer />

            </div>

        </div>
    );
}