import { editor } from 'monaco-editor';
import { ARView } from 'vega-ar/src/arView';
import { Config } from 'vega-themes/build/config';
import { Mode, Renderer, View } from '../constants';

export const EXPORT_VEGA: 'EXPORT_VEGA' = 'EXPORT_VEGA';
export const LOG_ERROR: 'LOG_ERROR' = 'LOG_ERROR';
export const PARSE_SPEC: 'PARSE_SPEC' = 'PARSE_SPEC';
export const SET_BASEURL: 'SET_BASEURL' = 'SET_BASEURL';
export const SET_COMPILED_VEGA_PANE_SIZE: 'SET_COMPILED_VEGA_PANE_SIZE' = 'SET_COMPILED_VEGA_PANE_SIZE';
export const SET_DEBUG_PANE_SIZE: 'SET_DEBUG_PANE_SIZE' = 'SET_DEBUG_PANE_SIZE';
export const SET_EDITOR_REFERENCE: 'SET_EDITOR_REFERENCE' = 'SET_EDITOR_REFERENCE';
export const SET_GIST_VEGA_LITE_SPEC: 'SET_GIST_VEGA_LITE_SPEC' = 'SET_GIST_VEGA_LITE_SPEC';
export const SET_GIST_VEGA_SPEC: 'SET_GIST_VEGA_SPEC' = 'SET_GIST_VEGA_SPEC';
export const SET_MODE: 'SET_MODE' = 'SET_MODE';
export const SET_MODE_ONLY: 'SET_MODE_ONLY' = 'SET_MODE_ONLY';
export const SET_SCROLL_POSITION: 'SET_SCROLL_POSITION' = 'SET_SCROLL_POSITION';
export const SET_RENDERER: 'SET_RENDERER' = 'SET_RENDERER';
export const SET_VEGA_EXAMPLE: 'SET_VEGA_EXAMPLE' = 'SET_VEGA_EXAMPLE';
export const SET_VEGA_AR_EXAMPLE: 'SET_VEGA_AR_EXAMPLE' = 'SET_VEGA_AR_EXAMPLE';
export const SET_VEGA_LITE_EXAMPLE: 'SET_VEGA_LITE_EXAMPLE' = 'SET_VEGA_LITE_EXAMPLE';
export const SET_VIEW: 'SET_VIEW' = 'SET_VIEW';
export const SHOW_LOGS: 'SHOW_LOGS' = 'SHOW_LOGS';
export const TOGGLE_AR_MODE: 'TOGGLE_AR_MODE' = 'TOGGLE_AR_MODE';
export const TOGGLE_AR_DEBUG: 'TOGGLE_AR_DEBUG' = 'TOGGLE_AR_DEBUG';
export const TOGGLE_AUTO_PARSE: 'TOGGLE_AUTO_PARSE' = 'TOGGLE_AUTO_PARSE';
export const TOGGLE_COMPILED_VEGA_SPEC: 'TOGGLE_COMPILED_VEGA_SPEC' = 'TOGGLE_COMPILED_VEGA_SPEC';
export const TOGGLE_DEBUG_PANE: 'TOGGLE_DEBUG_PANE' = 'TOGGLE_DEBUG_PANE';
export const TOGGLE_NAV_BAR: 'TOGGLE_NAV_BAR' = 'TOGGLE_NAV_BAR';
export const UPDATE_AR_HINTS: 'UPDATE_AR_HINT' = 'UPDATE_AR_HINT';
export const UPDATE_AR_HINT_IDS: 'UPDATE_AR_HINT_IDS' = 'UPDATE_AR_HINT_IDS';
export const UPDATE_EDITOR_STRING: 'UPDATE_EDITOR_STRING' = 'UPDATE_EDITOR_STRING';
export const UPDATE_VEGA_LITE_SPEC: 'UPDATE_VEGA_LITE_SPEC' = 'UPDATE_VEGA_LITE_SPEC';
export const UPDATE_VEGA_SPEC: 'UPDATE_VEGA_SPEC' = 'UPDATE_VEGA_SPEC';
export const UPDATE_VEGA_AR_SPEC: 'UPDATE_VEGA_AR_SPEC' = 'UPDATE_VEGA_AR_SPEC';
export const SET_CONFIG: 'SET_CONFIG' = 'SET_CONFIG';
export const SET_THEME_NAME: 'SET_THEME_NAME' = 'SET_THEME_NAME';
export const SET_SIDEPANE_ITEM: 'SET_SIDEPANE_ITEM' = 'SET_SIDEPANE_ITEM';
export const SET_CONFIG_EDITOR_STRING: 'SET_CONFIG_EDITOR_STRING' = 'SET_CONFIG_EDITOR_STRING';

