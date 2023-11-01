# Syncs

_Office Script_ is built on top of _Office JavaScript API_.

Office Script APIs wrap and directly call Office JavaScript APIs.

The main difference between Office Script API and Office JavaScript API is the lack of visible syncs (`await context.sync()`) key to the Office JavaScript API. Instead these syncs are automatically added.

Knowing where the invisible syncs are is important in some cases.

Where do syncs get invisibly inserted in Office Script?

- At every call that reads something from the document.
- At the end of every try block.
- At every `console.log`

note: this list is not comprehensive and there is some nuance to each as well.
