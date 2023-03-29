import React from 'react';
import defaultImage from "../assets/images/default.jpg";


const NewsCard = ({ title, body, href }) => {
  return (
    <div
      className="w-[25rem] flex flex-col bg-[#275AE0] text-slate-50 px-6 py-8 rounded-md shadow-lg snap-start mb-5"
    >
      <img src={defaultImage.src} alt="" className="object-cover mb-3 rounded-md aspect-video" />
      <h3 className="text-2xl font-bold">
        {title}
      </h3>
      <p className="py-4 text-sm">
        {body}
      </p>
      <a href={href} className="text-lg font-bold w-fit hover:text-neutral-200">Read More</a>
    </div>
  );
}

export default NewsCard;
