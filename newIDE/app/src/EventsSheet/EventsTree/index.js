// @flow
import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import findIndex from 'lodash/findIndex';
import {
  SortableTreeWithoutDndContext,
  getNodeAtPath,
} from 'react-sortable-tree';
import { mapFor } from '../../Utils/MapFor';
import { getInitialSelection, isEventSelected } from '../SelectionHandler';
import EventsRenderingService from './EventsRenderingService';
import EventHeightsCache from './EventHeightsCache';
import { eventsTree, eventsTreeWithSearchResults } from './ClassNames';
import './style.css';
import {
  type SelectionState,
  type EventContext,
  type InstructionsListContext,
  type InstructionContext,
  type ParameterContext,
} from '../SelectionHandler';
const gd = global.gd;

const indentWidth = 22;

const styles = {
  container: { flex: 1 },
};

type EventsContainerProps = {|
  eventsHeightsCache: EventHeightsCache,
  event: gdBaseEvent,
  leftIndentWidth: number,
  disabled: boolean,
  project: gdProject,
  layout?: ?gdLayout,
  globalObjectsContainer: gdObjectsContainer,
  objectsContainer: gdObjectsContainer,
  selection: SelectionState,
  onAddNewInstruction: Function,
  onMoveToInstruction: (destinationContext: InstructionContext) => void,
  onMoveToInstructionsList: (
    destinationContext: InstructionsListContext
  ) => void,
  onInstructionClick: InstructionContext => void,
  onInstructionDoubleClick: InstructionContext => void,
  onInstructionContextMenu: (x: number, y: number, InstructionContext) => void,
  onInstructionsListContextMenu: (
    x: number,
    y: number,
    InstructionsListContext
  ) => void,
  onParameterClick: ParameterContext => void,

  onEventClick: (eventContext: EventContext) => void,
  onEventContextMenu: (x: number, y: number) => void,
  onOpenExternalEvents: string => void,
  onOpenLayout: string => void,
|};

/**
 * The component containing an event.
 * It will report the rendered event height so that the EventsTree can
 * update accordingly.
 */
class EventContainer extends Component<EventsContainerProps, {||}> {
  _container: ?any;
  componentDidMount() {
    const height = this._container ? this._container.offsetHeight : 0;
    this.props.eventsHeightsCache.setEventHeight(this.props.event, height);
  }

  componentDidUpdate() {
    const height = this._container ? this._container.offsetHeight : 0;
    this.props.eventsHeightsCache.setEventHeight(this.props.event, height);
  }

  _onEventUpdated = () => {
    this.forceUpdate();
  };

  _onEventContextMenu = (domEvent: any) => {
    domEvent.preventDefault();
    this.props.onEventContextMenu(domEvent.clientX, domEvent.clientY);
  };

  render() {
    const { event, project, layout, disabled } = this.props;
    const EventComponent = EventsRenderingService.getEventComponent(event);

    return (
      <div
        ref={container => (this._container = container)}
        onClick={this.props.onEventClick}
        onContextMenu={this._onEventContextMenu}
      >
        {EventComponent && (
          <EventComponent
            project={project}
            layout={layout}
            event={event}
            globalObjectsContainer={this.props.globalObjectsContainer}
            objectsContainer={this.props.objectsContainer}
            selected={isEventSelected(this.props.selection, event)}
            selection={this.props.selection}
            leftIndentWidth={this.props.leftIndentWidth}
            onUpdate={this._onEventUpdated}
            onAddNewInstruction={this.props.onAddNewInstruction}
            onMoveToInstruction={this.props.onMoveToInstruction}
            onMoveToInstructionsList={this.props.onMoveToInstructionsList}
            onInstructionClick={this.props.onInstructionClick}
            onInstructionDoubleClick={this.props.onInstructionDoubleClick}
            onInstructionContextMenu={this.props.onInstructionContextMenu}
            onInstructionsListContextMenu={
              this.props.onInstructionsListContextMenu
            }
            onParameterClick={this.props.onParameterClick}
            onOpenExternalEvents={this.props.onOpenExternalEvents}
            onOpenLayout={this.props.onOpenLayout}
            disabled={
              disabled /* Use disabled (not event.disabled) as it is true if a parent event is disabled*/
            }
          />
        )}
      </div>
    );
  }
}

const getNodeKey = ({ treeIndex }) => treeIndex;

const ThemableSortableTree = ({ muiTheme, className, ...otherProps }) => (
  <SortableTreeWithoutDndContext
    className={`${eventsTree} ${
      muiTheme.eventsSheetRootClassName
    } ${className}`}
    {...otherProps}
  />
);
const SortableTree = muiThemeable()(ThemableSortableTree);

