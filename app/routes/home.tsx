import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
    const { auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(()=> {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      <section className="main-section px-4 py-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Track Your Application & Resume Ratings
          </h1>
          <h2 className="text-lg sm:text-xl text-gray-600">
            Review your submissions and check AI-powered feedback.
          </h2>
        </div>

        {resumes.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="w-full sm:w-80 px-2">
                <ResumeCard resume={resume} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
