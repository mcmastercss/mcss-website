import type { Thumbnail } from "../payload-types";
import defaultImage from "../assets/images/default.jpg";

export type Title = string;

type Props = {
  title: string;
  summary: string;
  href: string;
  thumbnail: Thumbnail | string | undefined;
};

const capString = (inputString:string, maxLength:number) => {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.slice(0, maxLength) + '...';
  }
}

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
    <div className="z-0 mb-5 flex w-[23rem] snap-start flex-col rounded-md bg-[#275AE0] px-0 py-0 text-slate-50 shadow-lg">
      <img
        className="aspect-video rounded-md object-cover"
        src={handleThumbnail(thumbnail)}
        alt=""
      />
      <h3 className="text-2xl font-bold px-8 pt-5 pb-3 capitalize">{title}</h3>
      <p className="text-sm px-8 font-light">{capString(summary, 300)}</p>
      <a href={href} className="mt-auto px-8 pt-4 pb-5 underline font-semibold hover:text-neutral-200">
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
