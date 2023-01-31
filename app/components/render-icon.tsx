import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMailBulk,
  FaQuora,
  FaWordpress,
} from 'react-icons/fa';

export default function RenderIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'discord':
      return <FaDiscord />;
    case 'email':
      return <FaMailBulk />;
    case 'facebook':
      return <FaFacebook />;
    case 'instagram':
      return <FaInstagram />;
    case 'linkedin':
      return <FaLinkedin />;
    case 'quora':
      return <FaQuora />;
    case 'wordpress':
      return <FaWordpress />;
    default:
      return <></>;
  }
}
