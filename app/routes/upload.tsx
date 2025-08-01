import type { FormEvent } from 'react';
import { useState } from 'react'
import React from 'react'
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'

const upload = () => {

 const [isProcessing, setIsProcessing] = useState(false);
 const [statusText, setStatus] = useState('');
 const [file, setFile] = useState<File | null>(null);

 const handleFileSelect: (file: File | null) => void = (file: File | null) => {
    setFile(file);
 }

 const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form:HTMLFormElement | null = e.currentTarget.closest('form')
    if(!form) return;
    const formData = new FormData(form);
    const companyName: FormDataEntryValue | null = formData.get('company-name');
    const jobTitle: FormDataEntryValue | null = formData.get('job-title');
    const jobDescription: FormDataEntryValue | null = formData.get('job-description')


    console.log({
        companyName, jobTitle, jobDescription, file
    })
};

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      <section className="main-section px-4 py-8 text-center">
        <div className='page-heading py-16'>
            <h1>Smart feedback for your dream job</h1>
            {isProcessing ? (
                <>
                    <h2>{statusText}</h2>
                    <img src="/images/resume-scan.gif" className='w-full'/>
                </>
            ) : (
                <h2>Drop your resume for an ATS score and improvement tips</h2>
            )}
            {!isProcessing && (
                <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className='form-div'>
                        <label htmlFor='company-name'>Company Name</label>
                        <input type='text' name='company-name' placeholder='Company Name' id='company-name'></input>
                    </div>
                    <div className='form-div'>
                        <label htmlFor='job-title'>Job Title</label>
                        <input type='text' name='job-title' placeholder='Job Title' id='job-title'></input>
                    </div>
                    <div className='form-div'>
                        <label htmlFor='job-description'>Job Description</label>
                        <textarea rows={5} name="job-description" placeholder='Job Description'></textarea>
                    </div>
                     <div className='form-div'>
                        <label htmlFor='uploader'>Upload Resume</label>
                        <FileUploader onFileSelect={handleFileSelect}/>
                    </div>

                    <button className='primary-button' type='submit'>
                        Analyze Resume
                    </button>
                   
                </form>
            )}
        </div>
      </section>
    </main>
  )
}

export default upload