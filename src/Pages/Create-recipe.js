import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Input,
  Typography,
} from "@mui/material";
import OutdoorGrillTwoToneIcon from "@mui/icons-material/OutdoorGrillTwoTone";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserID from "../Hook/hook";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function Createrecipe() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [show, setshow] = useState(true);

  const navigate = useNavigate();

  const [recipe, setrecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: [],
    imageUrl: "",
    cookingTime: 0,
    userOwner: UserID(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setrecipe({ ...recipe, [name]: value });
  };

  const handleingredientchange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setrecipe({ ...recipe, ingredients });
  };

  const handleinstructionschange = (event, index) => {
    const { value } = event.target;
    const instructions = recipe.instructions;
    instructions[index] = value;
    setrecipe({ ...recipe, instructions });
  };

  const handleingredientdelete = (index) => {
    recipe.ingredients.splice(index, 1);
    setrecipe({ ...recipe });
  };

  const handleinstructionsdelete = (index) => {
    recipe.instructions.splice(index, 1);
    setrecipe({ ...recipe });
  };

  const addingredients = () => {
    setrecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const addinstructions = () => {
    setrecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setshow(false);
    if (UserID()) {
      try {
        await axios.post(
          "https://kitchen-recipe-backend-nu.vercel.app/recipes",
          recipe
        );
        alert("Recipe is added Successfully");
        navigate("/");
      } catch (error) {
        console.log(error.message);
        setshow(true);
      }
    } else {
      alert("You are Not Logged In, Please Login to Create Recipe");
      setshow(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box
          sx={{
            boxShadow: viewportWidth < 600 ? "none" : 10,
            borderRadius: 5,
            m: 10,
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          
          
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <OutdoorGrillTwoToneIcon />
            <Typography variant="h5" component="h1">
              Create Recipe
            </Typography>
            <OutdoorGrillTwoToneIcon />
          </Box>

          { UserID() ?
          (<Box
            component="form"
            onSubmit={(e) => handlesubmit(e)}
            sx={{ mt: 3, display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ mt: 2, mb: 2 }}>
              <label htmlFor="name">Name : </label>
              <Input
                placeholder="Recipe Name"
                name="name"
                type="text"
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ width: 250 }}
                onChange={(event) => handleChange(event)}
              />
            </Box>

            <Box sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}>
              <label htmlFor="description">Description : </label>
              <TextareaAutosize
                minRows={3}
                placeholder="Description about the recipe ...."
                name="description"
                style={{ borderRadius: 3, padding: 10, width: 250 }}
                inputProps={{ maxLength: 2 }}
                onChange={(event) => handleChange(event)}
              />
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
              <label htmlFor="ingredients">Ingredients : </label>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {recipe.ingredients.map((event, index) => (
                  <Box key={index}>
                    <Input
                      value={event}
                      placeholder="Add Ingredients"
                      name="ingredients"
                      type="text"
                      fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ width: 250, mt: 2, mb: 2 }}
                      onChange={(event) => handleingredientchange(event, index)}
                    />
                    <ClearIcon
                      onClick={() => handleingredientdelete(index)}
                      sx={{ cursor: "pointer" }}
                    />
                  </Box>
                ))}

                <Button
                  variant="contained"
                  type="button"
                  onClick={addingredients}
                >
                  Add Ingredients
                </Button>
              </Box>
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
              <label htmlFor="instructions">Instructions : </label>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {recipe.instructions.map((event, index) => (
                  <Box key={index}>
                    <Input
                      value={event}
                      placeholder="Add instructions"
                      name="instructions"
                      type="text"
                      fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ width: 250, mt: 2, mb: 2 }}
                      onChange={(event) =>
                        handleinstructionschange(event, index)
                      }
                    />
                    <ClearIcon
                      onClick={() => handleinstructionsdelete(index)}
                      sx={{ cursor: "pointer" }}
                    />
                  </Box>
                ))}

                <Button
                  variant="contained"
                  type="button"
                  onClick={addinstructions}
                >
                  Add Instructions
                </Button>
              </Box>
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
              <label htmlFor="imageUrl">Image URL : </label>

              <Input
                placeholder="Image URL"
                name="imageUrl"
                type="text"
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ width: 250 }}
                onChange={(event) => handleChange(event)}
              />
            </Box>

            <Box>
              <label htmlFor="cookingTime">Cooking Time : </label>

              <Input
                placeholder="Cooking TIme"
                name="cookingTime"
                type="number"
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ width: 250 }}
                onChange={(event) => handleChange(event)}
              />
            </Box>

            {show ? (
              <Button variant="contained" type="submit" sx={{ mt: 2, mb: 2 }}>
                Create Recipe
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                  mb: 2,
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>):
          (
            <Stack sx={{ width: "100%", mt:2, mb :2 }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Info</AlertTitle>
              You are Not Logged In —{" "}
              <strong>Log in to Create Recipes</strong>
            </Alert>
          </Stack>
          )
          }
        </Box>
      </Container>
    </>
  );
}

export default Createrecipe;
