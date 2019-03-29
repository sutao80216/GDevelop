// @flow
import { Trans } from '@lingui/macro';

import * as React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import SpritesList from './SpritesList';
import Add from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { mapFor } from '../../../Utils/MapFor';
import SemiControlledTextField from '../../../UI/SemiControlledTextField';
import Dialog from '../../../UI/Dialog';
import EmptyMessage from '../../../UI/EmptyMessage';
import MiniToolbar from '../../../UI/MiniToolbar';
import DragHandle from '../../../UI/DragHandle';
import ContextMenu from '../../../UI/Menu/ContextMenu';
import { showWarningBox } from '../../../UI/Messages/MessageBox';
import ResourcesLoader from '../../../ResourcesLoader';
import PointsEditor from './PointsEditor';
import CollisionMasksEditor from './CollisionMasksEditor';
import {
  deleteSpritesFromAnimation,
  duplicateSpritesInAnimation,
} from './Utils/SpriteObjectHelper';
import { type EditorProps } from '../EditorProps.flow';
import {
  type ResourceSource,
  type ChooseResourceFunction,
} from '../../../ResourcesList/ResourceSource.flow';
import { type ResourceExternalEditor } from '../../../ResourcesList/ResourceExternalEditor.flow';

const gd = global.gd;

const styles = {
  gridList: {
    overflowY: 'auto',
  },
  animationTitle: {
    flex: 1,
  },
  animationTools: {
    flexShrink: 0,
  },
  lastLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addAnimation: {
    display: 'flex',
  },
  addAnimationText: {
    justifyContent: 'flex-end',
  },
};

const AddAnimationLine = ({ onAdd, extraTools }) => (
  <div style={styles.lastLine}>
    {extraTools}
    <div style={styles.addAnimation}>
      <EmptyMessage style={styles.addAnimationText}>
        Click to add an animation:
      </EmptyMessage>
      <IconButton onClick={onAdd}>
        <Add />
      </IconButton>
    </div>
  </div>
);

type AnimationProps = {|
  animation: gdAnimation,
  id: number,
  project: gdProject,
  resourceSources: Array<ResourceSource>,
  onChooseResource: ChooseResourceFunction,
  resourceExternalEditors: Array<ResourceExternalEditor>,
  onRemove: () => void,
  resourcesLoader: typeof ResourcesLoader,
  onSpriteContextMenu: (x: number, y: number, sprite: gdSprite) => void,
  selectedSprites: {
    [number]: boolean,
  },
  onSelectSprite: (sprite: gdSprite, selected: boolean) => void,
  onReplaceDirection: (
    directionIndex: number,
    newDirection: gdDirection
  ) => void,
  objectName: string,
  onChangeName: string => void,
|};

class Animation extends React.Component<AnimationProps, void> {
  render() {
    const {
      animation,
      id,
      project,
      resourceSources,
      onRemove,
      onChooseResource,
      resourceExternalEditors,
      resourcesLoader,
      onSpriteContextMenu,
      selectedSprites,
      onSelectSprite,
      onReplaceDirection,
      objectName,
      onChangeName,
    } = this.props;

    const animationName = animation.getName();
    return (
      <GridTile>
        <MiniToolbar smallest>
          <DragHandle />
          <span style={styles.animationTitle}>
            Animation #{id}{' '}
            <SemiControlledTextField
              commitOnBlur
              value={animation.getName()}
              hintText={<Trans>Optional animation name</Trans>}
              onChange={text => onChangeName(text)}
            />
          </span>
          <span style={styles.animationTools}>
            <IconButton onClick={onRemove}>
              <Delete />
            </IconButton>
          </span>
        </MiniToolbar>
        {mapFor(0, animation.getDirectionsCount(), i => {
          const direction = animation.getDirection(i);
          return (
            <SpritesList
              direction={direction}
              key={i}
              project={project}
              resourcesLoader={resourcesLoader}
              resourceSources={resourceSources}
              onChooseResource={onChooseResource}
              resourceExternalEditors={resourceExternalEditors}
              onSpriteContextMenu={onSpriteContextMenu}
              selectedSprites={selectedSprites}
              onSelectSprite={onSelectSprite}
              onReplaceByDirection={newDirection =>
                onReplaceDirection(i, newDirection)
              }
              objectName={objectName}
              animationName={animationName}
              onChangeName={onChangeName}
            />
          );
        })}
      </GridTile>
    );
  }
}

const SortableAnimation = SortableElement(Animation);

