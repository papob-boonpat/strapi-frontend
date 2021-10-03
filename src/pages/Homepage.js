import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
const REVIEWS = gql`
  query GetReviews {
    reviews {
      title
      body
      rating
      id
    }
  }
`;

const Homepage = () => {
  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <p>Loading......</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <div>
      {data?.reviews?.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>
          <small>cosole list</small>
          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
