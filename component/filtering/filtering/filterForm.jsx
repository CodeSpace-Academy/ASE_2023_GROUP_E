import Select from 'react-select';

/**
 * CustomizedHook component for rendering a customized Select component.
 *
 * @component
 * @param {Array} props.options - The options for the Select component.
 * @param {Function} props.handleSelectChange - The function to handle the Select component's change event.
 * @param {Array} props.selectedOptions - The selected options for the Select component.
 * @param {string} props.filter - The filter label to display.
 */

function CustomizedHook({
  options,
  handleSelectChange,
  selectedOptions,
  filter,
}) {
  return (
    <div>
      <h4 style={{color:'white'}}>{filter}</h4>
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
