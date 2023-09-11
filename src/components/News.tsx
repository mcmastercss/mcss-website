import NewsCard from "./NewsCard";
import { getStaticPaths } from "../pages/posts/[slug].astro";

import type { Post } from "../payload-types";
import type { FetchedPost } from "../types";

const posts = await getStaticPaths();

const getMostRecentPosts = (
  fetchedPosts: FetchedPost[],
  maxNumberOfPosts: number,
): Post[] => {
  let publishedPosts: Post[] = [];
  for (const fetchedPost of fetchedPosts) {
    if (publishedPosts.length >= maxNumberOfPosts) {
      break;
    }
    if (fetchedPost.props.post.status !== "published") {
      continue;
    }
    if (typeof fetchedPost.props.post.category === "string") {
      if (fetchedPost.props.post.category !== "News") {
        continue;
      }
    } else {
      if (fetchedPost.props.post.category.name !== "News") {
        continue;
      }
    }
    publishedPosts.push(fetchedPost.props.post);
  }
  return publishedPosts;
};

const NewsSection = () => {
  return (
    <div className="flex flex-col p-8 lg:pl-20 lg:pr-12 xl:pl-44 xl:pr-20">
      <h2 className="mb-5 text-3xl font-bold text-blue-700">News</h2>
      <div className="grid snap-x auto-cols-min grid-flow-col gap-8 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-900 scrollbar-thumb-rounded-3xl">
        {getMostRecentPosts(posts, 10).map((post, index) => {
          return (
            <NewsCard
              key={index}
              title={post.title}
              summary={post.summary}
              href={"/posts/" + post.slug}
              thumbnail={post.thumbnail}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsSection;
