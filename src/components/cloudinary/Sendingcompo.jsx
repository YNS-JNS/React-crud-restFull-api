import axios from 'axios';
import { useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100vh;
`;

const Sendingcompo = () => {

    // const [uploadImg, setUploadImg] = useState("");
    const uploadImg = useRef(null)

    const handleUploadImage = (e) => {
        e.preventDefault();

        const image = uploadImg.current.files[0];

        const formData = new FormData()
        // formData.append('file', uploadImg)
        formData.append('file', image)
        formData.append('upload_preset', "zl2bprmx")

        axios.post("https://api.cloudinary.com/v1_1/db4rh6kdl/image/upload", formData )
        .then( response => {
            console.log(response.data)
            console.log(response.data.url)
        } ).catch( error => console.log(error) )

    }

    return (
        <Container>
            <input
                type="file"
                // value={uploadImg}
                // onChange={(e) => setUploadImg(e.target.files[0])} 
                ref={uploadImg}
                />

            <button onClick={handleUploadImage} >Upload</button>
        </Container>
    )
}

export default Sendingcompo