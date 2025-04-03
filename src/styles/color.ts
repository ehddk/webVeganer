/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseColor, SimenticColor, Transparent } from "./baseColor";

export const colorThemes = {
  light: {
    textPrimary: BaseColor.grey.Grey9,
    textSecondary: BaseColor.grey.Grey7,
    textTertiary: BaseColor.grey.Grey6,
    textDisabled: BaseColor.grey.Grey5,
    backgroundDefault: BaseColor.whiteWhite,
    backgroundPaper: BaseColor.whiteWhite,
    backgroundSecond: Transparent.grey8,
    backgroundNeutral: BaseColor.grey.Grey2,
    shadow8: Transparent.grey8,
    shadow12: Transparent.grey12,
    shadow20: Transparent.grey20,
    componentTextfieldFilled: Transparent.grey8,
    componentTextfieldUnderline: Transparent.grey40,
    componentTextfieldOutline: Transparent.grey24,
    actionHover: Transparent.grey16,
    actionDisabled: Transparent.grey40,
    actionDisabledBackground: Transparent.grey16,
    actionSelected: Transparent.grey16,
    actionFocus: Transparent.grey48,
    textError: BaseColor.red.Red6,
    textSuccess: BaseColor.lightGreen.LightGreen6,
    actionAction: BaseColor.grey.Grey6,
    textWarning: BaseColor.gold.Gold6,
    textContrast: BaseColor.whiteWhite,
    inheritColor: BaseColor.whiteWhite,
    inheritBgcolor: BaseColor.grey.Grey9,
    inheritHover: BaseColor.grey.Grey8,
    swapDarkLightRed: BaseColor.red.Red8,
    swapDarkLightLightGreen: BaseColor.lightGreen.LightGreen8,
    swapDarkLightDeepGreen: BaseColor.deepGreen.DeepGreen8,
    swapDarkLightCyanBlue: BaseColor.cyanBlue.CyanBlue8,
    swapDarkLightPurple: BaseColor.purple.Purple8,
    swapDarkLightGold: BaseColor.gold.Gold8,
    swapDarkLightBlue: BaseColor.blue.Blue8,
    swapDarkLightPrimary: BaseColor.deepGreen.DeepGreen8,
  },
  dark: {
    textPrimary: BaseColor.whiteWhite,
    textSecondary: BaseColor.grey.Grey5,
    textTertiary: BaseColor.grey.Grey6,
    textDisabled: BaseColor.grey.Grey7,
    backgroundDefault: BaseColor.grey.Grey10,
    backgroundPaper: BaseColor.grey.Grey9,
    backgroundSecond: BaseColor.grey.Grey8,
    backgroundNeutral: Transparent.grey12,
    shadow8: Transparent.black8,
    shadow12: Transparent.black12,
    shadow20: Transparent.black20,
    componentTextfieldFilled: Transparent.grey8,
    componentTextfieldUnderline: Transparent.grey40,
    componentTextfieldOutline: Transparent.grey24,
    actionHover: Transparent.grey16,
    actionDisabled: Transparent.grey40,
    actionDisabledBackground: Transparent.grey20,
    actionSelected: Transparent.grey16,
    actionFocus: Transparent.grey8,
    textError: BaseColor.red.Red6,
    textSuccess: BaseColor.lightGreen.LightGreen6,
    actionAction: BaseColor.grey.Grey5,
    textWarning: BaseColor.gold.Gold6,
    textContrast: BaseColor.blackBlack,
    inheritColor: BaseColor.grey.Grey9,
    inheritBgcolor: BaseColor.whiteWhite,
    inheritHover: BaseColor.grey.Grey5,
    swapDarkLightRed: BaseColor.red.Red4,
    swapDarkLightLightGreen: BaseColor.lightGreen.LightGreen4,
    swapDarkLightDeepGreen: BaseColor.deepGreen.DeepGreen4,
    swapDarkLightCyanBlue: BaseColor.cyanBlue.CyanBlue4,
    swapDarkLightPurple: BaseColor.purple.Purple4,
    swapDarkLightGold: BaseColor.gold.Gold4,
    swapDarkLightBlue: BaseColor.blue.Blue4,
    swapDarkLightPrimary: BaseColor.deepGreen.DeepGreen4,
  },
  primary: {
    pLighter: SimenticColor.deepGreen.Lighter,
    pLight: SimenticColor.deepGreen.Light,
    pMain: SimenticColor.deepGreen.Main,
    pDark: SimenticColor.deepGreen.Dark,
    pDarker: SimenticColor.deepGreen.Darker,
    p4: Transparent.deepGreen4,
    p8: Transparent.deepGreen8,
    p12: Transparent.deepGreen12,
    p16: Transparent.deepGreen16,
    p20: Transparent.deepGreen20,
    p24: Transparent.deepGreen24,
    p32: Transparent.deepGreen32,
    p40: Transparent.deepGreen40,
    p48: Transparent.deepGreen48,
    pContrastText: SimenticColor.whiteMain,
  },
};

