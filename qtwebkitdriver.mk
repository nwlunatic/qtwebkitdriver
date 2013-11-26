build:
	../../../build/gyp_chromium qtwebkitdriver.gyp
	ninja -C ../../../out/Release qtwebkitdriver
	
debug:
	GYP_DEFINES="debug_extra_cflags=-g" ../../../build/gyp_chromium qtwebkitdriver.gyp
	ninja -C ../../../out/Debug qtwebkitdriver