import React from 'react'
import Footer from '../components/common/Footer'
import ReviewSlider from "../components/common/ReviewSlider"
import { FaGraduationCap, FaCodeBranch, FaUsers, FaLaptopCode } from 'react-icons/fa'

const About = () => {
  return (
    <div className='bg-surface-dark min-h-screen text-text-main font-inter pt-20'>
      
      {/* Header Section */}
      <section className='bg-surface-dim/20 border-b border-surface-border'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center text-center gap-6 py-20 lg:py-32'>
                    <h1 className='text-4xl lg:text-6xl font-extrabold text-white tracking-tight'>
                        About Tutor Master
                    </h1>
                    <p className='text-lg lg:text-xl text-text-muted leading-relaxed max-w-3xl'>
                        Tutor Master was built on a simple premise: the best way to learn software engineering is by actually building software. We provide the structure, the sandbox, and the community to make it happen.
                    </p>
        </div>
      </section>

      {/* Grid Features */}
      <section className='mx-auto w-11/12 max-w-maxContent py-20 lg:py-32'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='p-8 rounded-2xl bg-surface-dark border border-surface-border flex flex-col gap-4 hover:border-text-muted transition-colors'>
                <div className='bg-surface-light w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary'>
                    <FaGraduationCap size={24}/>
                </div>
                <h3 className='text-xl font-bold text-white'>Expert Curriculum</h3>
                <p className='text-text-muted text-sm leading-relaxed'>Designed by industry veterans who know exactly what skills are needed in today's tech market.</p>
            </div>
            
            <div className='p-8 rounded-2xl bg-surface-dark border border-surface-border flex flex-col gap-4 hover:border-text-muted transition-colors'>
                <div className='bg-surface-light w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary'>
                    <FaCodeBranch size={24}/>
                </div>
                <h3 className='text-xl font-bold text-white'>Real Projects</h3>
                <p className='text-text-muted text-sm leading-relaxed'>No more tutorial hell. Every course ends with a portfolio-ready project you can showcase.</p>
            </div>

            <div className='p-8 rounded-2xl bg-surface-dark border border-surface-border flex flex-col gap-4 hover:border-text-muted transition-colors'>
                <div className='bg-surface-light w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary'>
                    <FaLaptopCode size={24}/>
                </div>
                <h3 className='text-xl font-bold text-white'>Interactive Sandbox</h3>
                <p className='text-text-muted text-sm leading-relaxed'>Write, compile, and execute code directly in your browser without any local setup.</p>
            </div>

            <div className='p-8 rounded-2xl bg-surface-dark border border-surface-border flex flex-col gap-4 hover:border-text-muted transition-colors'>
                <div className='bg-surface-light w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary'>
                    <FaUsers size={24}/>
                </div>
                <h3 className='text-xl font-bold text-white'>Global Support</h3>
                <p className='text-text-muted text-sm leading-relaxed'>Join thousands of peers. Get unblocked fast with our comprehensive Q&A forums and mentor network.</p>
            </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='bg-surface-dim/40 border-y border-surface-border'>
        <div className='mx-auto w-11/12 max-w-maxContent py-20 lg:py-28'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                <div className='flex flex-col gap-6'>
                    <span className='text-sm font-bold tracking-widest text-text-muted uppercase'>Our Vision</span>
                    <h2 className='text-3xl lg:text-4xl font-bold text-white leading-tight'>Empowering minds through accessible technology education.</h2>
                    <p className='text-text-light leading-relaxed text-lg'>We envision a world where anyone, anywhere can transform their life through technology. We're removing the barriers to high-quality software engineering education by focusing on practical, hands-on learning rather than theoretical lectures.</p>
                </div>
                <div className='flex flex-col gap-6'>
                    <span className='text-sm font-bold tracking-widest text-brand-primary uppercase'>Our Mission</span>
                    <h2 className='text-3xl lg:text-4xl font-bold text-white leading-tight'>Build the premier bridge between ambition and employment.</h2>
                    <p className='text-text-light leading-relaxed text-lg'>Our mission is simple: provide learners with an affordable, interactive, and rigorous platform that exactly mimics the real-world software engineering environment. When you graduate from a Tutor Master path, you are ready for day one on the job.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Reviews */}
      <div className="mx-auto my-24 w-11/12 max-w-maxContent flex flex-col items-center gap-10">
        <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Learner Reviews</h2>
            <p className="text-text-muted">Don't just take our word for it. See what our community is saying.</p>
        </div>
        <div className="w-full">
            <ReviewSlider />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default About