export type Action =
  | SetMode
  | SetModeOnly
  | SetScrollPosition
  | ParseSpec
  | SetVegaExample
  | SetVegaARExample
  | SetVegaLiteExample
  | UpdateVegaSpec
  | UpdateVegaARSpec
  | UpdateVegaLiteSpec
  | UpdateARHint
  | UpdateARHintIds
  | SetGistVegaSpec
  | SetGistVegaLiteSpec
  | ToggleARMode
  | ToggleARDebug
  | ToggleAutoParse
  | ToggleCompiledVegaSpec
  | ToggleDebugPane
  | ToggleNavbar
  | LogError
  | UpdateEditorString
  | ExportVega
  | SetRenderer
  | SetBaseUrl
  | SetView
  | SetDebugPaneSize
  | ShowLogs
  | SetCompiledVegaPaneSize
  | SetConfig
  | SetConfigEditorString
  | SetThemeName
  | SetSidePaneItem
  | SetEditorReference;

export function setMode(mode: Mode) {
  return {
    mode,
    type: SET_MODE,
  };
}
export type SetMode = ReturnType<typeof setMode>;

export function setModeOnly(mode: Mode) {
  return {
    mode,
    type: SET_MODE_ONLY,
  };
}
export type SetModeOnly = ReturnType<typeof setModeOnly>;

export function setScrollPosition(position: number) {
  return {
    position,
    type: SET_SCROLL_POSITION,
  };
}
export type SetScrollPosition = ReturnType<typeof setScrollPosition>;

export function parseSpec(value: boolean) {
  return {
    parse: value,
    type: PARSE_SPEC,
  };
}
export type ParseSpec = ReturnType<typeof parseSpec>;

export function setVegaARExample(example: string, spec) {
  return {
    example,
    spec,
    type: SET_VEGA_AR_EXAMPLE,
  };
}
export type SetVegaARExample = ReturnType<typeof setVegaARExample>;


export function setVegaExample(example: string, spec) {
  return {
    example,
    spec,
    type: SET_VEGA_EXAMPLE,
  };
}
export type SetVegaExample = ReturnType<typeof setVegaExample>;

export function setVegaLiteExample(example: string, spec) {
  return {
    example,
    spec,
    type: SET_VEGA_LITE_EXAMPLE,
  };
}
export type SetVegaLiteExample = ReturnType<typeof setVegaLiteExample>;

export function updateVegaSpec(spec) {
  return {
    spec,
    type: UPDATE_VEGA_SPEC,
  };
}
export type UpdateVegaSpec = ReturnType<typeof updateVegaSpec>;

export function updateVegaARSpec(spec) {
  return {
    spec,
    type: UPDATE_VEGA_AR_SPEC,
  };
}
export type UpdateVegaARSpec = ReturnType<typeof updateVegaARSpec>;

export function updateVegaLiteSpec(spec) {
  return {
    spec,
    type: UPDATE_VEGA_LITE_SPEC,
  };
}
export type UpdateVegaLiteSpec = ReturnType<typeof updateVegaLiteSpec>;

export function updateARHint(hints: editor.IModelDeltaDecoration[]) {
  return {
    hints,
    type: UPDATE_AR_HINTS
  };
}
export type UpdateARHint = ReturnType<typeof updateARHint>;

export function updateARHintIds(ids: string[]) {
  return {
    ids,
    type: UPDATE_AR_HINT_IDS
  };
}
export type UpdateARHintIds = ReturnType<typeof updateARHintIds>;

export function setGistVegaSpec(gist: string, spec) {
  return {
    gist,
    spec,
    type: SET_GIST_VEGA_SPEC,
  };
}
export type SetGistVegaSpec = ReturnType<typeof setGistVegaSpec>;

