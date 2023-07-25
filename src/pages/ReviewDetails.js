import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client'
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

const REVIEW = gql`
query GetReview($id:ID!){
  review(id: $id){
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

const ReviewDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables:{id: id}
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);

  return (
    <div>
      {
        <div key={data.review.data.id} className="review-card">
          <div className="rating">{data.review.data.attributes.rating}</div>
          <h2>{data.review.data.attributes.title}</h2>

          <small>console list</small>

          <ReactMarkdown>{`${data.review.data.attributes.body.substring(0, 200)}...`}</ReactMarkdown>
          
        </div>
      }
    </div>
  );
};

export default ReviewDetails;
