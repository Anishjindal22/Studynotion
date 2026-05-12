import React from 'react'
import { BsFillChatRightDotsFill } from 'react-icons/bs';
import { BsGlobeAmericas } from 'react-icons/bs';
import { IoIosCall } from 'react-icons/io';
import ContactUsForm from '../components/ContactPage/ContactUsForm';
import Footer from '../components/common/Footer';

const ContactPage = () => {
    const contactData = [
        {
            title: "Chat with us",
            desc: "Our friendly team is here to help.",
            address: "hello@Tutor Master.com",
            icon: BsFillChatRightDotsFill
        },
        {
            title: "Visit us",
            desc: "Come and say hello at our HQ.",
            address: "Akshya Nagar 1st Block, Bangalore",
            icon: BsGlobeAmericas
        },
        {
            title: "Call us",
            desc: "Mon - Fri From 8am to 5pm",
            address: "+1 234 567 890",
            icon: IoIosCall
        },
    ];

  return (
    <div className="bg-surface-dark min-h-screen text-text-main pt-24">
        
        {/* Header */}
        <div className="mx-auto w-11/12 max-w-maxContent text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">Get in touch</h1>
            <p className="text-text-muted text-lg">We'd love to hear from you. Please fill out this form or drop us an email.</p>
        </div>

        <div className='mx-auto mb-24 flex w-11/12 max-w-maxContent flex-col lg:flex-row gap-8 lg:gap-16'>
            
            {/* Contact Info Cards */}
            <div className='lg:w-1/3 flex flex-col gap-6'>
                {contactData.map((data, index) => (
                    <div key={index} className='flex flex-col gap-3 p-8 rounded-2xl bg-surface-dim/40 border border-surface-border'>
                        <div className="bg-surface-light w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary mb-2">
                             <data.icon size={20}/>
                        </div>
                        <h2 className="text-xl font-bold text-white">{data.title}</h2>
                        <p className="text-text-muted text-sm">{data.desc}</p>
                        <p className="font-semibold text-text-main mt-2">{data.address}</p>
                    </div>
                ))}
            </div>

            {/* Form Container */}
            <div className='lg:w-2/3'>
                <div className='bg-surface-dim border border-surface-border rounded-3xl p-8 lg:p-12'>
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-3">Shoot us a message</h2>
                        <p className="text-text-muted">Tell us more about yourself and what you've got in mind.</p>
                    </div>
                    
                    {/* The ContactUsForm component uses inputs - let's make sure it doesn't look completely disjointed. 
                        Usually ContactUsForm uses generic inputs. We will wrap it to let it inherit dark mode context safely. */}
                    <div className="[&_label]:text-sm [&_label]:text-text-muted [&_input]:bg-surface-dark [&_input]:border-surface-border [&_input]:text-white [&_textarea]:bg-surface-dark [&_textarea]:border-surface-border [&_textarea]:text-white [&_button]:bg-brand-primary [&_button]:text-black [&_button]:rounded-lg [&_button]:font-semibold [&_button]:shadow-none">
                        <ContactUsForm /> 
                    </div>
                </div>
            </div>
        </div>
        
        <Footer/>
    </div>
  )
}

export default ContactPage
