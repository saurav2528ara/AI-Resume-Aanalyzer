import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;

  return (
    <Link
  to={`/resume/${id}`}
  className="resume-card w-full bg-white rounded-lg px-6 py-4 shadow-md hover:shadow-lg transition duration-300"
>
  <div className="flex items-center justify-between w-full">
    <div className="flex flex-col gap-1">
      <h2 className="text-black font-bold text-lg">{companyName}</h2>
      <h3 className="text-sm text-gray-500">{jobTitle}</h3>
    </div>

    <div className="flex-shrink-0">
      <ScoreCircle score={feedback.overallScore} />
    </div>
  </div>
  <div>
    <div className="gradient-border animate-in fade-in duration-1000">
      <div className="w-full h-full">
        <img 
            src={imagePath}
            alt="resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
        />
      </div>

    </div>
  </div>
</Link>




  );
};

export default ResumeCard;
