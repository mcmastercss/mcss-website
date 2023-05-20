import React from "react";
import NewsCard from "../components/NewsCard.jsx";
import { getStaticPaths } from "../pages/posts/[slug].astro";

const posts = await getStaticPaths();

const NewsSection = () => {
  return (
    <div className="flex flex-col p-8 lg:pl-20 lg:pr-12 xl:pl-44 xl:pr-20">
      <h2 className="mb-5 text-3xl font-bold text-blue-700">News</h2>
      <div className="grid snap-x grid-flow-col space-x-8 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-900 scrollbar-thumb-rounded-3xl">
        {[...Array(Math.min(posts.length, 10))].map((value, index) => {
          return (
            posts[index]?.props.post.status === "published" && (
              <NewsCard
                key={index}
                title={posts[index]?.props.post.title}
                body={posts[index]?.props.post.description}
                href={"/posts/" + posts[index]?.props.post.slug}
                thumbnail={posts[index]?.props.post.thumbnail?.url}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default NewsSection;
