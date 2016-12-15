import React, { PropTypes } from 'react';

function PreferenceSourcesPanel(props) {
  const { editors, includeEditor, excludeEditor } = props;

  const lis = editors.toArray()
    .sort((editorA, editorB) => {
      const labelA = editorA.get('label').toUpperCase();
      const labelB = editorB.get('label').toUpperCase();
      return labelA.localeCompare(labelB);
    })
    .map(editor => {
      const id = editor.get('id');
      const label = editor.get('label');
      const isExcluded = editor.get('isExcluded');

      return (
        <li key={ id }>
          <label htmlFor={ id } className="editor-label">
            <input
              id={ id }
              type="checkbox"
              checked={ isExcluded }
              onChange={ () => (isExcluded ? includeEditor(id) : excludeEditor(id)) } />
            { label }
          </label>
        </li>
      );
    });

  return (
    <div>
      <ul>{ lis }</ul>
      <div className="separation-bar" />
      <aside>
        <h1>Aide</h1>
        <p>
          Sélectionnez les sources que vous ne considérez pas fiables
        </p>
      </aside>
    </div>
  );
}

PreferenceSourcesPanel.PropTypes = {
  editors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string,
  })).isRequired,
};

export default PreferenceSourcesPanel;

