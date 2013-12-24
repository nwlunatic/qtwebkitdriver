qtwebkitdriver
==============

# get chromium with git

+ https://code.google.com/p/chromium/wiki/UsingGit

# build (from chromium src/)

+ prepare chromium environment
+ build driver

###prepare chromium environment (for all OS):

+ git checkout 1b618ff654908ed239ab5db8cb5d5a96bc0c0ff5 # (SVN changes up to revision 231775)
+ gclient sync --jobs=16

###build driver (linux):

+ git clone https://github.com/nwlunatic/qtwebkitdriver.git chrome/test/qtwebkitdriver
+ ./build/gyp_chromium chrome/test/qtwebkitdriver/qtwebkitdriver.gyp
+ ninja -C out/Release qtwebkitdriver

###build driver (mac os x):

+ install Command Line Tools in Xcode in: start Xcode -> Preferences -> Downloads -> Components 
+ git clone https://github.com/nwlunatic/qtwebkitdriver.git chrome/test/qtwebkitdriver
+ GYP_DEFINES=clang=1 ./build/gyp_chromium chrome/test/qtwebkitdriver/qtwebkitdriver.gyp
+ ninja -C out/Release qtwebkitdriver

# debugging on linux (using gdb)

+ GYP_DEFINES="debug_extra_cflags=-g" ./build/gyp_chromium chrome/test/qtwebkitdriver/qtwebkitdriver.gyp
+ ninja -C out/Debug qtwebkitdriver

# using driver

+ start driver binary
+ in your qt app make possible to enable qtwebinspector remote debugging protocol using commandline switch --inspect='port'
+ in desired_capabilities provide app to run and optional appOptions as list

for example
```python
from selenium.webdriver import Remote

desired_capabilities = {
	'app': '/path/to/your/qt_application_binary',
	'appOptions': {
	  'some_switch',
	  'another_switch'
	}
}

driver = Remote(
    command_executor='http://127.0.0.1:9515',
    desired_capabilities=desired_capabilities
)
```
