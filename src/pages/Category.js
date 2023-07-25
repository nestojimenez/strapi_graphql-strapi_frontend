import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const CATEGORY = gql`
  query GetCategorie($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                title
                rating
                body
                categories {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
const Category = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  console.log("Categorie", data);

  if (loading) return <p>Loading category...</p>;
  if (error) return <p>Error fetching category</p>;

  return <div>
    <h2>{data.category.data.attributes.name}</h2>
    {data.category.data.attributes.reviews.data.map(review=>(
      <div key={review.id} className="review-card">
        <div className="rating">{review.attributes.rating}</div>
        <h2>{review.attributes.title}</h2>

        {review.attributes.categories.data.map(category=>(
          <small key={category.id}>{category.attributes.name}</small>
        ))}
        

        <p>{review.attributes.body.substring(0, 200)}...</p>
        <Link to={`/details/${review.id}`}></Link>
      </div>
    ))}
  </div>;
};

export default Category;
