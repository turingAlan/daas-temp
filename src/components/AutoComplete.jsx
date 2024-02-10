import {
    Autocomplete,
    TextField,
  } from '@mui/material'
  
  /**
   * AutoCompleteInput is a functional component that renders an Autocomplete input field.
   *
   * @param {Object} props - The properties that define the behavior and display of the component.
   * @param {string} props.value - The current value of the input field.
   * @param {Function} props.onChange - The function to be called when the input field value changes.
   * @param {string} props.placeholder - The placeholder text for the input field.
   * @param {Array} props.options - The options to be displayed in the dropdown of the autocomplete input.
   * @param {string} props.error - The error message to be displayed if there is an error.
   * @param {boolean} props.errorFocused - Determines if the error message should be displayed.
   * @param {string} props.className - The CSS class to be applied to the component.
   * @param {boolean} props.multiple - Determines if multiple options can be selected.
   * @param {boolean} props.disabled - Determines if the input field should be disabled.
   * @param {string} props.borderRadius - The border radius to be applied to the component.
   *
   * @returns {JSX.Element} The JSX code for the Autocomplete input field.
   */
  function AutoCompleteInput(props) {
    const {
      value,
      onChange,
      placeholder,
      options,
      error,
      errorFocused,
      className,
      multiple,
      disabled,
    } = props
  
    return (
      <Autocomplete
        disabled={disabled}
        className={className}
        multiple={multiple}
        disableListWrap
        limitTags={1}
        value={value}
        disablePortal
        sx={{
            width: 200,
          '& .MuiButtonBase-root.MuiChip-root.MuiChip-filled.MuiChip-sizeMedium':
            {
              borderRadius: '0.5rem',
              color: '#3881E6',
            },
            "& .MuiAutocomplete-inputRoot":{
                backgroundColor: 'rgba(255,255,255,0.05)',
            },
    
          '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiChip-deleteIcon': {
            fill: '#3881E6',
          },
          '& .MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline': {
          },
          '& .MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-colorPrimary.MuiInputBase-fullWidth':
            {
              paddingBlock: '3px',
            },
        }}
        onChange={(event, newValue) => {
          onChange(newValue)
        }}
        id="manageable-states-demo"
        options={options}
        // renderOption={(props, option, state) => [props, option, state.index]}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="filled"
              error={!!error && errorFocused}
              helperText={errorFocused && error}
              placeholder={placeholder}
            />
          )
        }}
      />
    )
  }
  
  export default AutoCompleteInput
  