"use client"; // Ensure this is a client-side component

import React, { useState } from "react";
import Navbar from "../../components/Navbar"; // Import Navbar component
import BlogCard from "../../components/BlogCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const tags = ["All", "Latest", "AI", "Insurance", "Doctor"]; // Removed duplicate 'All'

  const router = useRouter(); // Use the router from next/navigation

  // Function to extract unique tags from blog posts
  const extractTags = (posts) => {
    if (!posts || !Array.isArray(posts)) return ["All", "Latest"]; // Ensure posts is an array
    const allTags = posts.flatMap((post) => post.tags || []); // Safely access tags
    const uniqueTags = ["All", "Latest", ...new Set(allTags)]; // Always include "All" and "Latest"
    return uniqueTags;
  };

  // Fetch blogs from your API
  const fetchBlogs = async (page) => {
    const response = await fetch(
      `http://192.168.43.84:8000/blogs?page=${page}&page_size=6`
    );
    const data = await response.json();
    setBlogs(data.posts);
    setTotalPages(data.total_pages);
    setCurrentPage(data.current_page);

    // Extract tags from the fetched posts and set the tags state
    const uniqueTags = extractTags(data.posts);
    setTags(uniqueTags);
  };

  // Fetch blogs on initial render and when the page changes
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  // Function to filter blogs by tags
  const filteredBlogs = blogs.filter((blog) => {
    if (selectedTag === "All") return true;
    return blog.tags.includes(selectedTag);
  });


  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div className="container mx-auto mt-8 px-6">
        {/* Search Bar and Tags in Desktop View */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          {/* Tags with vertical and horizontal spacing */}
          <div className="flex flex-wrap justify-center space-x-4 space-y-0.5 ">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-5 py-2 rounded-full border text-sm font-medium ${
                  selectedTag === tag
                    ? "bg-green-100 text-gray-500 border-primary"
                    : "bg-white text-gray-500 border-gray-300"
                } hover:border-primary hover:text-primary`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Bar aligned to the right in Desktop view */}
          <div className="relative mt-4 md:mt-0 w-full md:w-1/3 lg:w-1/4">
            <input
              className="w-full px-8 py-2 pl-12 bg-white border border-gray-300 rounded-full focus:outline-none"
              placeholder="Search"
              type="text"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-5 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              title={blog.title}
              date={blog.date}
              content={blog.content}
              author={blog.author}
              tags={blog.tags}
            />
          ))}
        </div>
      </div>
    </>
  );
}
