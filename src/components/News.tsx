import React from "react";
import NewsCard from "./NewsCard";
import { getStaticPaths } from "../pages/posts/[slug].astro";

import type { Post, Thumbnail } from "../payload-types";
import type { FetchedPost } from "../types";

const posts = await getStaticPaths();

const getMostRecentPosts = (
  fetchedPosts: FetchedPost[],
  minNumberOfPosts: number,
): Post[] => {
  // get the first minNumberOfPosts published posts
  let publishedPosts: Post[] = [];
  for (const fetchedPost of fetchedPosts) {
    if (publishedPosts.length >= minNumberOfPosts) {
      break;
    }
    if (fetchedPost.props.post.status !== "published") {
      continue;
    }
    publishedPosts.push(fetchedPost.props.post);
  }
  return publishedPosts;
};

const handleThumbnail = (thumbnail: Thumbnail | string | undefined): string => {
  if (!thumbnail) {
    return "";
  }
  if (typeof thumbnail === "string") {
    return thumbnail;
  }

  const nonNullThumbnail = thumbnail as Thumbnail;
  return nonNullThumbnail.url ?? "";
};

const NewsSection = () => {
  return (
    <div className="flex flex-col p-8 lg:pl-20 lg:pr-12 xl:pl-44 xl:pr-20">
      <h2 className="mb-5 text-3xl font-bold text-blue-700">News</h2>
      <div className="grid snap-x grid-flow-col space-x-8 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-900 scrollbar-thumb-rounded-3xl">
        {getMostRecentPosts(posts, 10).map((post, index) => {
          return (
            <NewsCard
              key={index}
              title={post.title}
              body={post.summary}
              href={"/posts/" + post.slug}
              thumbnail={handleThumbnail(post.thumbnail)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsSection;