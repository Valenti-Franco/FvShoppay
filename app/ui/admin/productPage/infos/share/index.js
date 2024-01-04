import styles from "./styles.module.scss";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function Share() {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className={styles.share}>
      <FacebookShareButton url={currentUrl}>
        <FacebookIcon size={38} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={currentUrl}>
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={currentUrl}>
        <TwitterIcon size={38} />
      </TwitterShareButton>
      <LinkedinShareButton url={currentUrl}>
        <LinkedinIcon size={38} />
      </LinkedinShareButton>
      <RedditShareButton url={currentUrl}>
        <RedditIcon size={38} />
      </RedditShareButton>
      <TelegramShareButton url={currentUrl}>
        <TelegramIcon size={38} />
      </TelegramShareButton>
      <WhatsappShareButton url={currentUrl}>
        <WhatsappIcon size={38} />
      </WhatsappShareButton>
      <PinterestShareButton url={currentUrl}>
        <PinterestIcon size={38} />
      </PinterestShareButton>
      <EmailShareButton url={currentUrl}>
        <EmailIcon size={38} />
      </EmailShareButton>
    </div>
  );
}
