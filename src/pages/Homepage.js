import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client'
import { Link } from "react-router-dom";

const REVIEWS = gql`
query GetAllReviews{
  reviews{
    data{
      id
      attributes{        
        title
        body
        rating
        
      }
    }
  }
}
`

const Homepage = () => {

  const {loading, error, data} = useQuery(REVIEWS)

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;


  return (
    (
      <div>
        {data.reviews.data.map((review) => (
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>

            <small>console list</small>

            <p>{`${review.attributes.body.substring(0, 200)}...`}</p>
            <Link to={`/details/${review.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    )
  );
};

export default Homepage;