type ThemedPalette = Record<
  any,
  string | Record<string, string | Record<string, string>>
>;

/**
 * 
 * 객체를 넣으면 이런형식으로 반환해줌 `
  --text: black;
  --background: white;
` --socialGoogleBackground: '#f4f4f4',
 */
const buildCssVariables = (variables: ThemedPalette) => {
  const keys = Object.keys(variables) as (keyof ThemedPalette)[];

  const processNestedObject = (
    obj: Record<
      string,
      string | Record<string, string | Record<string, string>>
    >,
    prefix: string
  ): string => {
    return Object.keys(obj).reduce((acc, subKey) => {
      const value = obj[subKey];
      if (typeof value === "object") {
        return acc.concat(processNestedObject(value, `${prefix}${subKey}`));
      }
      return acc.concat(`--${prefix}${subKey}: ${value};\n`);
    }, "");
  };

  return keys.reduce((acc, key) => {
    const value = variables[key];
    if (typeof value === "object") {
      return acc.concat(processNestedObject(value, key as string));
    }
    return acc.concat(`--${key.replace(/_/g, "-")}: ${value};\n`);
  }, "");
};

export const themes = {
  light: buildCssVariables(colorThemes.light),
  dark: buildCssVariables(colorThemes.dark),
  primary: buildCssVariables(colorThemes.primary),
  base: buildCssVariables(BaseColor),
  simentic: buildCssVariables(SimenticColor),
  transparent: buildCssVariables(Transparent),
} as const;

const cssVar = (name: string) => `var(--${name.replace(/_/g, "-")})`;

const subCssVar = (parentKey: string, key: string) =>
  `var(--${parentKey}${key.replace(/_/g, "-")})`;

const replaceCssVar = (name: string, value: string) =>
  `${name.replace(/_/g, "-")}, ${value})`
    .replace(/(\))(\\,)/, "$2")
    .replace(/(\d.)/g, "-$1");

const variableKeys = Object.keys(
  colorThemes.light
) as (keyof typeof colorThemes.light)[];

export const themedPalette = variableKeys.reduce((acc, key) => {
  const colorVal = colorThemes.light[key];

  if (typeof colorVal !== "string") {
    const obj = Object.keys(colorVal).reduce((acc, subKey) => {
      const subColorVal = (colorVal as any)[subKey];

      acc[subKey] = Array.isArray(subColorVal)
        ? replaceCssVar(
            subCssVar(
              key,
              subKey
                .replace(/_/g, "-")
                .replace(/^[a-z]/, (char) => `-${char}`)
                .replace(/([A-Z])/g, (char) => `-${char.toLocaleLowerCase()}`)
                .replace(/(\d.)/g, "-$1")
            ),
            subColorVal[1]
          )
        : subCssVar(
            key,
            subKey
              .replace(/_/g, "-")
              .replace(/^[a-z]/, (char) => `-${char}`)
              .replace(/([A-Z])/g, (char) => `-${char.toLocaleLowerCase()}`)
              .replace(/(\d.)/g, "-$1")
          );

      return acc;
    }, {} as any);

    acc[key] = obj;
    return acc;
  }

  (acc as any)[key] = cssVar(key);

  return acc;
}, {} as any);
