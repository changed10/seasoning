import { Clock3, Users } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { getRecipe } from '../data/recipes'

export function RecipeDetailPage() {
  const { id = '' } = useParams()
  const recipe = getRecipe(id)

  if (!recipe) {
    return (
      <div className="page">
        <div className="empty">레시피를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="detail-hero">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="detail-body">
        <h1>{recipe.title}</h1>
        <p className="desc" style={{ marginTop: 0 }}>
          {recipe.subtitle}
        </p>
        <div className="recipe-meta">
          <span className="chip">
            <Clock3 size={14} /> {recipe.time}
          </span>
          <span className="chip">
            <Users size={14} /> {recipe.servings}
          </span>
        </div>

        <h2 style={{ fontSize: 17, margin: '18px 0 10px' }}>재료</h2>
        <ul className="ingredient-list">
          {recipe.ingredients.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <strong>{item.amount}</strong>
            </li>
          ))}
        </ul>

        <h2 style={{ fontSize: 17, margin: '18px 0 10px' }}>조리 순서</h2>
        <ol className="step-list">
          {recipe.steps.map((step, index) => (
            <li key={step}>
              <span className="step-num">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        {recipe.tip && <div className="tip-box">TIP · {recipe.tip}</div>}
      </div>
    </div>
  )
}
