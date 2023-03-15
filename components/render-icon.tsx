import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMailBulk,
  FaQuora,
  FaWordpress,
} from 'react-icons/fa';

export default function RenderIcon({
  className,
  platform,
}: {
  className: string;
  platform: string;
}) {
  switch (platform) {
    case 'discord':
      return <FaDiscord className={className} />;
    case 'email':
      return <FaMailBulk className={className} />;
    case 'facebook':
      return <FaFacebook className={className} />;
    case 'instagram':
      return <FaInstagram className={className} />;
    case 'linkedin':
      return <FaLinkedin className={className} />;
    case 'quora':
      return <FaQuora className={className} />;
    case 'wordpress':
      return <FaWordpress className={className} />;
    default:
      return <></>;
  }
}
