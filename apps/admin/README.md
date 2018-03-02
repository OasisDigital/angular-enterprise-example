# Admin application

This admin application has access to "all" of the features of this example set.
It is intended to be, as the name says, like a Admin application.

Although in a sense matters like load time may not matter in an admin
application (they are particularly used by a smaller number of people, on faster
hardware, for longer sessions, compared to other kinds of software), nonetheless
this one has lazy loading of all features.

Because essentially all of the features are delegated to libraries that are reused across this family related applications, there is very little code here.
