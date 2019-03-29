// @flow
import { mapFor } from '../Utils/MapFor';
import flatten from 'lodash/flatten';
const gd = global.gd;

export type EnumeratedObjectMetadata = {|
  extension: gdPlatformExtension,
  objectMetadata: gdObjectMetadata,
  name: string,
  fullName: string,
  description: string,
  iconFilename: string,
|};

export type ObjectWithContext = {|
  object: gdObject,
  global: boolean,
|};

export type GroupWithContext = {|
  group: gdObjectGroup,
  global: boolean,
|};

export type ObjectWithContextList = Array<ObjectWithContext>;
export type GroupWithContextList = Array<GroupWithContext>;

export const enumerateObjects = (
  project: gdProject,
  objectsContainer: gdObjectsContainer,
  type: ?string = undefined
) => {
  const filterObject = (object: gdObject): boolean => {
    return (
      !type ||
      gd.getTypeOfObject(project, objectsContainer, object.getName(), false) ===
        type
    );
  };

  const containerObjectsList: ObjectWithContextList = mapFor(
    0,
    objectsContainer.getObjectsCount(),
    i => objectsContainer.getObjectAt(i)
  )
    .filter(filterObject)
    .map((object: gdObject): ObjectWithContext => ({ object, global: false }));

  const projectObjectsList: ObjectWithContextList =
    project === objectsContainer
      ? []
      : mapFor(0, project.getObjectsCount(), i => project.getObjectAt(i))
          .filter(filterObject)
          .map(
            (object: gdObject): ObjectWithContext => ({
              object,
              global: true,
            })
          );

  const allObjectsList: ObjectWithContextList = containerObjectsList.concat(
    projectObjectsList
  );

  return {
    containerObjectsList,
    projectObjectsList,
    allObjectsList,
  };
};

export const enumerateObjectTypes = (
  project: gdProject
): Array<EnumeratedObjectMetadata> => {
  const platform = project.getCurrentPlatform();
  const extensionsList = platform.getAllPlatformExtensions();

  return flatten(
    mapFor(0, extensionsList.size(), i => {
      const extension = extensionsList.at(i);

      return extension
        .getExtensionObjectsTypes()
        .toJSArray()
        .map(objectType => extension.getObjectMetadata(objectType))
        .map(objectMetadata => ({
          extension,
          objectMetadata,
          name: objectMetadata.getName(),
          fullName: objectMetadata.getFullName(),
          description: objectMetadata.getDescription(),
          iconFilename: objectMetadata.getIconFilename(),
        }));
    })
  );
};

export const filterObjectsList = (
  list: ObjectWithContextList,
  searchText: string
): ObjectWithContextList => {
  if (!searchText) return list;

  const lowercaseSearchText = searchText.toLowerCase();

  return list.filter((objectWithContext: ObjectWithContext) => {
    return (
      objectWithContext.object
        .getName()
        .toLowerCase()
        .indexOf(lowercaseSearchText) !== -1
    );
  });
};

export const filterGroupsList = (
  list: GroupWithContextList,
  searchText: string
): GroupWithContextList => {
  if (!searchText) return list;

  const lowercaseSearchText = searchText.toLowerCase();

  return list.filter((groupWithContext: GroupWithContext) => {
    return (
      groupWithContext.group
        .getName()
        .toLowerCase()
        .indexOf(lowercaseSearchText) !== -1
    );
  });
};

export const enumerateObjectsAndGroups = (
  globalObjectsContainer: gdObjectsContainer,
  objectsContainer: gdObjectsContainer,
  type: ?string = undefined
) => {
  const filterObject = (object: gdObject): boolean => {
    return (
      !type ||
      gd.getTypeOfObject(
        globalObjectsContainer,
        objectsContainer,
        object.getName(),
        false
      ) === type
    );
  };
  const filterGroup = (group: gdObjectGroup): boolean => {
    return (
      !type ||
      gd.getTypeOfObject(
        globalObjectsContainer,
        objectsContainer,
        group.getName(),
        true
      ) === type
    );
  };

  const containerObjectsList: ObjectWithContextList = mapFor(
    0,
    objectsContainer.getObjectsCount(),
    i => objectsContainer.getObjectAt(i)
  )
    .filter(filterObject)
    .map(object => ({ object, global: false }));

  const containerGroups = objectsContainer.getObjectGroups();
  const containerGroupsList: GroupWithContextList = mapFor(
    0,
    containerGroups.count(),
    i => {
      return containerGroups.getAt(i);
    }
  )
    .filter(filterGroup)
    .map(group => ({ group, global: false }));

  const projectObjectsList: ObjectWithContextList =
    globalObjectsContainer === objectsContainer
      ? []
      : mapFor(0, globalObjectsContainer.getObjectsCount(), i =>
          globalObjectsContainer.getObjectAt(i)
        )
          .filter(filterObject)
          .map(object => ({ object, global: true }));

  const projectGroups = globalObjectsContainer.getObjectGroups();
  const projectGroupsList: GroupWithContextList =
    globalObjectsContainer === objectsContainer
      ? []
      : mapFor(0, projectGroups.count(), i => {
          return projectGroups.getAt(i);
        })
          .filter(filterGroup)
          .map(group => ({ group, global: true }));

  const allObjectsList: ObjectWithContextList = containerObjectsList.concat(
    projectObjectsList
  );
  const allGroupsList: GroupWithContextList = containerGroupsList.concat(
    projectGroupsList
  );

  return {
    containerObjectsList,
    projectObjectsList,
    allObjectsList,
    containerGroupsList,
    projectGroupsList,
    allGroupsList,
  };
};
