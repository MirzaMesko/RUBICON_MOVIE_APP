import React from "react";

type Props = {
  review: {
    author: string;
    created_at: string;
    updated_at: string;
    author_details: {
      avatar_path: string | null;
    };
    content: string;
  };
};

const Review: React.FC<Props> = ({ review }: Props) => {
  const userImage = review.author_details?.avatar_path
    ? `https://image.tmdb.org/t/p/w400/${review.author_details.avatar_path}`
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png";

  return (
    <div className="review-container">
      <div>
        <img src={userImage} alt="" className="review-image" data-testid='review-image'/>
        <p>{review.author}</p>
      </div>
      <div className="review-content" >
        <div>
          <p style={{ color: "#ccc" }} data-testid='review-created'>
            {new Date(review.created_at).toDateString()}
          </p>
          <p data-testid='review-content'>{review.content}</p>
        </div>
        {review.updated_at && (
          <p style={{ color: "#ccc" }} data-testid='review-updated'>
            Edited {new Date(review.updated_at).toDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Review;
