import { colorThemes as colorSet } from "@/styles/color";

const useDropdownColors = () => {
  const outlined = {
    inactive: {
      backgroundColor: "transparent",
      color: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: `var(--componentTextfieldOutline, ${colorSet.light.componentTextfieldOutline})`,
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
    focused: {
      backgroundColor: "transparent",
      color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: `var(--actionAction, ${colorSet.light.actionAction})`,
      iconColor: `var(--textPrimary, ${colorSet.light.textPrimary})`,
    },
    selected: {
      backgroundColor: "transparent",
      color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: `var(--actionAction, ${colorSet.light.actionAction})`,
      iconColor: `var(--textPrimary, ${colorSet.light.textPrimary})`,
    },
    disabled: {
      backgroundColor: `var(--actionDisabledBackground, ${colorSet.light.actionDisabledBackground})`,
      color: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      placeholder: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      borderColor: `var(--componentTextfieldOutline, ${colorSet.light.componentTextfieldOutline})`,
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
    error: {
      backgroundColor: "transparent",
      color: `var(--textError, ${colorSet.light.textError})`,
      placeholder: `var(--textError, ${colorSet.light.textError})`,
      borderColor: `var(--componentTextfieldOutline, ${colorSet.light.componentTextfieldOutline})`,
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
  };

  const contained = {
    inactive: {
      backgroundColor: `var(--componentTextfieldFilled, ${colorSet.light.componentTextfieldFilled})`,
      color: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: "transparent",
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
    focused: {
      backgroundColor: `var(--componentTextfieldFilled, ${colorSet.light.componentTextfieldFilled})`,
      color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: `var(--actionAction, ${colorSet.light.actionAction})`,
      iconColor: `var(--textPrimary, ${colorSet.light.textPrimary})`,
    },
    selected: {
      backgroundColor: `var(--componentTextfieldFilled, ${colorSet.light.componentTextfieldFilled})`,
      color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: "transparent",
      iconColor: `var(--textPrimary, ${colorSet.light.textPrimary})`,
    },
    disabled: {
      backgroundColor: `var(--actionDisabledBackground, ${colorSet.light.actionDisabledBackground})`,
      color: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      placeholder: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      borderColor: "transparent",
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
    error: {
      backgroundColor: `var(--componentTextfieldFilled, ${colorSet.light.componentTextfieldFilled})`,
      color: `var(--textError, ${colorSet.light.textError})`,
      placeholder: `var(--textError, ${colorSet.light.textError})`,
      borderColor: "transparent",
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
  };

  const text = {
    inactive: {
      backgroundColor: "transparent",
      color: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: "transparent",
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
    focused: {
      backgroundColor: "transparent",
      color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: "transparent",
      iconColor: `var(--textPrimary, ${colorSet.light.textPrimary})`,
    },
    selected: {
      backgroundColor: "transparent",
      color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
      placeholder: `var(--textTertiary, ${colorSet.light.textTertiary})`,
      borderColor: "transparent",
      iconColor: `var(--textPrimary, ${colorSet.light.textPrimary})`,
    },
    disabled: {
      backgroundColor: "transparent",
      color: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      placeholder: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      borderColor: "transparent",
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
    error: {
      backgroundColor: "transparent",
      color: `var(--textError, ${colorSet.light.textError})`,
      placeholder: `var(--textError, ${colorSet.light.textError})`,
      borderColor: "transparent",
      iconColor: `var(--textTertiary, ${colorSet.light.textTertiary})`,
    },
  };

  return {
    outlined,
    contained,
    text,
  };
};

export default useDropdownColors;
