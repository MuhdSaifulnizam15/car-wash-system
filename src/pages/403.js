import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Header from "components/Header";

const Forbidden = () => {
  return (
    <div className="min-h-full">
      <Header title="Permission Denied" />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 mx-6">
          <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black">
              403 - Permission Denied
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              You do not have permission to access this page
            </p>
            <a
              href="/sales"
              className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white"
            >
              Return Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forbidden;
