import React, { PropTypes } from 'react';

function PreferenceCriteriaPanel(props) {
  const { criteria, selectCriterion, unselectCriterion, imagesUrl } = props;

  const lis = criteria.toArray()
    .sort((criterionA, criterionB) => {
      const labelA = criterionA.get('label').toUpperCase();
      const labelB = criterionB.get('label').toUpperCase();
      return labelA.localeCompare(labelB);
    })
    .map(criterion => {
      const slug = criterion.get('slug');
      const label = criterion.get('label');
      const isSelected = criterion.get('isSelected');

      return (
        <li key={ slug }>
          <label htmlFor={ slug } className="criterion-label">
            <input
              id={ slug }
              type="checkbox"
              checked={ isSelected }
              onChange={ () => (isSelected ? unselectCriterion(slug) : selectCriterion(slug)) } />
            <img role="presentation" src={`${imagesUrl}${isSelected ? 'checked' : 'unchecked'}.svg`} />
            { label }
          </label>
        </li>
      );
    });

  return (
    <div>
      <ul>{ lis }</ul>
      <div className="separation-bar"></div>
      <aside>
        <h1>Aide</h1>
        <p>
          Sélectionnez les critères de choix qui vous importent le plus.
          Seules vous seront affichées les recommendations pertinentes pour ces critères.
        </p>
        <p>
          Par exemple, si peu vous importe le prix, dé-sélectionnez le critère <em>prix</em>.
          L’assistant ne vous proposera alors plus de recommendation portant uniquement sur ce critère.
        </p>
      </aside>
    </div>
  );
}

PreferenceCriteriaPanel.PropTypes = {
  criteria: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectCriterion: PropTypes.func.isRequired,
  unselectCriterion: PropTypes.func.isRequired,
  imagesUrl: PropTypes.string.isRequired,
};

export default PreferenceCriteriaPanel;
