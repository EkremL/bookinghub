"use client";
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   EmailShareButton,
//   FacebookIcon,
//   XIcon,
//   WhatsappIcon,
//   EmailIcon,
// } from "react-share";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  // Geçersiz props'ları çıkarıyoruz (örneğin, networkName, networkLink vb.)
  // const { networkName, networkLink, ...cleanRest } = rest;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        {/* <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
          {...cleanRest}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
          {...cleanRest}
        >
          <XIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator="::"
          {...cleanRest}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property listing: ${shareUrl}`}
          {...cleanRest}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton> */}

        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={40} />
        </Link>
        <Link
          href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter size={40} />
        </Link>
        <Link
          href={`https://wa.me/?text=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={40} />
        </Link>
      </div>
    </>
  );
};

export default ShareButtons;
