import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating'
import { useParams } from 'react-router-dom';

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

const UpdateProduct = () => {

    // Global vars :


    const [rating, setRating] = useState(0) // To store rating value
    const [origines, setOrigines] = useState([]) // To store origines
    const [selectedOrigine, setSelectedOrigine] = useState("") // To take origine selected

    // ______________________________

    // Get params
    const { id } = useParams();
    console.log('id of product :', id)
    // Global variables:
    const [data, setData] = useState(null)



    useEffect(() => {
        // get the product by id
        const getPlat = () => {
            axios.get(`http://localhost:5000/plats/${id}`)
                .then(response => {
                    setData(response.data) // To store all data
                    console.log('Response.data : ', response)
                    // console.log('Response.data : ', response.data)
                    // setSelectedOrigine('Pérou')
                    setSelectedOrigine(response.data.origine)
                    console.log('===', response.data.origine)

                    // console.log('selected origins : ', selectedOrigine)
                    // setRating(response.data.popularite)

                })
                .catch(error => console.log(error))


        }

        getPlat()
    }, [])


    console.log(rating)
    // console.log(data.popularite)
    console.log('***', selectedOrigine)


    // To get all origines
    useEffect(() => {
        axios.get(`http://localhost:5000/origines`)
            .then(response => {
                setOrigines(response.data);
            })
            .catch(error => console.log('Error : ', error));
    }, [])


    // Handling origine:
    const handleOnSelect = (e) => {
        setSelectedOrigine(e.target.value)
    }

    // handling if data is empty
    if (!data) {
        return <div>Loading ...</div>
    }

    // if there isn't any prob
    return (

        <StyledForm onSubmit={() => console.log('submiting')}>

            <StyledLabel>Recipe name:</StyledLabel>
            <StyledInput value={data.nom} type="text" placeholder='Enter recipe name' />

            <StyledLabel>Choose an origine:</StyledLabel>

            {/* <select value={'Maroc'} onChange={handleOnSelect} > */}

            <select value={selectedOrigine - 1 || 8 } onChange={handleOnSelect}>
                {origines &&
                    origines.map((origine, index) => (
                        <option key={index} value={origine.id}>
                            {origine.nom}
                        </option>
                    ))}
            </select>

            <StyledLabel >Ingredients: (séparés par des virgules) : </StyledLabel>
            <StyledTextarea value={data.ingredients} type="text" placeholder='Enter the Ingredients (séparés par des virgules)...' rows="4" />

            <StyledLabel>Popularite:</StyledLabel>
            <Rating
                // onClick={handleRating}
                onClick={() => console.log("clicked")}
                ratingValue={rating}
            />

            <StyledLabel >Images:</StyledLabel>
            <StyledInput type="file" />

            <StyledButton type="submit" >Add Recipe</StyledButton>

        </StyledForm>
    )
}

export default UpdateProduct