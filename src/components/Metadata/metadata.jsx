import { Helmet } from "react-helmet";

const MetaData = ({ title, content }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
  );
};

export default MetaData;
