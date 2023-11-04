import Select from 'react-select';

function CustomizedHook({options, handleSelectChange, selectedOptions}) {

  return (
    <div>
      <h2>Filter Tags</h2>
      <Select
        options={ options && options.map((option) => ({ value: option, label: option }))}
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
      />

    </div>
  );
}

export default CustomizedHook;