const noop = () => {};

type EventsTreeProps = {|
  events: gdEventsList,
  project: gdProject,
  layout?: ?gdLayout,
  globalObjectsContainer: gdObjectsContainer,
  objectsContainer: gdObjectsContainer,
  selection: SelectionState,
  onAddNewInstruction: Function,
  onMoveToInstruction: (destinationContext: InstructionContext) => void,
  onMoveToInstructionsList: (
    destinationContext: InstructionsListContext
  ) => void,
  onInstructionClick: InstructionContext => void,
  onInstructionDoubleClick: InstructionContext => void,
  onInstructionContextMenu: (x: number, y: number, InstructionContext) => void,
  onInstructionsListContextMenu: (
    x: number,
    y: number,
    InstructionsListContext
  ) => void,
  onParameterClick: ParameterContext => void,

  onEventClick: (eventContext: EventContext) => void,
  onEventContextMenu: (
    x: number,
    y: number,
    eventContext: EventContext
  ) => void,
  onAddNewEvent: (eventContext: EventContext) => void,
  onOpenExternalEvents: string => void,
  onOpenLayout: string => void,

  searchResults: ?Array<gdBaseEvent>,
  searchFocusOffset: ?number,

  onEventMoved: () => void,
|};

type SortableTreeNode = {
  eventsList: gdEventsList,
  event: gdBaseEvent,
  depth: number,
  disabled: boolean,
  isCondition: boolean,
  indexInList: number,
};

/**
 * Display a tree of event. Builtin on react-sortable-tree so that event
 * can be drag'n'dropped and events rows are virtualized.
 */
export default class ThemableEventsTree extends Component<EventsTreeProps, *> {
  static defaultProps = {
    selection: getInitialSelection(),
  };
  _list: ?any;
  eventsHeightsCache: EventHeightsCache;

  constructor(props: EventsTreeProps) {
    super(props);

    this.eventsHeightsCache = new EventHeightsCache(this);
    this.state = {
      ...this._eventsToTreeData(props.events),
    };
  }

  componentDidMount() {
    this.onHeightsChanged();
  }

  /**
   * Should be called whenever an event height has changed
   */
  onHeightsChanged(cb: ?() => void) {
    this.forceUpdate(() => {
      // Help the developer updating react-sortable-tree
      if (this._list && !this._list.wrappedInstance.recomputeRowHeights) {
        console.error(
          'recomputeRowHeights not on wrappedInstance, this must be fixed after updating react-virtualized/react-sortable-tree'
        );
      }

      if (this._list) this._list.wrappedInstance.recomputeRowHeights();
      if (cb) cb();
    });
  }

  /**
   * Should be called whenever events changed (new event...)
   * from outside this component.
   */
  forceEventsUpdate(cb: ?() => void) {
    this.setState(this._eventsToTreeData(this.props.events), () => {
      // Help the developer updating react-sortable-tree
      if (this._list && !this._list.wrappedInstance.recomputeRowHeights) {
        console.error(
          'recomputeRowHeights not on wrappedInstance, this must be fixed after updating react-virtualized/react-sortable-tree'
        );
      }

      if (this._list) this._list.wrappedInstance.recomputeRowHeights();
      if (cb) cb();
    });
  }

  scrollToEvent(event: gdBaseEvent) {
    const row = this._getEventRow(event);
    if (row !== -1 && this._list) this._list.wrappedInstance.scrollToRow(row);
  }

  /**
   * Unfold events so that the given one is visible
   */
  unfoldForEvent(event: gdBaseEvent) {
    gd.EventsListUnfolder.unfoldWhenContaining(this.props.events, event);
    this.forceEventsUpdate();
  }

  _getEventRow(searchedEvent: gdBaseEvent) {
    return findIndex(
      this.state.flatData,
      event => event.ptr === searchedEvent.ptr
    );
  }

  _eventsToTreeData = (
    eventsList: gdEventsList,
    flatData: Array<gdBaseEvent> = [],
    depth: number = 0,
    parentDisabled: boolean = false
  ) => {
    const treeData = mapFor<any>(0, eventsList.getEventsCount(), i => {
      const event = eventsList.getEventAt(i);
      flatData.push(event);

      const disabled = parentDisabled || event.isDisabled();

      return {
        title: this._renderEvent,
        event,
        eventsList,
        indexInList: i,
        expanded: !event.isFolded(),
        disabled,
        depth,
        key: event.ptr, //TODO: useless?
        children: this._eventsToTreeData(
          event.getSubEvents(),
          // flatData is a flat representation of events, one for each line.
          // Hence it should not contain the folded events.
          !event.isFolded() ? flatData : [],
          depth + 1,
          disabled
        ).treeData,
      };
    });

    return {
      treeData,
      flatData,
    };
  };

