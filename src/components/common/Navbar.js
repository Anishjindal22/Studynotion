import React, { useEffect, useState, useRef } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSearch, IoClose } from "react-icons/io5";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import NotificationBell from "./NotificationBell";
import { apiConnector } from "../../services/apiconnector";
import { categories, courseEndpoints } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import useDebounce from "../../hooks/useDebounce";
import { ACCOUNT_TYPE } from "../../utils/constants";
import "./loader.css";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 500);
  const searchRef = useRef(null);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      const data = result?.data?.data || [];
      setSubLinks(data);
    } catch (error) {
      console.log("Could not fetch the category list", error);
      setSubLinks([]);
    }
  };

  useEffect(() => {
    fetchSublinks();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debounced search — only calls backend after 500ms of no typing
  useEffect(() => {
    const fetchSearch = async () => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      setSearchLoading(true);
      try {
        const res = await apiConnector(
          "GET",
          `${courseEndpoints.SEARCH_COURSES_API}?query=${encodeURIComponent(debouncedQuery)}&limit=6`
        );
        if (res?.data?.success) {
          setSearchResults(res.data.data);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        setSearchResults([]);
      }
      setSearchLoading(false);
    };
    fetchSearch();
  }, [debouncedQuery]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on route change
  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }, [location.pathname]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex justify-center ${scrolled ? "py-2" : "py-6"}`}>
      <div className={`flex items-center justify-between w-11/12 max-w-maxContent transition-all duration-300 rounded-2xl px-6 py-3 ${scrolled ? "bg-surface-light/80 backdrop-blur-md border border-surface-border" : "bg-transparent border border-transparent"}`}>
        
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <span className="h-8 w-8 rounded-full border border-text-main text-text-main grid place-items-center font-semibold text-sm">TM</span>
          <span className="text-xl font-semibold tracking-tight text-white">Tutor Master</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-text-muted font-medium text-sm tracking-wide">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative group">
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-1 cursor-pointer transition-colors hover:text-brand-secondary">
                    <p>{link.title}</p>
                    <IoIosArrowDown className="transition-transform duration-300 group-hover:-rotate-180" />

                    <div className="absolute top-full right-1/2 translate-x-1/2 pt-5 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">
                      <div className="relative flex flex-col rounded-xl bg-surface-dim border border-surface-border shadow-2xl p-2 w-[280px] overflow-hidden">
                        
                        {subLinks && subLinks.length > 0 ? (
                          subLinks.map((subLink, index) => (
                            <Link
                              className="relative overflow-hidden rounded-lg px-4 py-3 text-text-main transition-all hover:bg-surface-light group/link"
                              to={`/catalog/${encodeURIComponent(subLink.name)}`}
                              key={index}
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-text-muted opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                                {subLink.name}
                              </span>
                            </Link>
                          ))
                        ) : (
                          <div className="flex justify-center p-4"><span className="loader"></span></div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} className="relative py-1 flex flex-col">
                    <p className={`transition-colors duration-300 hover:text-text-main ${matchRoute(link?.path) ? "text-text-main" : ""}`}>
                      {link.title}
                    </p>
                    <span className={`absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-brand-secondary transition-transform duration-300 origin-left ${matchRoute(link?.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 opacity-50"}`}></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section: Search + Cart + Auth */}
        <div className="hidden md:flex gap-x-3 items-center">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            {!searchOpen ? (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-text-muted hover:text-white transition-colors"
                aria-label="Search courses"
              >
                <IoSearch className="text-xl" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="w-[240px] rounded-lg bg-surface-dim border border-surface-border text-white text-sm px-3 py-2 pl-9 outline-none focus:border-brand-primary transition-all"
                    autoFocus
                  />
                  <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm" />
                </div>
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); setSearchResults([]); }}
                  className="p-1 text-text-muted hover:text-white transition-colors"
                >
                  <IoClose className="text-lg" />
                </button>
              </div>
            )}

            {/* Search Results Dropdown */}
            {searchOpen && (searchResults.length > 0 || searchLoading || debouncedQuery.length >= 2) && (
              <div className="absolute top-full right-0 mt-2 w-[340px] bg-surface-dim border border-surface-border rounded-xl shadow-2xl overflow-hidden z-50">
                {searchLoading ? (
                  <div className="flex justify-center p-4"><span className="loader"></span></div>
                ) : searchResults.length > 0 ? (
                  <div className="max-h-[360px] overflow-y-auto">
                    {searchResults.map((course) => (
                      <Link
                        key={course._id}
                        to={`/courses/${course._id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-surface-light transition-colors border-b border-surface-border last:border-b-0"
                      >
                        <img
                          src={course.thumbnail}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {course.courseName}
                          </p>
                          <p className="text-xs text-text-muted">
                            {course.instructor?.firstName} {course.instructor?.lastName} · ₹{course.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-text-muted">
                    No courses found for "{debouncedQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link to="/dashboard/cart" className="relative group p-2">
              <AiOutlineShoppingCart className="text-2xl text-text-muted group-hover:text-brand-secondary transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 grid h-5 w-5 place-items-center rounded-full bg-brand-accent text-xs font-bold text-white shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="px-5 py-2 text-sm font-medium text-text-main hover:text-brand-secondary transition-colors">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 text-sm font-medium text-white bg-surface-light rounded-lg border border-surface-border hover:bg-surface-dim transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {token !== null && <NotificationBell />}
          {token !== null && <ProfileDropDown />}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-text-main text-2xl hover:text-brand-secondary transition-colors">
          <RxHamburgerMenu />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
