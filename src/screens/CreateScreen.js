import React, { useContext } from "react";
import { Context as BlogContext } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateBlog = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);

  // the title and content will be passed when the blogPostForm calls onSubmit
  return (
    <BlogPostForm
      onSubmit={(title, content) => {
        addBlogPost(title, content, () => navigation.navigate("Index"));
      }}
    />
  );
};

// We're passing a callback in the AddBlogPost dispatch, so that we only navigate once the action to save the new post is complete -- specially interesting in case we need to wait for an api response, which may take a while or fail

export default CreateBlog;
