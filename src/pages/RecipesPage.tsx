import { useNavigate } from 'react-router-dom'
import { recipes } from '../data/recipes'

export function RecipesPage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <h1 className="page-title">레시피추천</h1>
      <p className="muted" style={{ marginTop: -8, marginBottom: 16 }}>
        제철 재료로 만드는 오늘의 한 끼
      </p>
      <div className="list-stack">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            type="button"
            className="recipe-card"
            onClick={() => navigate(`/recipes/${recipe.id}`)}
          >
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-card-copy">
              <span>{recipe.time} · {recipe.servings}</span>
              <strong>{recipe.title}</strong>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
