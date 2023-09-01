import type { Thumbnail } from "../payload-types";
import defaultImage from "../assets/images/default.jpg";

export type Title = string;

type Props = {
  title: string;
  summary: string;
  href: string;
  thumbnail: Thumbnail | string | undefined;
};

const handleThumbnail = (thumbnail: Thumbnail | string | undefined): string => {
  if (!thumbnail) {
    return defaultImage.src;
  }
  if (typeof thumbnail === "string") {
    return thumbnail;
  }

  const nonNullThumbnail = thumbnail as Thumbnail;
  return nonNullThumbnail?.url !== undefined ? import.meta.env.PAYLOAD_URL + nonNullThumbnail.url : defaultImage.src;
};

const NewsCard = ({ title, summary, href, thumbnail }: Props) => {
  return (
    <div className="z-0 mb-5 flex w-[25rem] snap-start flex-col rounded-md bg-[#275AE0] px-0 py-0 text-slate-50 shadow-lg">
      <img
        className="aspect-video rounded-md object-cover"
        src={handleThumbnail(thumbnail)}
        alt=""
      />
      <div className="px-7 py-5">
        <h3 className="text-2xl font-bold capitalize">{title}</h3>
        <p className="text-sm font-light pt-2 pb-5">{summary}</p>
        <a href={href} className="w-fit underline font-medium hover:text-neutral-200">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
