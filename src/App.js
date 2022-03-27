import React, { useEffect, useState } from "react"
import Recipe from "./Recipe"
import "./App.css"

const App = () => {
	const APP_ID = "2dc16ac9"
	const APP_KEY = "9d9f50cc366668293ff143814da5b3ca"
	const exampleReq = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`

	const [recipes, setRecipes] = useState([])
	const [search, setSearch] = useState("")
	const [query, setQuery] = useState("chicken")

	useEffect(() => {
		getRecipes()
	}, [query])

	const getRecipes = async () => {
		const response = await fetch(
			`https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
		)
		const data = await response.json()
		setRecipes(data.hits)
	}

	const updateSearch = (e) => {
		setSearch(e.target.value)
	}

	const getSearch = (e) => {
		e.preventDefault()
		setQuery(search)
		setSearch("")
	}

	return (
		<div className="App">
			<form onSubmit={getSearch} className="search-form">
				<input
					className="search-bar"
					type="text"
					value={search}
					onChange={updateSearch}
				/>
				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			<div className="recipes">
				{recipes.map((recipe) => (
					<Recipe
						key={recipe.recipe.label}
						title={recipe.recipe.label}
						calories={recipe.recipe.calories}
						image={recipe.recipe.image}
						ingredients={recipe.recipe.ingredients}
					/>
				))}
			</div>
		</div>
	)
}

export default App
