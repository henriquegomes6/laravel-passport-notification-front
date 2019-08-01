import { StyleRules, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import withStyles, { WithStylesOptions } from '@material-ui/core/styles/withStyles';

export function WithStyles(
  styles: StyleRules<any> | StyleRulesCallback<Theme, any, any>,
  options?: WithStylesOptions<Theme>
) {
  return function <T>(target: T): T {
    return withStyles(styles, options)(target as any) as any;
  };
}

export type AppStyle<Classkeys extends string = string> = StyleRules<Classkeys> | StyleRulesCallback<any, any>;

export type ClassesFrom<AppStyle> = {
  [key in AppStyle extends StyleRulesCallback<any, any> ? keyof ReturnType<AppStyle> : keyof AppStyle]: string
};

export interface IStyledProps<T = any> {
  classes?: ClassesFrom<T>;
}