export function setGistVegaLiteSpec(gist: string, spec) {
  return {
    gist,
    spec,
    type: SET_GIST_VEGA_LITE_SPEC,
  };
}
export type SetGistVegaLiteSpec = ReturnType<typeof setGistVegaLiteSpec>;

export function toggleAutoParse() {
  return {
    type: TOGGLE_AUTO_PARSE,
  };
}
export type ToggleAutoParse = ReturnType<typeof toggleAutoParse>;

export function toggleCompiledVegaSpec() {
  return {
    type: TOGGLE_COMPILED_VEGA_SPEC,
  };
}
export type ToggleCompiledVegaSpec = ReturnType<typeof toggleCompiledVegaSpec>;

export function toggleDebugPane() {
  return {
    type: TOGGLE_DEBUG_PANE,
  };
}
export type ToggleDebugPane = ReturnType<typeof toggleDebugPane>;

export function logError(err) {
  return {
    error: err,
    type: LOG_ERROR,
  };
}
export type LogError = ReturnType<typeof logError>;

export function updateEditorString(editorString: string) {
  return {
    editorString,
    type: UPDATE_EDITOR_STRING,
  };
}
export type UpdateEditorString = ReturnType<typeof updateEditorString>;

export function exportVega(value: boolean) {
  return {
    export: value,
    type: EXPORT_VEGA,
  };
}
export type ExportVega = ReturnType<typeof exportVega>;

export function setRenderer(renderer: Renderer) {
  return {
    renderer,
    type: SET_RENDERER,
  };
}
export type SetRenderer = ReturnType<typeof setRenderer>;

export function toggleARDebug(debug: boolean) {
  return {
    debug,
    type: TOGGLE_AR_DEBUG
  }
}
export type ToggleARDebug = ReturnType<typeof toggleARDebug>;

export function toggleARMode(ar: boolean) {
  return {
    ar,
    type: TOGGLE_AR_MODE,
  }
}
export type ToggleARMode = ReturnType<typeof toggleARMode>;

export function setBaseUrl(baseURL: string) {
  return {
    baseURL,
    type: SET_BASEURL,
  };
}
export type SetBaseUrl = ReturnType<typeof setBaseUrl>;

export function setView(view: View | ARView) {
  return {
    type: SET_VIEW,
    view,
  };
}
export type SetView = ReturnType<typeof setView>;

export function setDebugPaneSize(size: number) {
  return {
    debugPaneSize: size,
    type: SET_DEBUG_PANE_SIZE,
  };
}
export type SetDebugPaneSize = ReturnType<typeof setDebugPaneSize>;

export function showLogs(value: boolean) {
  return {
    logs: value,
    type: SHOW_LOGS,
  };
}
export type ShowLogs = ReturnType<typeof showLogs>;

export function setCompiledVegaPaneSize(size: number) {
  return {
    compiledVegaPaneSize: size,
    type: SET_COMPILED_VEGA_PANE_SIZE,
  };
}

export type SetCompiledVegaPaneSize = ReturnType<typeof setCompiledVegaPaneSize>;

export function toggleNavbar(value: string) {
  return {
    navItem: value,
    type: TOGGLE_NAV_BAR,
  };
}

export type ToggleNavbar = ReturnType<typeof toggleNavbar>;

export function setConfig(value: Config) {
  return {
    config: value,
    type: SET_CONFIG,
  };
}

export type SetConfig = ReturnType<typeof setConfig>;

export function setConfigEditorString(value: string) {
  return {
    configEditorString: value,
    type: SET_CONFIG_EDITOR_STRING,
  };
}

export type SetConfigEditorString = ReturnType<typeof setConfigEditorString>;

export function setThemeName(value: string) {
  return {
    themeName: value,
    type: SET_THEME_NAME,
  };
}

export type SetThemeName = ReturnType<typeof setThemeName>;

export function setSidePaneItem(value: string) {
  return {
    sidePaneItem: value,
    type: SET_SIDEPANE_ITEM,
  };
}

export type SetSidePaneItem = ReturnType<typeof setSidePaneItem>;

export function setEditorReference(editorRef: any) {
  return {
    editorRef: (editorRef as any).editor,
    type: SET_EDITOR_REFERENCE,
  };
}

export type SetEditorReference = ReturnType<typeof setEditorReference>;
