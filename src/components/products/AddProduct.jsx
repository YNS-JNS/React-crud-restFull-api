import React, { useEffect, useRef, useState } from 'react'
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

const AddProduct = () => {

  // Global vars :
  const nomRef = useRef(null);
  const ingredientsRef = useRef(null);
  const imageRef = useRef(null)

  const [rating, setRating] = useState(0) // To store rating value
  const [origines, setOrigines] = useState([]) // To store origines
  const [selectedOrigine, setSelectedOrigine] = useState("") // To take origine selected

  // ______________________________
  // 
  const handleRating = (rate) => {
    setRating(rate)
  }

  // handling reset
  const handleReset = () => {
    setRating(0)

  }

  // ______________________________

  // ______________________________________________________________ 
  // Function to handle upload image to cloudinary server
  const handleUploadImage = async (image) => {
    try {

      // Create an instance from FormData class for handling image
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', "zl2bprmx")

      // Making call api (post)
      const response = await axios.post("https://api.cloudinary.com/v1_1/db4rh6kdl/image/upload", formData)
      const data = await response.data;

      return data.url;

    } catch (error) {
      console.error("Error uploading image:", error);
    }


  }
  // ______________________________________________________________ 


  // Main Function :   ____________________________________________

  const handleOnSubmit = async (e) => {
    try {

      e.preventDefault();

      const nom = nomRef.current.value;
      const origine = selectedOrigine;
      const ingredients = ingredientsRef.current.value.split(',').map(ingredient => ingredient.trim());
      const popularite = rating;
      const image = imageRef.current.files[0];

      // ______________________________

      // Calling the func for handling image and awaiting for image processing
      const imageUrl = await handleUploadImage(image)
      // console.log('imageUrl: ', imageUrl)

      // ______________________________

      // Make Post request to json-server
      const response = await axios.post(`http://localhost:5000/plats`, {
        nom,
        origine,
        ingredients,
        popularite,
        image: imageUrl
      });
      const data = response.data;
      console.log('body : ', data)

      // Clear data ____________________
      nomRef.current.value = "";
      ingredientsRef.current.value = "";
      // Invoke this func to reset rating
      handleReset();
      // setOrigines([])
      // imageRef.current.files[0] = "";

    } catch (error) {
      console.log(error)
    }
  }

  // ______________________________________________________________ 
  // Handling origine:
  const handleOnSelect = (e) => {
    setSelectedOrigine(e.target.value)
  }

  console.log('Origine: ', selectedOrigine)

  // To get origines
  useEffect(() => {

    axios.get(`http://localhost:5000/origines`)
      .then(response => {
        // console.log(response.data)
        setOrigines(response.data)
      })
      .catch(error => console.log('Error : ', error))

  }, [])


  // ______________________________________________________________ 

  return (

    <StyledForm onSubmit={handleOnSubmit}>

      <StyledLabel>Recipe name:</StyledLabel>
      <StyledInput ref={nomRef} type="text" placeholder='Enter recipe name' />

      <StyledLabel>Choose an origine:</StyledLabel>
      {/* <select onChange={handleOnSelect} >
        {
          origines && origines.map( (origine, index)=> (
            <option key={index} value={origine.id} > { origine.nom } </option>
          ) )
        }
      </select> */}

      <select onChange={handleOnSelect} >
        <option value={1} >Italie</option>
        <option value={2} >Japon</option>
        <option value={3} >Mexique</option>
        <option value={4} >Thaïlande</option>
        <option value={5} >États-Unis</option>
        <option value={6} >Pérou</option>
        <option value={7} >Maghreb</option>
        <option value={8} >Maroc</option>
      </select>

      <StyledLabel >Ingredients: (séparés par des virgules) : </StyledLabel>
      <StyledTextarea ref={ingredientsRef} type="text" placeholder='Enter the Ingredients (séparés par des virgules)...' rows="4" />

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

export default AddProduct;