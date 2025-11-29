import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import { usePuterStore } from "~/lib/puter";

export const meta:()=> void = () => ([
    { title: 'Resumind | Review'},
    { name: 'description', content: 'Detailed overview of your resume'},
])

interface FeedbackData {
    [key: string]: any;
}

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])


    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);
            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf'})
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);
            
            const ImageBlob = await fs.read(data.imagePath);
            if(!ImageBlob) return;
            const imageUrl = URL.createObjectURL(ImageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);

            console.log({resumeUrl, imageUrl, feedback: data.feedback });
            
        }
        loadResume();
    }, [id])

  return (
    <main className="!pt-8">
        <nav className="resume-nav">
            <Link to='/' className="back-button">
                <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5"/>
                <span className=" text-gray-800 text-sm font-semibold">Back to Homepage</span>
            </Link>
        </nav>
        <div className="flex flex-row w-full max-lg:flex-col-reverse">
            <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky top-0 flex items-center justify-center">
                {imageUrl && resumeUrl && (
                    <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                        <a href={resumeUrl}target="_blank" rel="noopener noreferrer">
                            <img 
                                src={imageUrl}
                                className="w-full h-full object-contain rounded-2xl"
                                title="resume"
                            />
                        </a>
                    </div>
                )}
            </section>
            <section className="feedback-section">
                <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
                {feedback ? (
                    <div className="flex flex-col gap-8 animate-in fade-in duration-1000 overflow-y-auto max-h-screen pb-8">
                        {/* Overall Rating */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall Rating</h3>
                            <div className="text-5xl font-bold text-blue-600 mb-2">{feedback.overall_rating?.toFixed(1) || 'N/A'}/10</div>
                            <p className="text-gray-700 text-lg">{feedback.summary}</p>
                        </div>

                        {/* Score Breakdown */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Score Breakdown</h3>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {[
                                    { label: 'ATS Compatibility', value: feedback.ats_compatibility },
                                    { label: 'Content Quality', value: feedback.content_quality },
                                    { label: 'Format & Design', value: feedback.format_and_design },
                                    { label: 'Impact & Achievements', value: feedback.impact_and_achievements },
                                    { label: 'Match for Role', value: feedback.match_for_role },
                                ].map(item => (
                                    <div key={item.label} className="text-center p-4 bg-gray-100 rounded-lg">
                                        <p className="text-sm font-semibold text-gray-600">{item.label}</p>
                                        <p className="text-3xl font-bold text-blue-600">{item.value || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ATS Feedback */}
                        {feedback.ats_feedback && (
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">ATS Feedback</h3>
                                <p className="text-gray-700">{feedback.ats_feedback}</p>
                            </div>
                        )}

                        {/* Content Feedback */}
                        {feedback.content_feedback && (
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Content Feedback</h3>
                                <p className="text-gray-700">{feedback.content_feedback}</p>
                            </div>
                        )}

                        {/* Format Feedback */}
                        {feedback.format_feedback && (
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Format & Design Feedback</h3>
                                <p className="text-gray-700">{feedback.format_feedback}</p>
                            </div>
                        )}

                        {/* Impact Feedback */}
                        {feedback.impact_feedback && (
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Impact & Achievements Feedback</h3>
                                <p className="text-gray-700">{feedback.impact_feedback}</p>
                            </div>
                        )}

                        {/* Match Feedback */}
                        {feedback.match_feedback && (
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Role Match Feedback</h3>
                                <p className="text-gray-700">{feedback.match_feedback}</p>
                            </div>
                        )}

                        {/* Missing Keywords */}
                        {feedback.keywords_missing && feedback.keywords_missing.length > 0 && (
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Missing Keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {feedback.keywords_missing.map((keyword: string, idx: number) => (
                                        <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Improvement Suggestions */}
                        {feedback.improvement_suggestions && feedback.improvement_suggestions.length > 0 && (
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Improvement Suggestions</h3>
                                <ol className="list-decimal list-inside space-y-2">
                                    {feedback.improvement_suggestions.map((suggestion: string, idx: number) => (
                                        <li key={idx} className="text-gray-700">{suggestion}</li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                ) : (
                    <img src="/images/resume-scan-2.gif" className="w-full"/>
                )}
            </section>
        </div>
    </main>
  )
}

export default Resume