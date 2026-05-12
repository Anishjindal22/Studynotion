import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Icons
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-surface-dark border-t border-surface-border">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-text-muted leading-6 mx-auto relative pt-16 pb-8">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-surface-border">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-surface-border pl-3 lg:pr-10 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <div className="flex items-center gap-3 mt-1">
                <span className="h-8 w-8 rounded-full border border-text-main text-text-main grid place-items-center font-semibold text-sm">TM</span>
                <span className="text-lg font-semibold tracking-tight text-white">Tutor Master</span>
              </div>
              <h1 className="text-white font-semibold text-[16px] mt-4">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-brand-secondary transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 text-xl mt-4">
                <FaFacebook className="hover:text-[#1877F2] transition-colors cursor-pointer" />
                <FaGoogle className="hover:text-[#EA4335] transition-colors cursor-pointer" />
                <FaTwitter className="hover:text-[#1DA1F2] transition-colors cursor-pointer" />
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-white font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-brand-secondary transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-white font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-brand-secondary transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-white font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-brand-primary transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-white font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-brand-primary transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-10 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-white font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-white transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-11/12 max-w-maxContent mx-auto pb-14 flex flex-col lg:flex-row items-center justify-between text-sm text-text-faint">
        <div className="flex gap-4">
          {BottomFooter.map((item, index) => (
             <Link key={index} to={`/${item.split(" ").join("-").toLowerCase()}`} className="hover:text-white transition-colors border-r border-surface-border pr-4 last:border-none">
              {item}
            </Link>
          ))}
        </div>
        <div className="mt-4 lg:mt-0">
          Made with <span className="text-brand-accent">♥</span> © 2026 Tutor Master
        </div>
      </div>
    </div>
  );
};

export default Footer;