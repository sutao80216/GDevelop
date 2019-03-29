import indexHTML from './GDJSindex.html.js';

const gdjsRoot =
  'https://s3-eu-west-1.amazonaws.com/gdevelop-resources/GDJS-5.0.0-beta62';

export const findGDJS = cb => {
  return cb({
    gdjsRoot,
    filesContent: {
      //TODO: Request and read it.
      [gdjsRoot + '/Runtime/index.html']: indexHTML,
    },
  });
};
