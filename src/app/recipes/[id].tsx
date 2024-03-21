import { useRouter } from 'next/router';

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  if (!id) {
    // Handle the case where id is not available
    return <div>Loading...</div>;
  }

  // Fetch recipe details based on the id
  // You can fetch data from your database using the id

  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Recipe ID: {id}</p>
      {/* Display other details of the recipe */}
    </div>
  );
};

export default RecipePage;


