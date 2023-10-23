import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReviewForm from "../reviewForm/ReviewForm";
import api from "../../api/axiosConfig";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  // use useRef hook to reference the text area within the review form
  const revText = useRef();
  // useParam to extract movieId param from the relevant url
  let params = useParams();

  // imdbId of the movie(retrieved through the api call from the array of movie data from the server)
  const movieId = params.movieId;

  // when the components first loads, call the method that is passed in as a prop to the component in order to retrieve the appropriate data for the relevant movie that user wish to leave the review
  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const review = revText.current;

    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: review.value,
        imdbId: movieId,
      });

      const updatedReviews =
        reviews != null
          ? [...reviews, { body: review.value }]
          : [{ body: review.value }];

      review.value = "";

      setReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="movie-poster" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((review) => {
            return (
              <>
                <Row>
                  <Col>{review.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
