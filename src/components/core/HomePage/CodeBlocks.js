import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaLaptopCode, FaCheckCircle } from 'react-icons/fa'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock
}) => {
  return (
    <div className={`flex ${position} my-10 lg:my-20 justify-between flex-col lg:flex-row gap-16 lg:gap-10`}>
      
      {/* Text Section */}
      <div className='w-full lg:w-1/2 flex flex-col gap-8'>
          {heading}
          <div className='text-text-muted text-lg leading-relaxed '>
              {subheading}
          </div>

          <div className='flex gap-5 mt-4'>
              <Link to={ctabtn1.linkto} className='inline-flex items-center gap-2 bg-brand-primary text-black font-bold px-6 py-3 rounded-xl hover:bg-brand-primary/90 transition-all'>
                  {ctabtn1.btnText}
                  <FaArrowRight size={14}/>
              </Link>

              <Link to={ctabtn2.linkto} className='inline-flex items-center gap-2 bg-surface-light border border-surface-border text-text-main font-bold px-6 py-3 rounded-xl hover:bg-surface-dim hover:text-white transition-all'>  
                      {ctabtn2.btnText}
              </Link>
          </div>
      </div>

       {/* Feature List Section instead of typewriter code */}
       <div className='w-full lg:w-[45%] flex flex-col gap-6 bg-surface-dark border border-surface-border rounded-2xl p-8 relative overflow-hidden'> 
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>
          
          <div className="flex items-center gap-4 mb-2">
              <div className="bg-surface-light p-3 rounded-xl text-brand-primary">
                  <FaLaptopCode size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">The Tutor Master Edge</h3>
          </div>

          <ul className="space-y-4 text-text-muted">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-brand-primary mt-1 shrink-0" />
              <span><strong className="text-text-main">Short focused lessons:</strong> Skip the fluff and get straight to the core concepts you actually need.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-brand-primary mt-1 shrink-0" />
              <span><strong className="text-text-main">Guided coding practice:</strong> Apply what you learn immediately in our integrated sandbox environment.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-brand-primary mt-1 shrink-0" />
              <span><strong className="text-text-main">Instant feedback:</strong> Receive automated reviews and mentor guidance to help you improve faster.</span>
            </li>
          </ul>
       </div>
    </div>
  )
}

export default CodeBlocks