  _onMoveNode = ({
    treeData,
    path,
    node,
  }: {
    treeData: any,
    path: Array<any>,
    node: SortableTreeNode,
  }) => {
    // Get the event list where the event should be moved to.
    const targetPath = path.slice(0, -1);
    const target = getNodeAtPath({
      getNodeKey,
      treeData: treeData,
      path: targetPath,
    });
    const targetNode = target.node;
    const targetEventsList =
      targetNode && targetNode.event
        ? targetNode.event.getSubEvents()
        : this.props.events;
    const targetPosition =
      targetNode && targetNode.children ? targetNode.children.indexOf(node) : 0;

    // Get the moved event and its list from the moved node.
    const { event, eventsList } = node;

    // Do the move
    const newEvent = event.clone();
    eventsList.removeEvent(event);
    targetEventsList.insertEvent(newEvent, targetPosition);
    newEvent.delete();

    this.forceEventsUpdate();
    this.props.onEventMoved();
  };

  _canDrop = ({ nextParent }: { nextParent: ?SortableTreeNode }) => {
    if (nextParent && nextParent.event)
      return nextParent.event.canHaveSubEvents();

    return true;
  };

  _onVisibilityToggle = ({ node }: { node: SortableTreeNode }) => {
    const { event } = node;

    event.setFolded(!event.isFolded());
    this.forceEventsUpdate();
  };

  _renderEvent = ({ node }: { node: SortableTreeNode }) => {
    const { event, depth, disabled } = node;

    return (
      <EventContainer
        project={this.props.project}
        layout={this.props.layout}
        globalObjectsContainer={this.props.globalObjectsContainer}
        objectsContainer={this.props.objectsContainer}
        event={event}
        key={event.ptr}
        eventsHeightsCache={this.eventsHeightsCache}
        selection={this.props.selection}
        leftIndentWidth={depth * indentWidth}
        onAddNewInstruction={this.props.onAddNewInstruction}
        onMoveToInstruction={this.props.onMoveToInstruction}
        onMoveToInstructionsList={this.props.onMoveToInstructionsList}
        onInstructionClick={this.props.onInstructionClick}
        onInstructionDoubleClick={this.props.onInstructionDoubleClick}
        onParameterClick={this.props.onParameterClick}
        onEventClick={() =>
          this.props.onEventClick({
            eventsList: node.eventsList,
            event: node.event,
            indexInList: node.indexInList,
            isCondition: node.isCondition,
          })
        }
        onEventContextMenu={(x, y) =>
          this.props.onEventContextMenu(x, y, {
            eventsList: node.eventsList,
            event: node.event,
            indexInList: node.indexInList,
            isCondition: node.isCondition,
          })
        }
        onInstructionContextMenu={this.props.onInstructionContextMenu}
        onInstructionsListContextMenu={this.props.onInstructionsListContextMenu}
        onOpenExternalEvents={this.props.onOpenExternalEvents}
        onOpenLayout={this.props.onOpenLayout}
        disabled={
          disabled /* Use node.disabled (not event.disabled) as it is true if a parent event is disabled*/
        }
      />
    );
  };

  _treeSearchMethod = ({
    node,
    searchQuery,
  }: {
    node: SortableTreeNode,
    searchQuery: ?Array<gdBaseEvent>,
  }) => {
    const searchResults = searchQuery;
    if (!searchResults) return false;
    const { event } = node;

    return searchResults.find(highlightedEvent =>
      gd.compare(highlightedEvent, event)
    );
  };

  render() {
    return (
      <div style={styles.container}>
        <SortableTree
          treeData={this.state.treeData}
          scaffoldBlockPxWidth={indentWidth}
          onChange={noop}
          onVisibilityToggle={this._onVisibilityToggle}
          onMoveNode={this._onMoveNode}
          canDrop={this._canDrop}
          rowHeight={({ index }) => {
            const event = this.state.flatData[index];
            if (!event) return 0;

            return this.eventsHeightsCache.getEventHeight(event);
          }}
          searchMethod={this._treeSearchMethod}
          searchQuery={this.props.searchResults}
          searchFocusOffset={this.props.searchFocusOffset}
          className={
            this.props.searchResults ? eventsTreeWithSearchResults : ''
          }
          reactVirtualizedListProps={{
            ref: list => (this._list = list),
          }}
        />
      </div>
    );
  }
}
