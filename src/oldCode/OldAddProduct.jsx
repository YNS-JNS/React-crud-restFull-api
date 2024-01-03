import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating'

const StyledForm = styled.form`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  /* display: block; */
  margin-bottom: 5px;
  font-weight: bold;
  color: #191919;
`;

const StyledInput = styled.input`
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledTextarea = styled.textarea`
  /* resize: none; */
  width: 400px;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 20%;
`;

const OldAddProduct = () => {

  // ______________________________

  const [urlImg, setUrlImg] = useState("") // To store path image
  // ______________________________

  const nomRef = useRef(null);
  const origineRef = useRef(null)
  const ingredientsRef = useRef(null);
  const [rating, setRating] = useState(0) // To store rating value
  const imageRef = useRef(null)

  // ______________________________

  const handleRating = (rate) => {
    setRating(rate)
  }

  // ______________________________

  // ______________________________
    // Function to handle upload image to cloudinary server
    const handleUploadImage = (image) => {
      // Create an instance from FormData class for handling image
      const formData = new FormData()
      // formData.append('file', uploadImg)
      formData.append('file', image)
      formData.append('upload_preset', "zl2bprmx")

      // Making call api (post)
      axios.post("https://api.cloudinary.com/v1_1/db4rh6kdl/image/upload", formData)
        .then(response => {
          console.log(response.data)
          console.log(response.data.url)
          setUrlImg(response.data.url); // Store image url in state urlImg

        }).catch(error => console.log(error))

    }

  // Main Function    ______________________________

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // ______________________________

    const nom = nomRef.current.value;
    const origine = origineRef.current.value;
    const ingredients = ingredientsRef.current.value.split(',').map(ingredient => ingredient.trim());
    const popularite = rating;
    const image = imageRef.current.files[0];

    // Calling the func
    handleUploadImage(image);


    // ______________________________

    // Make Post request to json-server
    axios.post(`http://localhost:5000/plats`, {
      nom,
      origine,
      ingredients,
      popularite,
      image: urlImg
    }).then(response => {
      console.log(response.data)
    }).catch(err => console.log(err))

    // Clear data
    nomRef.current.value = "";
    origineRef.current.value = "";
    ingredientsRef.current.value = "";
    setRating(0);
    setUrlImg("");

  }

  // _______________________________________________
  console.log('Img source out : ', urlImg)


  return (

    <StyledForm onSubmit={handleOnSubmit}>

      <StyledLabel>Recipe name:</StyledLabel>
      <StyledInput ref={nomRef} type="text" placeholder='Enter recipe name' />

      <StyledLabel>Origine:</StyledLabel>
      <StyledInput ref={origineRef} type="text" placeholder='Enter origine' />

      <StyledLabel >Ingredients: (séparés par des virgules) : </StyledLabel>
      <StyledTextarea ref={ingredientsRef} type="text" placeholder='Enter the Ingredients...' rows="4" />

      <StyledLabel>Popularite:</StyledLabel>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
      />

      <StyledLabel >Images:</StyledLabel>
      <StyledInput type="file" ref={imageRef} />

      <StyledButton type="submit" >Add Recipe</StyledButton>

    </StyledForm>

  )
}

export default OldAddProduct