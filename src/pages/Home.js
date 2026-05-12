import React from 'react'
import {FaArrowRight, FaCode} from "react-icons/fa"
import {Link} from "react-router-dom"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import Footer from '../components/common/Footer'
import ReviewSlider from "../components/common/ReviewSlider"

const GlowingButton = ({ text, primary, linkto }) => (
  <Link to={linkto} className="inline-block">
    <div className={`relative group px-8 py-4 font-bold rounded-xl overflow-hidden transition-all duration-300 border ${primary ? 'bg-surface-light border-surface-border text-white hover:bg-surface-dim' : 'bg-transparent text-text-main hover:text-white border-surface-border'}`}>
      <div className="relative z-10 flex items-center gap-3">
        {text}
        {primary && <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />}
      </div>
    </div>
  </Link>
);

const Home = () => {
  return (
    <div className="relative bg-surface-dark overflow-hidden font-display pt-24">
      <div className="relative z-10 w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 py-20">
        
        {/* Left Content */}
        <div className="flex flex-col items-start lg:w-[55%] gap-8">
          <Link to={"/signup"}>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-surface-border bg-surface-dim text-text-main text-sm font-medium hover:bg-surface-light transition-colors group">
              Become an Instructor
              <FaArrowRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </div>
          </Link>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            Architect your future in <br/>
            <span className="text-text-main">Software Engineering</span>
          </h1>

          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl font-inter">
            Master modern tech stacks with interactive environments. Real-world projects, expert mentorship, and a global community waiting for your contributions.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <GlowingButton text="Start Coding Now" primary={true} linkto="/signup" />
            <GlowingButton text="View Curriculum" primary={false} linkto="/login" />
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-8 pt-10 border-t border-surface-border w-full mt-4">
            <div>
              <p className="text-3xl font-bold text-white">100k+</p>
              <p className="text-sm text-text-faint uppercase tracking-wider font-semibold mt-1">Active Devs</p>
            </div>
            <div className="w-[1px] h-12 bg-surface-border"></div>
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-text-faint uppercase tracking-wider font-semibold mt-1">Projects Built</p>
            </div>
            <div className="w-[1px] h-12 bg-surface-border"></div>
            <div>
              <p className="text-3xl font-bold text-white">4.9/5</p>
              <p className="text-sm text-text-faint uppercase tracking-wider font-semibold mt-1">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="lg:w-[45%] relative">
          <div className="relative rounded-2xl overflow-hidden border border-surface-border bg-surface-dim p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Why Tutor Master</h3>
            <ul className="text-text-muted space-y-4 font-inter">
              <li>Structured course paths</li>
              <li>Practical assignments and projects</li>
              <li>Clear progress tracking</li>
              <li>Simple and distraction-free learning</li>
            </ul>
          </div>
          <div className="absolute -bottom-8 -left-8 bg-surface-light border border-surface-border p-4 rounded-xl shadow-xl flex items-center gap-4">
            <div className="bg-brand-primary/20 p-3 rounded-lg text-brand-primary">
              <FaCode size={24} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Clean Experience</p>
              <p className="text-text-muted text-xs">Focused on learning</p>
            </div>
          </div>
        </div>

      </div>

      <div className="relative z-10 w-11/12 max-w-maxContent mx-auto py-10">
        <div className="bg-surface-dim/30 border border-surface-border rounded-3xl p-8 lg:p-12">
          <CodeBlocks 
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl md:text-5xl font-extrabold text-white'>
                Learn by building
                <span className="block mt-2 text-text-main">
                  real projects
                </span>
              </div>
            }
            subheading={
              "Short focused lessons, guided coding practice, and instant feedback to help you improve faster."
            }
            ctabtn1={{
              btnText: "Start Free",
              linkto: "/signup"
            }}
            ctabtn2={{
              btnText: "Browse Courses",
              linkto: "/catalog/web-development"
            }}
          />
        </div>
      </div>

      <div className='w-11/12 mx-auto max-w-maxContent py-12'>
        <h2 className='text-center text-4xl lg:text-5xl font-extrabold mb-4 text-white'>
          Voices from the Community
        </h2>
        <p className="text-center text-text-muted mb-12 max-w-2xl mx-auto">
          Real feedback from learners growing their careers on Tutor Master.
        </p>
        <div className="relative">
          <ReviewSlider />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-surface-dim border-t border-surface-border mt-10">
        <Footer />
      </div>
    </div>
  )
}

export default Home


