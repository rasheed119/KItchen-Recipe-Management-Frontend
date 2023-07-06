import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import UserID from "../Hook/hook";
import Loading from "../Components/Loading ";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90%",
  overflow: "scroll",
};

function Homepage() {
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [savedRecipe, setsavedRecipe] = useState([]);
  const [show, setshow] = useState(false);

  const handleOpen = (recipe) => {
    setOpen(true);
    setSelectedRecipe(recipe);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  const handleClickClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setshow(false);
  };

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://kitchen-recipe-backend-nu.vercel.app/recipes"
        );
        setRecipe(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const savedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://kitchen-recipe-backend-nu.vercel.app/recipes/savedRecipes/ids/${UserID()}`
        );
        setsavedRecipe(response.data.SavedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    savedRecipes();
    getData();
  }, []);

  const saveRecipe = async (id) => {
    if (UserID()) {
      try {
        const response = await axios.put(
          "https://kitchen-recipe-backend-nu.vercel.app/recipes",
          {
            recipeID: id,
            userID: UserID(),
          }
        );
        setshow(true);
        setsavedRecipe(response.data.SavedRecipes);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Login to Save Recipes");
    }
  };
  const isSavedRecipes = (id) => savedRecipe?.includes(id);

  return (
    <>
      <Navbar />
      <Container>
        <Box
          sx={{
            borderRadius: 5,
            m: 10,
            padding: 5,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CssBaseline />

          <React.Fragment>
            <CssBaseline />
            <Container fixed>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 1, sm: 4, md: 12 }}
                >
                  {recipe && recipe.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Loading />
                    </Box>
                  ) : (
                    recipe &&
                    recipe.map((obj) => (
                      <React.Fragment key={obj._id}>
                        <Grid item xs={2} sm={4} md={4}>
                          <Card sx={{ maxWidth: 250 }}>
                            <CardMedia
                              sx={{ height: 120, cursor: "pointer" }}
                              image={obj.imageUrl}
                              title={obj.name}
                              onClick={() => handleOpen(obj)}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {obj.name}
                              </Typography>
                              <Typography sx={{ opacity: 0.75 }}>
                                Cooking Time : {obj.cookingTime} minutes
                              </Typography>
                            </CardContent>

                            <Button
                              size="small"
                              onClick={() => handleOpen(obj)}
                            >
                              Open
                            </Button>
                            <Button
                              size="small"
                              onClick={() => saveRecipe(obj._id)}
                              disabled={isSavedRecipes(obj._id)}
                            >
                              {isSavedRecipes(obj._id) ? "Saved" : "Save"}
                            </Button>
                          </Card>
                        </Grid>
                      </React.Fragment>
                    ))
                  )}
                </Grid>
              </Box>
            </Container>
          </React.Fragment>
        </Box>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "90%",
            maxWidth: "90vw",
            borderRadius: 3,
            overflowX: "hidden",
          }}
        >
          {selectedRecipe && (
            <>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                {selectedRecipe.name}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={selectedRecipe.imageUrl}
                  alt={selectedRecipe.name}
                  style={{ width: "100%", maxWidth: 250 }}
                />
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ mb: 2, mt: 2, fontFamily: "bold" }}
                >
                  Description :
                </Typography>
                <Typography sx={{ textIndent: 100 }} paragraph>
                  {selectedRecipe.description}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ mb: 2, mt: 2, fontFamily: "bold" }}
                >
                  Ingredients :
                </Typography>
                <ul>
                  {selectedRecipe.ingredients.map((obj, index) => (
                    <li key={index}>{obj}</li>
                  ))}
                </ul>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ mb: 2, mt: 2, fontFamily: "bold" }}
                >
                  Instructions :
                </Typography>
                <ul>
                  {selectedRecipe.instructions.map((obj, index) => (
                    <Box key={index} sx={{ mt: 2, mb: 2 }}>
                      <Typography>
                        Step {index + 1} : {obj}
                      </Typography>
                    </Box>
                  ))}
                </ul>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button onClick={handleClose} color="error" variant="outlined">
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={show}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClickClose}
      >
        <Alert
          onClose={handleClickClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Recipe Saved Successfully !
        </Alert>
      </Snackbar>
    </>
  );
}

export default Homepage;