const SortableAnimationsList = SortableContainer(
  ({
    spriteObject,
    objectName,
    onAddAnimation,
    onRemoveAnimation,
    onChangeAnimationName,
    project,
    resourcesLoader,
    resourceSources,
    onChooseResource,
    resourceExternalEditors,
    extraBottomTools,
    onSpriteContextMenu,
    selectedSprites,
    onSelectSprite,
    onReplaceDirection,
  }) => {
    return (
      <GridList style={styles.gridList} cellHeight="auto" cols={1}>
        {[
          ...mapFor(0, spriteObject.getAnimationsCount(), i => {
            const animation = spriteObject.getAnimation(i);
            return (
              <SortableAnimation
                key={i}
                index={i}
                id={i}
                animation={animation}
                project={project}
                resourcesLoader={resourcesLoader}
                resourceSources={resourceSources}
                onChooseResource={onChooseResource}
                resourceExternalEditors={resourceExternalEditors}
                onRemove={() => onRemoveAnimation(i)}
                onChangeName={newName => onChangeAnimationName(i, newName)}
                onSpriteContextMenu={onSpriteContextMenu}
                selectedSprites={selectedSprites}
                onSelectSprite={onSelectSprite}
                onReplaceDirection={(directionId, newDirection) =>
                  onReplaceDirection(i, directionId, newDirection)
                }
                objectName={objectName}
              />
            );
          }),
          <AddAnimationLine
            onAdd={onAddAnimation}
            key="add-animation-line"
            disabled
            index={spriteObject.getAnimationsCount()}
            extraTools={extraBottomTools}
          />,
        ]}
      </GridList>
    );
  }
);

type AnimationsListContainerProps = {|
  spriteObject: gdSpriteObject,
  project: gdProject,
  resourceSources: Array<ResourceSource>,
  onChooseResource: ChooseResourceFunction,
  resourceExternalEditors: Array<ResourceExternalEditor>,
  resourcesLoader: typeof ResourcesLoader,
  extraBottomTools: React.Node,
  onSizeUpdated: () => void,
  objectName: string,
|};

type AnimationsListContainerState = {|
  selectedSprites: {
    [number]: boolean,
  },
|};

class AnimationsListContainer extends React.Component<
  AnimationsListContainerProps,
  AnimationsListContainerState
> {
  state = {
    selectedSprites: {},
  };
  spriteContextMenu: ?ContextMenu;

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.spriteObject.moveAnimation(oldIndex, newIndex);
    this.forceUpdate();
  };

  addAnimation = () => {
    const emptyAnimation = new gd.Animation();
    emptyAnimation.setDirectionsCount(1);
    this.props.spriteObject.addAnimation(emptyAnimation);
    this.forceUpdate();
    this.props.onSizeUpdated();
  };

  removeAnimation = i => {
    //eslint-disable-next-line
    const answer = confirm('Are you sure you want to remove this animation?');

    if (answer) {
      this.props.spriteObject.removeAnimation(i);
      this.forceUpdate();
      this.props.onSizeUpdated();
    }
  };

  changeAnimationName = (i, newName) => {
    const { spriteObject } = this.props;

    const otherNames = mapFor(0, spriteObject.getAnimationsCount(), index => {
      return index === i
        ? undefined // Don't check the current animation name as we're changing it.
        : spriteObject.getAnimation(index).getName();
    });

    if (newName !== '' && otherNames.filter(name => name === newName).length) {
      showWarningBox(
        'Another animation with this name already exists. Please use another name.'
      );
      return;
    }

    spriteObject.getAnimation(i).setName(newName);
    this.forceUpdate();
  };

  deleteSelection = () => {
    const { spriteObject } = this.props;

    mapFor(0, spriteObject.getAnimationsCount(), index => {
      const animation = spriteObject.getAnimation(index);
      deleteSpritesFromAnimation(animation, this.state.selectedSprites);
    });

    this.setState({
      selectedSprites: {},
    });
  };

  duplicateSelection = () => {
    const { spriteObject } = this.props;

    mapFor(0, spriteObject.getAnimationsCount(), index => {
      const animation = spriteObject.getAnimation(index);
      duplicateSpritesInAnimation(animation, this.state.selectedSprites);
    });

    this.setState({
      selectedSprites: {},
    });
  };

  openSpriteContextMenu = (x, y, sprite, index) => {
    this.selectSprite(sprite, true);
    if (this.spriteContextMenu) this.spriteContextMenu.open(x, y);
  };

  selectSprite = (sprite, selected) => {
    this.setState({
      selectedSprites: {
        ...this.state.selectedSprites,
        [sprite.ptr]: selected,
      },
    });
  };

  replaceDirection = (animationId, directionId, newDirection) => {
    this.props.spriteObject
      .getAnimation(animationId)
      .setDirection(newDirection, directionId);
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <SortableAnimationsList
          spriteObject={this.props.spriteObject}
          objectName={this.props.objectName}
          helperClass="sortable-helper"
          project={this.props.project}
          onSortEnd={this.onSortEnd}
          onAddAnimation={this.addAnimation}
          onChangeAnimationName={this.changeAnimationName}
          onRemoveAnimation={this.removeAnimation}
          onReplaceDirection={this.replaceDirection}
          onSpriteContextMenu={this.openSpriteContextMenu}
          selectedSprites={this.state.selectedSprites}
          onSelectSprite={this.selectSprite}
          resourcesLoader={this.props.resourcesLoader}
          resourceSources={this.props.resourceSources}
          resourceExternalEditors={this.props.resourceExternalEditors}
          onChooseResource={this.props.onChooseResource}
          extraBottomTools={this.props.extraBottomTools}
          useDragHandle
          lockAxis="y"
          axis="y"
        />
        <ContextMenu
          ref={spriteContextMenu =>
            (this.spriteContextMenu = spriteContextMenu)
          }
          buildMenuTemplate={() => [
            {
              label: 'Delete selection',
              click: () => this.deleteSelection(),
            },
            {
              label: 'Duplicate selection',
              click: () => this.duplicateSelection(),
            },
          ]}
        />
      </div>
    );
  }
}

