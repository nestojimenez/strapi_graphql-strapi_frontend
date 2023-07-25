import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const SiteHeader = () => {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading catgories...</p>;
  if (error) return <p>Error fetching categories</p>;

  console.log("Categories", data);
  return (
    <div className="site-header">
      <Link to="/">
        <h1>Ninja Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {data.categories.data.map(category=>(
          <Link key={category.id} to={`/category/${category.id}`}>{category.attributes.name} </Link>
        ))}
      </nav>
    </div>
  );
};

export default SiteHeader;
