# interlok-component-search

Just a small [VueJs](https://v3.vuejs.org/) and [Bootstrap](https://getbootstrap.com/) HTML based UI that allows to search Interlok optional components and their components.

The UI uses json indexes generated from data parsed from Interlok Nexus repositories and Javadocs.

The page uses [fuse.js](https://fusejs.io/) to index its data and do the search.

## Component Search

Just use the query text box to look for a component (e.g. json, xml, oauth) and press enter.
The page will return a list of component related with the search with some small information about them.

If the instance switch button is on the page will allow you to search for every instance of a given class.
For instance if you want a list of all the services you should search for `com.adaptris.core.Service`.

You can also search for specific instances of a class by adding `:your-query` to the class name.
For instance if you want a list of all json related services you should search for `com.adaptris.core.Service:json`.


## Optional Component

This is the list of actively supported Interlok Optional Components for a given version.

You can view more details for each Optional Component by clicking on the view button.

