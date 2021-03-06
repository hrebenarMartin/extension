import Tab from 'app/lmem/tab';
import { BaseAction, ErrorAction } from './';
import { Level } from '../utils/Logger';

export const OPTIONS_REQUESTED = 'OPTIONS_REQUESTED';
export interface OptionsRequestedAction extends BaseAction {
  type: typeof OPTIONS_REQUESTED;
  payload?: string;
}

export const optionsRequested = (
  pathname?: string
): OptionsRequestedAction => ({
  type: OPTIONS_REQUESTED,
  payload: pathname,
  meta: {
    sendToBackground: true
  }
});

export const OPTIONS_TAB_OPENED = 'OPTIONS_TAB_OPENED';
export interface OptionsTabOpened extends BaseAction {
  type: typeof OPTIONS_TAB_OPENED;
  payload: Tab;
}

export const optionsTabOpened = (tab: Tab): OptionsTabOpened => ({
  type: OPTIONS_TAB_OPENED,
  payload: tab
});

export const OPTIONS_TAB_OPEN_FAILED = 'OPTIONS_TAB_OPEN_FAILED';
export interface OptionsTabOpenFailedAction extends ErrorAction {
  type: typeof OPTIONS_TAB_OPEN_FAILED;
}

export const optionsTabOpenFailed = (
  error: Error
): OptionsTabOpenFailedAction => ({
  type: OPTIONS_TAB_OPEN_FAILED,
  error: true,
  payload: error,
  meta: { severity: Level.ERROR }
});
