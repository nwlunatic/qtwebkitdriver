// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "chrome/test/qtwebkitdriver/chrome/chrome_android_impl.h"

#include "chrome/test/qtwebkitdriver/chrome/device_manager.h"
#include "chrome/test/qtwebkitdriver/chrome/devtools_http_client.h"
#include "chrome/test/qtwebkitdriver/chrome/status.h"
#include "chrome/test/qtwebkitdriver/net/port_server.h"

ChromeAndroidImpl::ChromeAndroidImpl(
    scoped_ptr<DevToolsHttpClient> client,
    ScopedVector<DevToolsEventListener>& devtools_event_listeners,
    scoped_ptr<PortReservation> port_reservation,
    scoped_ptr<Device> device)
    : ChromeImpl(client.Pass(),
                 devtools_event_listeners,
                 port_reservation.Pass()),
      device_(device.Pass()) {}

ChromeAndroidImpl::~ChromeAndroidImpl() {}

std::string ChromeAndroidImpl::GetOperatingSystemName() {
  return "ANDROID";
}

Status ChromeAndroidImpl::QuitImpl() {
  return device_->StopApp();
}

