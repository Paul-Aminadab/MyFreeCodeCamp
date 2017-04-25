/*
    This is the main container component - which will nest other presentational components
    - RecipeBoxApp
    ----- NavBar
    ----- SearchBar
    ----- RecipeCollection
    --------- RecipeGrid
    --------- Recipe (card)
 */

/*
 This is the main container component - which will nest other presentational components
 - RecipeBoxApp
 ----- NavBar
 ----- SearchBar
 ----- RecipeFlexContainer
 --------- Recipe (card)
 */

var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./NavBar');
var SearchBar = require('./SearchBar');
var RecipeCollection = require('./RecipeCollection');
var RecipeFlexContainer = require('./RecipeFlexContainer');




class RecipeBoxApp extends React.Component {
    constructor(props) {
        super(props);
        var localData = localStorage.getItem("recipes");
        var recipes = (localData === "null") ? [] : JSON.parse(localData);
        this.state = {
            recipes: recipes,
            userSearch: "",
            //test
            editedRecObj: {},

            //store props individually
            editedRecipeName: "",
            editedRecipeIng: "",
            editedRecipeTags: ""

        };
        this.newRecipeObj = {};
        this.editedRecipeObj = {};

        //bind event handlers
        this.handleRecipeNameInput = this.handleRecipeNameInput.bind(this);
        this.handleRecipeIngredientsInput = this.handleRecipeIngredientsInput.bind(this);
        this.handleRecipeTagsInput = this.handleRecipeTagsInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        //recipe card event handlers
        this.handleRecipeNameEdit = this.handleRecipeNameEdit.bind(this);
        this.handleRecipeIngredientsEdit = this.handleRecipeIngredientsEdit.bind(this);
        this.handleRecipeTagsEdit = this.handleRecipeTagsEdit.bind(this);
        this.handleRecipeEditSubmit = this.handleRecipeEditSubmit.bind(this);
        this.getRecipeToEdit = this.getRecipeToEdit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);






    }

    // event handlers
    //--------------------------------------------------
    // for NavBar
    //--------------------------------------------------
    handleRecipeNameInput(recipeName) {
        this.newRecipeObj.name = recipeName;

    }

    handleRecipeIngredientsInput(recipeIngredients) {
        //let ings = recipeIngredients.split(",");
        this.newRecipeObj.ingredients = recipeIngredients;
    }

    handleRecipeTagsInput(recipeTags) {
        //let tags = recipeTags.split(",");
        this.newRecipeObj.tags = recipeTags;
    }

    handleSubmit() {
        let newRecipeArr = [this.newRecipeObj];
        let updatedRecipes = this.state.recipes.concat(newRecipeArr);
        //update local storage
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        this.setState({recipes: updatedRecipes});
    }




    //--------------------------------------------------
    // For Recipe Card
    //--------------------------------------------------

    handleRecipeNameEdit(modifiedName) {
        this.editedRecipeObj.name = modifiedName;
        this.setState({editedRecipeName: modifiedName});
    }

    handleRecipeIngredientsEdit(modifiedIngredients) {
        this.editedRecipeObj.ingredients = modifiedIngredients;
        this.setState({editedRecipeIng: modifiedIngredients});
    }

    handleRecipeTagsEdit(modifiedTags) {
        this.editedRecipeObj.tags = modifiedTags;
        this.setState({editedRecipeTags: modifiedTags});
    }


    // get position/recipe details of selected recipe
    getRecipeToEdit(key) {
        //let recs = this.state.recipes;
        let currentRecipeObj = {};
        this.state.recipes.forEach((element, index) => {
            if(index === key) {
                currentRecipeObj = element;
            }
        });

        this.editedRecipeObj = currentRecipeObj;
        //test
        this.setState({editedRecObj: this.editedRecipeObj, editedRecipeName: this.editedRecipeObj.name,
            editedRecipeIng: this.editedRecipeObj.ingredients, editedRecipeTags: this.editedRecipeObj.tags
        });

    }

    // BUG
    handleRecipeEditSubmit(key) {
        //get position of recipe that was edited
        let updatedRecipes = this.state.recipes;

        //update the recipe that was edited
        updatedRecipes.forEach((element, index) => {
            if(index === key) {
                //element = this.editedRecipeObj;
                updatedRecipes.splice(index, 1, this.editedRecipeObj);
            }
        });

        //update local storage
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

        //set state
        this.setState({recipes: updatedRecipes});
    }

    // when recipe is deleted
    handleDelete(key) {
        //use filter to filter out the deleted recipe
        let editedRecipes = this.state.recipes.filter((element, index) => index !== key);
        //set localstorage to editedRecipes
        localStorage.setItem("recipes", JSON.stringify(editedRecipes));
        //call this.setState to set recipes to editedRecipes
        this.setState({recipes: editedRecipes});
    }



    render() {
        return (
            <div>
                <NavBar onRecipeNameChange={this.handleRecipeNameInput}
                        onRecipeIngredientsChange={this.handleRecipeIngredientsInput}
                        onRecipeTagsChange={this.handleRecipeTagsInput}
                        onSubmit={this.handleSubmit}
                        filterNameText={this.newRecipeObj.name}
                        filterIngredientsText={this.newRecipeObj.ingredients}
                        filterTagsText={this.newRecipeObj.tags}

                />
                <SearchBar/>
                <RecipeFlexContainer recipes={this.state.recipes} onRecipeDelete={this.handleDelete}
                                     onRecipeNameEdit={this.handleRecipeNameEdit}
                                     onRecipeIngredientsEdit={this.handleRecipeIngredientsEdit}
                                     onRecipeTagsEdit={this.handleRecipeTagsEdit}
                                     onRecipeEditSubmit={this.handleRecipeEditSubmit}
                                     filterNameEdit={this.state.editedRecipeName}
                                     filterIngredientsEdit={this.state.editedRecipeIng}
                                     filterTagsEdit={this.state.editedRecipeTags}
                                     onRecipeEditSelect={this.getRecipeToEdit}

                />

            </div>
        );
    }
}

module.exports = RecipeBoxApp;
