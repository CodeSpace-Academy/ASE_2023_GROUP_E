import Select from 'react-select';

function CustomizedHook({
  options,
  handleSelectChange,
  selectedOptions,
  filter,
}) {
  return (
    <div>
      <h4>{filter}</h4>
      <Select
        options={
          options && options.map((option) => ({ value: option, label: option }))
        }
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
      />
    </div>
  );
}

export default CustomizedHook;
