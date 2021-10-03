import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      id
    }
  }
`;
const SiteHeader = () => {
  const { loading, data, error } = useQuery(CATEGORIES);

  if (loading) return <p>Loading Categories....</p>;
  if (error) return <p>Error Fecthing Categories</p>;
  return (
    <div className="site-header">
      <Link to="/">
        <h1>Strong Reviews</h1>
        <nav className="categories">
          <span>Filter reviews by categories:</span>
          {data.categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              {category.name}
            </Link>
          ))}
        </nav>
      </Link>
    </div>
  );
};

export default SiteHeader;
