qtwebkitdriver
==============

# get chromium with git

+ https://code.google.com/p/chromium/wiki/UsingGit

# build (from chromium src/)

+ git checkout 1b618ff654908ed239ab5db8cb5d5a96bc0c0ff5 # (SVN changes up to revision 231775)
+ gclient sync --jobs=16
+ git clone https://github.com/nwlunatic/qtwebkitdriver.git chrome/test/qtwebkitdriver
+ ./build/gyp_chromium chrome/test/qtwebkitdriver/qtwebkitdriver.gyp
+ ninja -C out/Release qtwebkitdriver

# debugging (using gdb)

+ GYP_DEFINES="debug_extra_cflags=-g" ./build/gyp_chromium chrome/test/qtwebkitdriver/qtwebkitdriver.gyp
+ ninja -C out/Debug qtwebkitdriver
