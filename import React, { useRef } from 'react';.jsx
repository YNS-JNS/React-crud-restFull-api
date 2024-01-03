import React, { useRef } from 'react';
import axios from 'axios';

const AddPlat = () => {
  const nomRef = useRef(null);
  const origineRef = useRef(null);
  const ingredientsRef = useRef(null);
  const populariteRef = useRef(null);
  const imageRef = useRef(null);

  const handleSubmit = () => {
    const platData = {
      nom: nomRef.current.value,
      origine: origineRef.current.value,
      ingredients: ingredientsRef.current.value.split(',').map((ingredient) => ingredient.trim()),
      popularite: populariteRef.current.value,
      image: imageRef.current.files[0], // Accédez au fichier sélectionné
    };

    // Utilisez FormData pour envoyer le fichier image avec la requête POST
    const formData = new FormData();
    formData.append('nom', platData.nom);
    formData.append('origine', platData.origine);
    formData.append('ingredients', JSON.stringify(platData.ingredients));
    formData.append('popularite', platData.popularite);
    formData.append('image', platData.image);

    // Faites la requête POST avec Axios
    axios
      .post('http://localhost:5000/plats', formData)
      .then((response) => {
        console.log('Plat ajouté avec succès !', response.data);
        // Ajoutez votre logique ici en cas de succès (redirection, mise à jour de l'état, etc.)
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du plat :', error);
        // Ajoutez votre logique ici en cas d'erreur (affichage d'un message, etc.)
      });
  };

  return (
    <div>
      <h2>Ajouter un Plat</h2>
      <form>
        <label>
          Nom :
          <input type="text" ref={nomRef} />
        </label>
        <label>
          Origine :
          <input type="text" ref={origineRef} />
        </label>
        <label>
          Ingrédients (séparés par des virgules) :
          <input type="text" ref={ingredientsRef} />
        </label>
        <label>
          Popularité :
          <input type="text" ref={populariteRef} />
        </label>
        <label>
          Image :
          <input type="file" ref={imageRef} />
        </label>
        <button type="button" onClick={handleSubmit}>
          Ajouter le Plat
        </button>
      </form>
    </div>
  );
};

export default AddPlat;
