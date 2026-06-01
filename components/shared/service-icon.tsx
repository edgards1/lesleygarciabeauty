import {
  FiCamera,
  FiFeather,
  FiHeart,
  FiPlayCircle,
  FiShoppingBag,
  FiStar,
  FiVideo,
} from "react-icons/fi";

interface ServiceIconProps {
  name:
    | "brush"
    | "glow"
    | "camera"
    | "ugc"
    | "tiktok"
    | "reels"
    | "review";
}

export function ServiceIcon({ name }: ServiceIconProps) {
  switch (name) {
    case "brush":
      return <FiFeather className="h-6 w-6" />;
    case "glow":
      return <FiHeart className="h-6 w-6" />;
    case "camera":
      return <FiCamera className="h-6 w-6" />;
    case "ugc":
      return <FiVideo className="h-6 w-6" />;
    case "tiktok":
      return <FiPlayCircle className="h-6 w-6" />;
    case "reels":
      return <FiShoppingBag className="h-6 w-6" />;
    case "review":
    default:
      return <FiStar className="h-6 w-6" />;
  }
}
