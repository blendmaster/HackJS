# HackJS

This webapp compiles Hack Assembly from the textbook [Elements of Computing Systems](http://www1.idc.ac.il/tecs/) into javascript and runs them, emulating the screen with a `<canvas>` element, and the keyboard input through DOM events.

Don't get too excited if you wrote anything in the Jack high level language though. Due to its inefficiencies, most programs don't fit into the 32K of addressable ROM on the Hack platform. For that, a translation of their VM intermediate language is necessary.

Also, due to the immediate nature of keyboard input and screen drawing of the Hack platform, along with the single-threaded nature of browser javascript, this emulator runs extremely slowly. Depending on your assembly program, expect to wait for more than 10 seconds before anything shows up on the screen.

It totally runs pong though. Try it out!

## Implementation

the `hack` global object emulates the 2 real registers A and D as simple variables, the M register as ES5 getters and setters, the RAM as a Typed Javascript Array, and the ROM as a simple array of functions corresponding to each instruction. The instructions are run in a loop until keyboard access is detected, which will then pause the execution with `setTimeout`, allowing the browser to take care of any keyboard events which will change the hack keyboard memory map. Whenever screen writing is detected, the memory is translated into canvas ImageData pixels, and the canvas is updated.

The `hack` object is attached to the window object of the browser, so you can inspect the contents of the registers `hack.A`, `hack.D`, and `hack.M`, or the `hack.RAM`, or even the instructions in `hack.ROM` through your browser's debug console. If you want to see the body of the javascript function generated from an assembly instruction, use the `toString()` method on the Function object, e.g. `hack.ROM[0].toString()`.

