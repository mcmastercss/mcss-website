import React from "react";
import NewsCard from "../components/NewsCard.jsx";

const NewsSection = () => {
  const articleTitle = "New CAS Guidelines";
  const articleBody = `Sunt incididunt voluptate in consequat id. Sit fugiat fugiat sint anim nulla
  voluptate elit ad ullamco. Labore sit do culpa. Sunt aliquip excepteur laboris occaecat occaecat
  eu ut aasdf sadfk asdf dolor ita dame dame da...`;

  return (
    <div className="flex flex-col p-8 lg:pl-20 lg:pr-12">
      <h2 className="mb-5 text-3xl font-bold text-blue-700">News</h2>
      <div className="grid snap-x grid-flow-col space-x-8 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-900 scrollbar-thumb-rounded-3xl">
        {[...Array(8)].map((value, index) => {
          return (
            <NewsCard
              key={index}
              title={articleTitle}
              body={articleBody}
              href="#"
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsSection;
