import { Helmet } from "react-helmet";

const MetaData = ({
  title,
  content,
  imageURL,
  imageAlt,
  provincia,
  categoria,
  precio,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta name="province" content={provincia} />
      <meta name="category" content={categoria} />
      <meta name="price" content={precio} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${imageURL}`} />
      <meta
        property="og:url"
        content={
          "https://siccic.com" +
          window.location.pathname +
          window.location.search
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:description" content={content} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <meta property="fb:app_id" content="your_app_id" />
      <meta name="twitter:site" content="https://sistemacic.com" />
    </Helmet>
  );
};

export default MetaData;
