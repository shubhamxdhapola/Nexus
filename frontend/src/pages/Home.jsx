import { ArrowUpRight, ChevronRight, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero min-h-[calc(100vh-64px)] px-2 md:px-10">
      <section className="">
        <div className="py-8 px-4 sm:px-6 mx-auto max-w-7xl text-left sm:text-center lg:py-16 lg:px-12">
          <div className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-base-content bg-base-200 rounded-full">
            <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">
              Your
            </span>
            <span className="text-sm font-medium">
              <span className="text-rotate">
                <span>
                  <span>Profile</span>
                  <span>Identity</span>
                  <span>Links</span>
                  <span>Portfolio</span>
                </span>
              </span>
            </span>
            {/* <ChevronRight className="size-5 ms-2" /> */}
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-11 sm:leading-14 md:leading-15 lg:leading-17">
            Connect all your links in one smart profile
          </h1>
          <p className="mb-8 text-sm md:text-lg font-normal text-base-content/60 sm:px-16 xl:px-50">
            At Nexus, we help creators, developers, students, and professionals
            share everything in one beautiful, customizable link — simple, fast,
            and powerful.
          </p>
          <div className="flex justify-start sm:justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex justify-center items-center font-medium text-center rounded-box btn-primary btn gap-2"
            >
              <LayoutDashboard className="size-5" />
              Dashboard
            </Link>
            <Link
              to="/register"
              className="inline-flex justify-center items-center font-medium text-center rounded-box btn gap-2 btn-primary"
            >
              <ArrowUpRight className="size-5" />
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
