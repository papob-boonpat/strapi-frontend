import React from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      title
      body
      rating
      id
      categories {
        name
        id
      }
    }
  }
`;

const ReviewDetails = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id },
  });

  if (loading) return <p>Loading......</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  const MarkdownComponents = {
    // Convert Markdown img to next/image component and set height, width and priority
    // example: ![AltText {priority}{768x432}](...
    p: (paragraph) => {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        const alt = image.properties.alt?.replace(/ *\{[^)]*\} */g, "");
        const isPriority = image.properties.alt
          ?.toLowerCase()
          .includes("{priority}");
        const metaWidth = image.properties.alt.match(/{([^}]+)x/);
        const metaHeight = image.properties.alt.match(/x([^}]+)}/);
        const width = metaWidth ? metaWidth[1] : "100%";
        // const height = metaHeight ? metaHeight[1] : "50%";

        return (
          <img
            src={"http://localhost:1337" + image.properties.src}
            width={width}
            // height={height}
            className="postImg"
            alt={alt}
            priority={isPriority}
          />
        );
      }
      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <div className="review-card">
      <div className="rating">{data.review.rating}</div>
      <h2>{data.review.title}</h2>
      {data.review.categories.map((category) => (
        <small key={category.id}>{category.name}</small>
      ))}
      <ReactMarkdown components={MarkdownComponents}>
        {data.review.body}
      </ReactMarkdown>
    </div>
  );
};

export default ReviewDetails;
