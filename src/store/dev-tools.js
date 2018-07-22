import React from 'react'
import { createDevTools } from 'redux-devtools'

// Monitors
import MultipleMonitors from 'redux-devtools-multiple-monitors'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import Dispatcher from 'redux-devtools-dispatch'
import SliderMonitor from 'redux-slider-monitor'

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'
    defaultIsVisible={false}
    defaultPosition='bottom'
  >
    <MultipleMonitors>
      <LogMonitor theme='tomorrow' />
      <Dispatcher theme='tomorrow' />
    </MultipleMonitors>
    <SliderMonitor />
  </DockMonitor>
)

export default DevTools