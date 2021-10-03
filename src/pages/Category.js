import React from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CATEGORY = gql`
  query GetCatagory($id: ID!) {
    category(id: $id) {
      name
      id
      reviews {
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
  }
`;

const Category = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(CATEGORY, {
    variables: { id: id },
  });
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <div>
      <h2>{data.category.name}</h2>
      {data?.category.reviews?.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>
          {review.categories.map((category) => (
            <small key={category.id}>{category.name}</small>
          ))}
          <ReactMarkdown>
            {review.body
              .substring(0, 200)
              .replace("/uploads", "localhost:1337/uploads")}
            ...
          </ReactMarkdown>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};
export default Category;
