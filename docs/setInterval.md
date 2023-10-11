# setInterval

Office Scripts are designed to execute a sequence of steps and complete. i.e. Office Scripts aren't designed to continually run in the background.

Currently `setInterval` won't work due to how Office Scripts are executed, additionally only a single Office Script can execute at a time.

Generally, I wouldn't recommend continually running an Office Script (the runtime isn't designed to support it).

That said,

I have used busy waiting in the past to create a delay, which you could use to pause between calls. 

See [sleep function](../functions/sleep.ts)
