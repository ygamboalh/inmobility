import { Helmet } from "react-helmet";

const MetaData = ({ title, description, imageURL, imageAlt }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${imageURL}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image:secure_url" content={`${imageURL}`} />
      <meta
        property="og:url"
        content={
          "https://siccic.com" +
          window.location.pathname +
          window.location.search
        }
      />
      <meta
        property="twitter:url"
        content={
          "https://siccic.com" +
          window.location.pathname +
          window.location.search
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${imageURL}`} />
    </Helmet>
  );
};

export default MetaData;
