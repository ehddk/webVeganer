import { SimenticColor, Transparent } from "@/styles/baseColor";
import { colorThemes as colorSet } from "@/styles/color";

const useButtonColors = () => {
  const primary = {
    contained: {
      backgroundColor: colorSet.primary.pMain,
      color: colorSet.primary.pContrastText,
      borderColor: "transparent",
      hover: {
        backgroundColor: colorSet.primary.pDark,
        color: colorSet.primary.pContrastText,
        borderColor: "transparent",
      },
    },
    outlined: {
      backgroundColor: "transparent",
      color: colorSet.primary.pMain,
      borderColor: colorSet.primary.p48,
      hover: {
        backgroundColor: colorSet.primary.p8,
        color: colorSet.primary.pMain,
        borderColor: colorSet.primary.pMain,
      },
    },
    soft: {
      backgroundColor: colorSet.primary.p8,
      color: `var(--swapDarkLightPrimary, ${colorSet.light.swapDarkLightPrimary})`,
      borderColor: "transparent",
      hover: {
        backgroundColor: colorSet.primary.p16,
        color: `var(--swapDarkLightPrimary, ${colorSet.light.swapDarkLightPrimary})`,
        borderColor: "transparent",
      },
    },
    text: {
      backgroundColor: "transparent",
      color: colorSet.primary.pMain,
      borderColor: "transparent",
      hover: {
        backgroundColor: colorSet.primary.p8,
        color: `var(--swapDarkLightDeepGreen, ${colorSet.light.swapDarkLightDeepGreen})`,
        borderColor: "transparent",
      },
    },
  };

  const inherit = {
    contained: {
      backgroundColor: `var(--inheritBgcolor, ${colorSet.light.inheritBgcolor})`,
      color: `var(--textContrast, ${colorSet.light.textContrast})`,
      borderColor: "transparent",
      hover: {
        backgroundColor: `var(--inheritHover, ${colorSet.light.inheritHover})`,
        color: `var(--textContrast, ${colorSet.light.textContrast})`,
        borderColor: "transparent",
      },
    },
    outlined: {
      backgroundColor: "transparent",
      color: `var(--textSecondary, ${colorSet.light.textSecondary})`,
      borderColor: Transparent.grey32,
      hover: {
        backgroundColor: `var(--actionHover, ${colorSet.light.actionHover})`,
        color: `var(--textSecondary, ${colorSet.light.textSecondary})`,
        borderColor: `var(--textSecondary, ${colorSet.light.textSecondary})`,
      },
    },
    soft: {
      backgroundColor: Transparent.grey8,
      color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
      borderColor: "transparent",
      hover: {
        backgroundColor: Transparent.grey24,
        color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
        borderColor: "transparent",
      },
    },
    text: {
      backgroundColor: "transparent",
      color: `var(--textSecondary, ${colorSet.light.textSecondary})`,
      borderColor: "transparent",
      hover: {
        backgroundColor: `var(--actionHover, ${colorSet.light.actionHover})`,
        color: `var(--textPrimary, ${colorSet.light.textPrimary})`,
        borderColor: "transparent",
      },
    },
  };

  const red = {
    contained: {
      backgroundColor: SimenticColor.red.Main,
      color: colorSet.primary.pContrastText,
      borderColor: "transparent",
      hover: {
        backgroundColor: SimenticColor.red.Dark,
        color: `var(--textContrast, ${colorSet.light.textContrast})`,
        borderColor: "transparent",
      },
    },
    outlined: {
      backgroundColor: "transparent",
      color: SimenticColor.red.Main,
      borderColor: Transparent.red48,
      hover: {
        backgroundColor: Transparent.red8,
        color: SimenticColor.red.Main,
        borderColor: SimenticColor.red.Main,
      },
    },
    soft: {
      backgroundColor: Transparent.red8,
      color: `var(--swapDarkLightRed, ${colorSet.light.swapDarkLightRed})`,
      borderColor: "transparent",
      hover: {
        backgroundColor: Transparent.red16,
        color: `var(--swapDarkLightRed, ${colorSet.light.swapDarkLightRed})`,
        borderColor: "transparent",
      },
    },
    text: {
      backgroundColor: "transparent",
      color: SimenticColor.red.Main,
      borderColor: "transparent",
      hover: {
        backgroundColor: Transparent.red8,
        color: SimenticColor.red.Dark,
        borderColor: "transparent",
      },
    },
  };

  const disabled = {
    contained: {
      backgroundColor: `var(--actionDisabledBackground, ${colorSet.light.actionDisabledBackground})`,
      color: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      borderColor: "transparent",
    },
    outlined: {
      backgroundColor: "transparent",
      color: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      borderColor: `var(--actionDisabled, ${colorSet.light.actionDisabled})`,
    },
    soft: {
      backgroundColor: `var(--actionDisabledBackground, ${colorSet.light.actionDisabledBackground})`,
      color: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      borderColor: "transparent",
    },
    text: {
      backgroundColor: "transparent",
      color: `var(--textDisabled, ${colorSet.light.textDisabled})`,
      borderColor: "transparent",
    },
  };

  return {
    primary,
    inherit,
    disabled,
    red,
  };
};

export default useButtonColors;