type State = {|
  pointsEditorOpen: boolean,
  collisionMasksEditorOpen: boolean,
|};

export default class SpriteEditor extends React.Component<EditorProps, State> {
  state = {
    pointsEditorOpen: false,
    collisionMasksEditorOpen: false,
  };

  resourcesLoader: typeof ResourcesLoader;

  constructor(props: EditorProps) {
    super(props);

    this.resourcesLoader = ResourcesLoader;
  }

  openPointsEditor = (open: boolean = true) => {
    this.setState({
      pointsEditorOpen: open,
    });
  };

  openCollisionMasksEditor = (open: boolean = true) => {
    this.setState({
      collisionMasksEditorOpen: open,
    });
  };

  render() {
    const {
      object,
      project,
      resourceSources,
      onChooseResource,
      resourceExternalEditors,
      onSizeUpdated,
      objectName,
    } = this.props;
    const spriteObject = gd.asSpriteObject(object);

    return (
      <div>
        <AnimationsListContainer
          spriteObject={spriteObject}
          resourcesLoader={this.resourcesLoader}
          resourceSources={resourceSources}
          onChooseResource={onChooseResource}
          resourceExternalEditors={resourceExternalEditors}
          project={project}
          objectName={objectName}
          onSizeUpdated={onSizeUpdated}
          extraBottomTools={
            <div>
              <RaisedButton
                label={<Trans>Edit hitboxes</Trans>}
                primary={false}
                onClick={() => this.openCollisionMasksEditor(true)}
                disabled={spriteObject.getAnimationsCount() === 0}
              />
              <RaisedButton
                label={<Trans>Edit points</Trans>}
                primary={false}
                onClick={() => this.openPointsEditor(true)}
                disabled={spriteObject.getAnimationsCount() === 0}
              />
            </div>
          }
        />
        {this.state.pointsEditorOpen && (
          <Dialog
            actions={
              <FlatButton
                label={<Trans>Close</Trans>}
                primary
                onClick={() => this.openPointsEditor(false)}
              />
            }
            autoScrollBodyContent
            noMargin
            modal
            onRequestClose={() => this.openPointsEditor(false)}
            open={this.state.pointsEditorOpen}
          >
            <PointsEditor
              object={spriteObject}
              resourcesLoader={this.resourcesLoader}
              project={project}
              onPointsUpdated={
                () =>
                  this.forceUpdate() /*Force update to ensure dialog is properly positioned*/
              }
            />
          </Dialog>
        )}
        {this.state.collisionMasksEditorOpen && (
          <Dialog
            actions={
              <FlatButton
                label={<Trans>Close</Trans>}
                primary
                onClick={() => this.openCollisionMasksEditor(false)}
              />
            }
            autoScrollBodyContent
            noMargin
            modal
            onRequestClose={() => this.openCollisionMasksEditor(false)}
            open={this.state.collisionMasksEditorOpen}
          >
            <CollisionMasksEditor
              object={spriteObject}
              resourcesLoader={this.resourcesLoader}
              project={project}
              onCollisionMasksUpdated={
                () =>
                  this.forceUpdate() /*Force update to ensure dialog is properly positioned*/
              }
            />
          </Dialog>
        )}
      </div>
    );
  }
}
