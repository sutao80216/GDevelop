// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import defaultTheme from '../../../UI/Theme/DefaultTheme';
import StartPage from '.';
import { I18nProvider } from '@lingui/react';
const gd = global.gd;

describe('StartPage', () => {
  it('renders the start page with no project opened', () => {
    const tree = renderer
      .create(
        <I18nProvider language="en">
          <MuiThemeProvider muiTheme={defaultTheme}>
            <StartPage project={null} />
          </MuiThemeProvider>
        </I18nProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the start page with a project', () => {
    const project = gd.ProjectHelper.createNewGDJSProject();
    const tree = renderer
      .create(
        <I18nProvider language="en">
          <MuiThemeProvider muiTheme={defaultTheme}>
            <StartPage project={project} />
          </MuiThemeProvider>
        </I18nProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    project.delete();
  });
});
