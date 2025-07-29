import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  return <main className="_bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="main-section">
        <h1>Track Your Application & Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
    </section>

    {resumes.length > 0 && (
      <div className="flex flex-col items-center gap-6">
  {resumes.map((resume) => (
    <div key={resume.id} className="w-full px-4">
  <ResumeCard resume={resume} />
</div>

  ))}
</div>
    )}
  </main>
}
